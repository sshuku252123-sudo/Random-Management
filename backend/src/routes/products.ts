import { Router, Response } from 'express'
import { supabase } from '../config/database'
import { AuthenticatedRequest, authMiddleware } from '../middleware/auth'
import { CreateProductDTO, UpdateProductDTO } from '../models/types'

const router = Router()

// Apply authentication middleware to all routes
router.use(authMiddleware)

// Get all products for a user
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', req.userId)

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
    })
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Failed to fetch products',
        status: 500,
      },
    })
  }
})

// Get products by category
router.get('/category/:category', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { category } = req.params

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', req.userId)
      .eq('category', category)

    if (error) throw error

    res.json({
      success: true,
      data: data || [],
    })
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Failed to fetch products',
        status: 500,
      },
    })
  }
})

// Get product by ID
router.get('/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.userId)
      .single()

    if (error) throw error

    if (!data) {
      res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      })
      return
    }

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Failed to fetch product',
        status: 500,
      },
    })
  }
})

// Create a new product
router.post('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, category, quantity, tags, image_url }: CreateProductDTO = req.body

    if (!name || !category || quantity === undefined) {
      res.status(400).json({
        error: {
          message: 'Missing required fields: name, category, quantity',
          status: 400,
        },
      })
      return
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          user_id: req.userId,
          name,
          category,
          quantity,
          tags: tags || [],
          image_url: image_url || null,
          status: 'owned',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      data,
    })
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Failed to create product',
        status: 500,
      },
    })
  }
})

// Update a product
router.put('/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const updates: UpdateProductDTO = req.body

    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', req.userId)
      .select()
      .single()

    if (error) throw error

    if (!data) {
      res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      })
      return
    }

    res.json({
      success: true,
      data,
    })
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Failed to update product',
        status: 500,
      },
    })
  }
})

// Delete a product
router.delete('/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .eq('user_id', req.userId)

    if (error) throw error

    res.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Failed to delete product',
        status: 500,
      },
    })
  }
})

export default router
