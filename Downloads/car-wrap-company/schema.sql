-- Check if tables exist, create them if they don't

-- Button clicks tracking table
CREATE TABLE IF NOT EXISTS button_clicks (
  id SERIAL PRIMARY KEY,
  button_name TEXT NOT NULL,
  page_url TEXT,
  user_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote submissions table
CREATE TABLE IF NOT EXISTS quote_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  color_name TEXT,
  car_type TEXT,
  car_model TEXT,
  total_price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_button_clicks_button_name ON button_clicks(button_name);
CREATE INDEX IF NOT EXISTS idx_button_clicks_created_at ON button_clicks(created_at);
CREATE INDEX IF NOT EXISTS idx_quote_submissions_created_at ON quote_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
