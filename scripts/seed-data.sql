-- Seed data for WineMenu Pro

-- Insert sample restaurants
INSERT INTO restaurants (name, email, password_hash, business_type, address, phone, plan, is_active) VALUES
('Bella Vista Restaurant', 'restaurant@demo.com', '$2b$10$example_hash', 'restaurant', '123 Main Street, Downtown', '(555) 123-4567', 'professional', true),
('The Wine Cellar', 'winecellar@demo.com', '$2b$10$example_hash', 'wine-bar', '456 Oak Avenue, Midtown', '(555) 234-5678', 'starter', true),
('Château Bistro', 'chateau@demo.com', '$2b$10$example_hash', 'restaurant', '789 Pine Street, Uptown', '(555) 345-6789', 'professional', true),
('Urban Wine Bar', 'urban@demo.com', '$2b$10$example_hash', 'bar', '321 Elm Street, Downtown', '(555) 456-7890', 'enterprise', true),
('Vintage Lounge', 'vintage@demo.com', '$2b$10$example_hash', 'bar', '654 Maple Avenue, Suburbs', '(555) 567-8901', 'starter', false);

-- Insert sample wines for Bella Vista Restaurant (id: 1)
INSERT INTO wines (restaurant_id, name, type, region, vintage, grape_variety, price, description, alcohol_content, stock_quantity, is_available) VALUES
(1, 'Château Margaux 2015', 'Red Wine', 'Bordeaux, France', 2015, 'Cabernet Sauvignon, Merlot', 450.00, 'A legendary wine from one of Bordeaux''s most prestigious estates. This vintage offers exceptional elegance with notes of blackcurrant, violet, and subtle oak.', 13.5, 12, true),
(1, 'Dom Pérignon 2012', 'Champagne', 'Champagne, France', 2012, 'Chardonnay, Pinot Noir', 280.00, 'The epitome of luxury champagne. Crisp and refined with notes of citrus, brioche, and mineral complexity.', 12.5, 6, true),
(1, 'Sancerre Loire Valley', 'White Wine', 'Loire Valley, France', 2021, 'Sauvignon Blanc', 65.00, 'A crisp and mineral Sauvignon Blanc with notes of gooseberry, citrus, and a distinctive flinty finish.', 12.8, 24, true),
(1, 'Barolo Brunate 2018', 'Red Wine', 'Piedmont, Italy', 2018, 'Nebbiolo', 120.00, 'A powerful and elegant Nebbiolo with complex aromas of rose, tar, and red fruits. Perfect with rich Italian cuisine.', 14.2, 0, false);

-- Insert sample wines for other restaurants
INSERT INTO wines (restaurant_id, name, type, region, vintage, grape_variety, price, description, alcohol_content, stock_quantity, is_available) VALUES
(2, 'Caymus Cabernet Sauvignon', 'Red Wine', 'Napa Valley, USA', 2020, 'Cabernet Sauvignon', 85.00, 'Rich and full-bodied with dark fruit flavors and smooth tannins.', 14.5, 18, true),
(2, 'Whispering Angel Rosé', 'Rosé', 'Provence, France', 2022, 'Grenache, Cinsault', 25.00, 'Pale pink color with fresh strawberry and citrus notes.', 13.0, 30, true),
(3, 'Opus One 2018', 'Red Wine', 'Napa Valley, USA', 2018, 'Cabernet Sauvignon, Merlot', 380.00, 'A Bordeaux-style blend from one of California''s most prestigious wineries.', 14.5, 8, true),
(4, 'Krug Grande Cuvée', 'Champagne', 'Champagne, France', 0, 'Chardonnay, Pinot Noir, Pinot Meunier', 180.00, 'A multi-vintage champagne with exceptional complexity and depth.', 12.0, 15, true);

-- Insert sample sales data
INSERT INTO sales (restaurant_id, wine_id, quantity, unit_price, total_amount, sale_date) VALUES
(1, 1, 2, 450.00, 900.00, CURRENT_TIMESTAMP - INTERVAL '5 days'),
(1, 2, 3, 280.00, 840.00, CURRENT_TIMESTAMP - INTERVAL '3 days'),
(1, 3, 5, 65.00, 325.00, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(1, 4, 1, 120.00, 120.00, CURRENT_TIMESTAMP - INTERVAL '7 days'),
(2, 5, 4, 85.00, 340.00, CURRENT_TIMESTAMP - INTERVAL '4 days'),
(2, 6, 8, 25.00, 200.00, CURRENT_TIMESTAMP - INTERVAL '1 day');

-- Insert sample menu views
INSERT INTO menu_views (restaurant_id, view_date) VALUES
(1, CURRENT_TIMESTAMP - INTERVAL '1 hour'),
(1, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(1, CURRENT_TIMESTAMP - INTERVAL '3 hours'),
(2, CURRENT_TIMESTAMP - INTERVAL '30 minutes'),
(3, CURRENT_TIMESTAMP - INTERVAL '45 minutes');

-- Insert admin user
INSERT INTO admin_users (email, password_hash, role) VALUES
('admin@winemenu.com', '$2b$10$example_hash', 'admin');
