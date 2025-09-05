-- Create Kerala Lottery Database Schema

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  site_name VARCHAR(255) NOT NULL DEFAULT 'Kerala Jackpot Mega Lottery',
  site_logo VARCHAR(500),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  address TEXT,
  upi_id VARCHAR(100),
  bank_name VARCHAR(255),
  account_name VARCHAR(255),
  account_number VARCHAR(50),
  ifsc_code VARCHAR(20),
  payment_phone VARCHAR(20),
  registration_amount DECIMAL(10,2) DEFAULT 447.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default site settings
INSERT INTO site_settings (
  site_name, contact_phone, contact_email, upi_id, 
  bank_name, account_name, account_number, ifsc_code, payment_phone
) VALUES (
  'Kerala Jackpot Mega Lottery',
  '+91 96686 43802',
  'info@keralajackpot.com',
  'keralajackpot@upi',
  'State Bank of India',
  'Kerala State Lotteries',
  '1234567890123456',
  'SBIN0001234',
  '9942931164'
) ON DUPLICATE KEY UPDATE id=id;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Registrations Table
CREATE TABLE IF NOT EXISTS user_registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lottery_type VARCHAR(100) NOT NULL,
  ticket_number VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  transaction_id VARCHAR(100),
  payment_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP NULL,
  verified_by INT NULL,
  notes TEXT,
  INDEX idx_ticket_number (ticket_number),
  INDEX idx_mobile (mobile),
  INDEX idx_payment_status (payment_status),
  FOREIGN KEY (verified_by) REFERENCES admin_users(id)
);

-- Lottery Draws Table
CREATE TABLE IF NOT EXISTS lottery_draws (
  id INT PRIMARY KEY AUTO_INCREMENT,
  draw_name VARCHAR(255) NOT NULL,
  draw_code VARCHAR(50) UNIQUE NOT NULL,
  draw_date DATE NOT NULL,
  draw_time TIME NOT NULL,
  ticket_price DECIMAL(10,2) NOT NULL,
  total_tickets INT NOT NULL,
  status ENUM('upcoming', 'active', 'completed', 'cancelled') DEFAULT 'upcoming',
  results_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_draw_date (draw_date),
  INDEX idx_status (status)
);

-- Prize Structure Table
CREATE TABLE IF NOT EXISTS prize_structure (
  id INT PRIMARY KEY AUTO_INCREMENT,
  draw_id INT NOT NULL,
  prize_rank INT NOT NULL,
  prize_name VARCHAR(100) NOT NULL,
  prize_amount DECIMAL(15,2) NOT NULL,
  winner_count INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (draw_id) REFERENCES lottery_draws(id) ON DELETE CASCADE,
  UNIQUE KEY unique_draw_rank (draw_id, prize_rank)
);

-- Winners Table
CREATE TABLE IF NOT EXISTS winners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  draw_id INT NOT NULL,
  registration_id INT NOT NULL,
  prize_rank INT NOT NULL,
  ticket_number VARCHAR(50) NOT NULL,
  winner_name VARCHAR(255) NOT NULL,
  winner_mobile VARCHAR(20) NOT NULL,
  prize_amount DECIMAL(15,2) NOT NULL,
  claim_status ENUM('unclaimed', 'claimed', 'processing') DEFAULT 'unclaimed',
  claimed_at TIMESTAMP NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (draw_id) REFERENCES lottery_draws(id),
  FOREIGN KEY (registration_id) REFERENCES user_registrations(id),
  INDEX idx_draw_ticket (draw_id, ticket_number),
  INDEX idx_claim_status (claim_status)
);

-- Carousel Images Table
CREATE TABLE IF NOT EXISTS carousel_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  link_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_display_order (display_order),
  INDEX idx_is_active (is_active)
);

-- Content Pages Table (for dynamic content)
CREATE TABLE IF NOT EXISTS content_pages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  page_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default content pages
INSERT INTO content_pages (page_key, title, content) VALUES
('about_lottery', 'What is State Kerala Lottery?', 'To participate in the lottery game, you have to buy a State Kerala Lottery ticket. And then one has to wait for the lottery to open. There is a fixed date when the lottery is announced. In this announcement, if the number written on your ticket comes out then it is a lottery.'),
('how_to_play', 'How Is The Lottery Played?', 'Playing Kerala Lottery is not considered legal in India. But if the state government wants, it can officially organize the lottery game in its state. The Lottery Act 1998 says that it can be played in some states in India because it is approved by the government there.')
ON DUPLICATE KEY UPDATE id=id;
