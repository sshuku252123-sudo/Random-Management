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

export interface WishListItem {
  id: string
  user_id: string
  name: string
  category: string
  memo: string | null
  status: 'wishlist'
  created_at: string
}
