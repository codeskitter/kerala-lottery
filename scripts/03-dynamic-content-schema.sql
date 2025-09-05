-- Enhanced Database Schema for Dynamic Content Management

-- Content Sections Table (for homepage sections)
CREATE TABLE IF NOT EXISTS content_sections (
  id INT PRIMARY KEY AUTO_INCREMENT,
  section_key VARCHAR(100) UNIQUE NOT NULL,
  section_name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  content TEXT,
  image_url VARCHAR(500),
  button_text VARCHAR(100),
  button_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_section_key (section_key),
  INDEX idx_display_order (display_order)
);

-- Insert default content sections
INSERT INTO content_sections (section_key, section_name, title, subtitle, content, button_text, display_order) VALUES
('hero', 'Hero Section', 'Win Big with Kerala Jackpot Mega Lottery', 'Your chance to become a millionaire starts here', 'Join thousands of winners who have changed their lives with our trusted lottery system. Safe, secure, and government approved.', 'Buy Ticket Now', 1),
('about', 'About Section', 'What is State Kerala Lottery?', 'Government Approved & Trusted', 'To participate in the lottery game, you have to buy a State Kerala Lottery ticket. And then one has to wait for the lottery to open. There is a fixed date when the lottery is announced.', 'Learn More', 2),
('how_it_works', 'How It Works', 'How to Play Kerala Lottery', 'Simple 3-Step Process', 'Playing Kerala Lottery is easy and secure. Follow our simple process to participate in the official government lottery.', 'Get Started', 3),
('prizes', 'Prizes Section', 'Amazing Prizes Await', 'Multiple Ways to Win', 'Check out our exciting prize structure with multiple winning categories and amazing cash rewards.', 'View Prizes', 4),
('winners', 'Winners Section', 'Recent Winners', 'Success Stories', 'Meet our recent winners who have transformed their lives with Kerala Lottery.', 'See All Winners', 5)
ON DUPLICATE KEY UPDATE id=id;

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  avatar_url VARCHAR(500),
  testimonial TEXT NOT NULL,
  prize_amount DECIMAL(15,2),
  win_date DATE,
  rating INT DEFAULT 5,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_featured (is_featured),
  INDEX idx_display_order (display_order)
);

-- Insert sample testimonials
INSERT INTO testimonials (name, location, testimonial, prize_amount, win_date, is_featured, display_order) VALUES
('Rajesh Kumar', 'Kochi, Kerala', 'I never believed I could win until I got the call! Kerala Lottery changed my life completely. The process was transparent and the payout was quick.', 500000.00, '2024-01-15', TRUE, 1),
('Priya Nair', 'Thiruvananthapuram', 'Winning ₹2 lakhs was a dream come true! The entire process was smooth and professional. Highly recommend Kerala Lottery to everyone.', 200000.00, '2024-02-20', TRUE, 2),
('Mohammed Ali', 'Calicut', 'Best lottery system in Kerala! Won ₹1 lakh and received the amount within 3 days. Completely trustworthy and government approved.', 100000.00, '2024-03-10', TRUE, 3)
ON DUPLICATE KEY UPDATE id=id;

-- FAQ Table
CREATE TABLE IF NOT EXISTS faqs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_display_order (display_order)
);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, display_order) VALUES
('How do I buy a lottery ticket?', 'You can buy tickets online through our secure payment system or visit authorized dealers across Kerala.', 'tickets', 1),
('When are the lottery results announced?', 'Results are announced every week on the scheduled draw date. You can check results on our website or through SMS.', 'results', 2),
('How do I claim my prize?', 'Winners can claim prizes by visiting our office with valid ID and the winning ticket. Prizes above ₹10,000 require additional verification.', 'prizes', 3),
('Is Kerala Lottery legal?', 'Yes, Kerala State Lottery is completely legal and operated by the Government of Kerala under the Lottery Act.', 'legal', 4),
('What are the payment methods accepted?', 'We accept UPI, bank transfer, and all major payment methods for ticket purchases.', 'payment', 5)
ON DUPLICATE KEY UPDATE id=id;

-- Social Media Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  platform VARCHAR(50) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon_class VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_platform (platform),
  INDEX idx_display_order (display_order)
);

-- Insert default social links
INSERT INTO social_links (platform, url, icon_class, display_order) VALUES
('Facebook', 'https://facebook.com/keralajackpot', 'fab fa-facebook-f', 1),
('Twitter', 'https://twitter.com/keralajackpot', 'fab fa-twitter', 2),
('Instagram', 'https://instagram.com/keralajackpot', 'fab fa-instagram', 3),
('YouTube', 'https://youtube.com/keralajackpot', 'fab fa-youtube', 4),
('WhatsApp', 'https://wa.me/919668643802', 'fab fa-whatsapp', 5)
ON DUPLICATE KEY UPDATE id=id;

-- Navigation Menu Table
CREATE TABLE IF NOT EXISTS navigation_menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  menu_key VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  parent_id INT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES navigation_menu(id) ON DELETE CASCADE,
  INDEX idx_parent_id (parent_id),
  INDEX idx_display_order (display_order)
);

-- Insert default navigation menu
INSERT INTO navigation_menu (menu_key, label, url, display_order) VALUES
('home', 'Home', '/', 1),
('about', 'About', '/about', 2),
('results', 'Results', '/results', 3),
('winners', 'Winners', '/winners', 4),
('contact', 'Contact', '/contact', 5),
('admin', 'Admin', '/admin', 6)
ON DUPLICATE KEY UPDATE id=id;

-- Site Configuration Table (extended settings)
CREATE TABLE IF NOT EXISTS site_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value TEXT,
  config_type ENUM('text', 'number', 'boolean', 'json', 'url', 'email') DEFAULT 'text',
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_config_key (config_key),
  INDEX idx_is_public (is_public)
);

-- Insert default site configurations
INSERT INTO site_config (config_key, config_value, config_type, description, is_public) VALUES
('site_tagline', 'Your Gateway to Fortune', 'text', 'Site tagline displayed in header', TRUE),
('site_description', 'Official Kerala State Lottery - Government approved and trusted by millions', 'text', 'Site meta description', TRUE),
('maintenance_mode', 'false', 'boolean', 'Enable/disable maintenance mode', FALSE),
('registration_enabled', 'true', 'boolean', 'Enable/disable new registrations', FALSE),
('max_tickets_per_user', '10', 'number', 'Maximum tickets per user per draw', FALSE),
('support_email', 'support@keralajackpot.com', 'email', 'Support email address', TRUE),
('support_phone', '+91 96686 43802', 'text', 'Support phone number', TRUE),
('office_address', 'Kerala State Lottery Office, Thiruvananthapuram, Kerala 695001', 'text', 'Office address', TRUE),
('google_analytics_id', '', 'text', 'Google Analytics tracking ID', FALSE),
('facebook_pixel_id', '', 'text', 'Facebook Pixel ID', FALSE)
ON DUPLICATE KEY UPDATE id=id;
