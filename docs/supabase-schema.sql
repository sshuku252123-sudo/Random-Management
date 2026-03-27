-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'owned' CHECK (status IN ('owned', 'wishlisted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT positive_quantity CHECK (quantity >= 0)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- Group Settings table
CREATE TABLE IF NOT EXISTS group_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  group_name TEXT NOT NULL,
  text_color TEXT NOT NULL DEFAULT '#000000',
  background_color TEXT NOT NULL DEFAULT '#ffffff',
  font_style TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, group_name)
);

-- Create indexes for group settings
CREATE INDEX IF NOT EXISTS idx_group_settings_user_id ON group_settings(user_id);

-- Wishlist items table (optional, can be integrated with products table)
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  memo TEXT,
  status TEXT NOT NULL DEFAULT 'wishlist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for wishlist
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist_items(user_id);

-- Enable Row Level Security (RLS) for security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (Note: These require setting up user authentication first)
-- You'll need to implement these based on your authentication method
