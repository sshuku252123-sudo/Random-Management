import { Request, Response, NextFunction } from 'express'

export interface AuthenticatedRequest extends Request {
  userId?: string
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // For now, we'll use a simple user ID from headers
    // In production, implement proper JWT verification
    const userId = req.headers['x-user-id'] as string

    if (!userId) {
      res.status(401).json({
        error: {
          message: 'Unauthorized: No user ID provided',
          status: 401,
        },
      })
      return
    }

    req.userId = userId
    next()
  } catch (error) {
    res.status(401).json({
      error: {
        message: 'Unauthorized',
        status: 401,
      },
    })
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err)

  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({
    error: {
      message,
      status,
    },
  })
}
