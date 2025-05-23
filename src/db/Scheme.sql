-- Database schema for Auction Platform

-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('buyer', 'seller') NOT NULL
);

-- Listings Table
CREATE TABLE listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_price DECIMAL(10, 2) NOT NULL,
  current_price DECIMAL(10, 2),
  end_time DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bids Table
CREATE TABLE bids (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  user_id INT NOT NULL,
  bid_amount DECIMAL(10, 2) NOT NULL,
  bid_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_listings_end_time ON listings(end_time);
CREATE INDEX idx_bids_listing_id ON bids(listing_id);
CREATE INDEX idx_listings_seller_id ON listings(seller_id);

-- Sample Data

-- Insert Sample Users (passwords are 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password, role) VALUES
('John Seller', 'seller@example.com', '$2a$10$8FPnPAY1vN4hIE4V5s5WRe9AiZB9wR.VK6R/eJZ.VpTDtiwGHHpJi', 'seller'),
('Jane Seller', 'jane@example.com', '$2a$10$8FPnPAY1vN4hIE4V5s5WRe9AiZB9wR.VK6R/eJZ.VpTDtiwGHHpJi', 'seller'),
('Bob Buyer', 'buyer@example.com', '$2a$10$8FPnPAY1vN4hIE4V5s5WRe9AiZB9wR.VK6R/eJZ.VpTDtiwGHHpJi', 'buyer'),
('Alice Buyer', 'alice@example.com', '$2a$10$8FPnPAY1vN4hIE4V5s5WRe9AiZB9wR.VK6R/eJZ.VpTDtiwGHHpJi', 'buyer');

-- Insert Sample Listings
INSERT INTO listings (seller_id, title, description, start_price, current_price, end_time) VALUES
(1, 'Vintage Camera', 'A beautiful vintage film camera from the 1960s in excellent condition.', 50.00, 50.00, DATE_ADD(NOW(), INTERVAL 7 DAY)),
(1, 'Gaming Laptop', 'High performance gaming laptop with RTX 3080, 32GB RAM, and 1TB SSD.', 800.00, 800.00, DATE_ADD(NOW(), INTERVAL 5 DAY)),
(2, 'Antique Watch', 'Rare collectible watch from the 1940s. Still works perfectly.', 250.00, 300.00, DATE_ADD(NOW(), INTERVAL 10 DAY)),
(2, 'Modern Art Painting', 'Original abstract painting by up-and-coming artist. 24x36 inches.', 120.00, 175.00, DATE_ADD(NOW(), INTERVAL 3 DAY)),
(1, 'Mountain Bike', 'Professional mountain bike, lightly used for one season. Great condition.', 350.00, 400.00, DATE_ADD(NOW(), INTERVAL 6 DAY));

-- Insert Sample Bids
INSERT INTO bids (listing_id, user_id, bid_amount, bid_time) VALUES
(3, 3, 300.00, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(4, 3, 150.00, DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 4, 175.00, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(5, 4, 400.00, DATE_SUB(NOW(), INTERVAL 12 HOUR));
