-- Insert Sample Lottery Draw
INSERT INTO lottery_draws (
  draw_name, draw_code, draw_date, draw_time, 
  ticket_price, total_tickets, status
) VALUES (
  'August 2025 Daily Lottery', 'KL-2545', '2025-08-15', '15:00:00',
  447.00, 100000, 'active'
);

-- Insert Prize Structure for Sample Draw
INSERT INTO prize_structure (draw_id, prize_rank, prize_name, prize_amount, winner_count) VALUES
(1, 1, '1st Prize', 120000000.00, 1),
(1, 2, '2nd Prize', 10000000.00, 2),
(1, 3, '3rd Prize', 5000000.00, 5),
(1, 4, '4th Prize', 1200000.00, 10),
(1, 5, '5th Prize', 800000.00, 12),
(1, 6, '6th Prize', 500000.00, 15),
(1, 7, '7th Prize', 300000.00, 20),
(1, 8, '8th Prize', 250000.00, 25),
(1, 9, '9th Prize', 100000.00, 50),
(1, 10, '10th Prize', 50000.00, 75),
(1, 11, '11th Prize', 25000.00, 80),
(1, 12, '12th Prize', 10000.00, 100);

-- Insert Sample Carousel Images
INSERT INTO carousel_images (title, image_url, alt_text, display_order, is_active) VALUES
('Kerala Culture', '/placeholder.svg?height=400&width=800', 'Kerala traditional culture', 1, TRUE),
('Lottery Winners', '/placeholder.svg?height=400&width=800', 'Lottery winners celebration', 2, TRUE),
('Kerala Backwaters', '/placeholder.svg?height=400&width=800', 'Kerala scenic backwaters', 3, TRUE);

-- Insert Sample Admin User (password: admin123)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@keralajackpot.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'super_admin');

-- Additional updates can be inserted here if needed
