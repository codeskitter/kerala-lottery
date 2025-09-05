-- Enhanced Kerala Lottery Database Schema with Improved Performance and Features

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
  maintenance_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Users Table with Enhanced Security
CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'admin', 'editor', 'viewer') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  failed_login_attempts INT DEFAULT 0,
  locked_until TIMESTAMP NULL,
  last_login TIMESTAMP NULL,
  last_login_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_is_active (is_active)
);

-- User Registrations Table with Enhanced Tracking
CREATE TABLE IF NOT EXISTS user_registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lottery_type VARCHAR(100) NOT NULL,
  ticket_number VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  transaction_id VARCHAR(100),
  payment_method ENUM('upi', 'bank_transfer', 'card', 'wallet') DEFAULT 'upi',
  payment_status ENUM('pending', 'verified', 'rejected', 'refunded') DEFAULT 'pending',
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP NULL,
  verified_by INT NULL,
  rejection_reason TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  notes TEXT,
  INDEX idx_ticket_number (ticket_number),
  INDEX idx_mobile (mobile),
  INDEX idx_email (email),
  INDEX idx_payment_status (payment_status),
  INDEX idx_lottery_type (lottery_type),
  INDEX idx_registration_date (registration_date),
  FOREIGN KEY (verified_by) REFERENCES admin_users(id),
  UNIQUE KEY unique_ticket_lottery (ticket_number, lottery_type)
);

-- Lottery Draws Table with Enhanced Features
CREATE TABLE IF NOT EXISTS lottery_draws (
  id INT PRIMARY KEY AUTO_INCREMENT,
  draw_name VARCHAR(255) NOT NULL,
  draw_code VARCHAR(50) UNIQUE NOT NULL,
  draw_date DATE NOT NULL,
  draw_time TIME NOT NULL,
  ticket_price DECIMAL(10,2) NOT NULL,
  total_tickets INT NOT NULL,
  sold_tickets INT DEFAULT 0,
  status ENUM('upcoming', 'active', 'completed', 'cancelled') DEFAULT 'upcoming',
  results_published BOOLEAN DEFAULT FALSE,
  results_published_at TIMESTAMP NULL,
  published_by INT NULL,
  draw_image VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_draw_date (draw_date),
  INDEX idx_status (status),
  INDEX idx_draw_code (draw_code),
  FOREIGN KEY (published_by) REFERENCES admin_users(id)
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
  UNIQUE KEY unique_draw_rank (draw_id, prize_rank),
  INDEX idx_prize_rank (prize_rank)
);

-- Winners Table with Enhanced Tracking
CREATE TABLE IF NOT EXISTS winners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  draw_id INT NOT NULL,
  registration_id INT NOT NULL,
  prize_rank INT NOT NULL,
  ticket_number VARCHAR(50) NOT NULL,
  winner_name VARCHAR(255) NOT NULL,
  winner_mobile VARCHAR(20) NOT NULL,
  winner_email VARCHAR(255),
  prize_amount DECIMAL(15,2) NOT NULL,
  claim_status ENUM('unclaimed', 'claimed', 'processing', 'expired') DEFAULT 'unclaimed',
  claimed_at TIMESTAMP NULL,
  claim_deadline DATE,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (draw_id) REFERENCES lottery_draws(id),
  FOREIGN KEY (registration_id) REFERENCES user_registrations(id),
  INDEX idx_draw_ticket (draw_id, ticket_number),
  INDEX idx_claim_status (claim_status),
  INDEX idx_winner_mobile (winner_mobile),
  INDEX idx_published (is_published)
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

-- Content Pages Table
CREATE TABLE IF NOT EXISTS content_pages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  page_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_page_key (page_key),
  INDEX idx_is_active (is_active)
);

-- NEW: Audit Log Table for Tracking Changes
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_id INT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES admin_users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_table_name (table_name),
  INDEX idx_created_at (created_at)
);

-- NEW: Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
  target_audience ENUM('all_users', 'winners', 'participants', 'admins') DEFAULT 'all_users',
  is_active BOOLEAN DEFAULT TRUE,
  show_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  show_until TIMESTAMP NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES admin_users(id),
  INDEX idx_is_active (is_active),
  INDEX idx_target_audience (target_audience),
  INDEX idx_show_dates (show_from, show_until)
);

-- NEW: Payment Transactions Table for Better Tracking
CREATE TABLE IF NOT EXISTS payment_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  registration_id INT NOT NULL,
  transaction_id VARCHAR(100) UNIQUE NOT NULL,
  payment_method ENUM('upi', 'bank_transfer', 'card', 'wallet') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'success', 'failed', 'cancelled') DEFAULT 'pending',
  gateway_response JSON,
  processed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (registration_id) REFERENCES user_registrations(id),
  INDEX idx_transaction_id (transaction_id),
  INDEX idx_status (status),
  INDEX idx_registration_id (registration_id)
);

-- NEW: System Settings Table for Configuration
CREATE TABLE IF NOT EXISTS system_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  updated_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES admin_users(id),
  INDEX idx_setting_key (setting_key),
  INDEX idx_is_public (is_public)
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

-- Insert default content pages
INSERT INTO content_pages (page_key, title, content) VALUES
('about_lottery', 'What is State Kerala Lottery?', 'To participate in the lottery game, you have to buy a State Kerala Lottery ticket. And then one has to wait for the lottery to open. There is a fixed date when the lottery is announced. In this announcement, if the number written on your ticket comes out then it is a lottery.'),
('how_to_play', 'How Is The Lottery Played?', 'Playing Kerala Lottery is not considered legal in India. But if the state government wants, it can officially organize the lottery game in its state. The Lottery Act 1998 says that it can be played in some states in India because it is approved by the government there.'),
('terms_conditions', 'Terms and Conditions', 'Please read these terms and conditions carefully before participating in our lottery system.'),
('privacy_policy', 'Privacy Policy', 'Your privacy is important to us. This policy explains how we collect and use your information.')
ON DUPLICATE KEY UPDATE id=id;

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('max_tickets_per_user', '10', 'number', 'Maximum tickets a user can purchase per draw', TRUE),
('ticket_claim_days', '30', 'number', 'Days to claim winning tickets', TRUE),
('maintenance_message', 'System under maintenance. Please try again later.', 'string', 'Message shown during maintenance', TRUE),
('auto_publish_results', 'false', 'boolean', 'Automatically publish results after draw completion', FALSE)
ON DUPLICATE KEY UPDATE setting_key=setting_key;
