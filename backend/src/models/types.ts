export interface Product {
  id: string
  user_id: string
  name: string
  image_url: string | null
  category: string
  quantity: number
  tags: string[]
  status: 'owned' | 'wishlisted'
  created_at: string
  updated_at: string
}

export interface CreateProductDTO {
  name: string
  category: string
  quantity: number
  tags?: string[]
  image_url?: string
}

export interface UpdateProductDTO {
  name?: string
  category?: string
  quantity?: number
  tags?: string[]
  image_url?: string
  status?: 'owned' | 'wishlisted'
}

export interface GroupSettings {
  id: string
  user_id: string
  group_name: string
  text_color: string
  background_color: string
  font_style?: string
  created_at: string
  updated_at: string
}
