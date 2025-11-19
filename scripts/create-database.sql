-- Create database schema for Headofwine

-- Restaurants table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    business_type VARCHAR(50) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    plan VARCHAR(20) DEFAULT 'starter',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wines table
CREATE TABLE wines (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    region VARCHAR(255),
    vintage INTEGER,
    grape_variety VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    alcohol_content DECIMAL(4,2),
    stock_quantity INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table for tracking wine sales
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    wine_id INTEGER REFERENCES wines(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu views table for analytics
CREATE TABLE menu_views (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    view_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address INET
);

-- Admin users table
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_wines_restaurant_id ON wines(restaurant_id);
CREATE INDEX idx_sales_restaurant_id ON sales(restaurant_id);
CREATE INDEX idx_sales_wine_id ON sales(wine_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_menu_views_restaurant_id ON menu_views(restaurant_id);
CREATE INDEX idx_menu_views_date ON menu_views(view_date);
