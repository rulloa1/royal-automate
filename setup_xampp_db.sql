CREATE DATABASE IF NOT EXISTS royal_automate;
USE royal_automate;

CREATE TABLE IF NOT EXISTS prospects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    rating DECIMAL(3, 1),
    reviews INT,
    category VARCHAR(100),
    audit_results TEXT,
    landing_page_slug VARCHAR(255),
    landing_page_url VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Scraped - Not Contacted',
    google_maps_url TEXT,
    address TEXT,
    
    -- Tracking Flags
    email_sent BOOLEAN DEFAULT FALSE,
    email_opened BOOLEAN DEFAULT FALSE,
    link_clicked BOOLEAN DEFAULT FALSE,
    call_booked BOOLEAN DEFAULT FALSE,
    
    -- Vapi Call Data
    call_attempted BOOLEAN DEFAULT FALSE,
    call_status VARCHAR(50),
    call_duration INT,
    appointment_booked BOOLEAN DEFAULT FALSE,
    call_recording_url TEXT,
    call_transcript TEXT,
    interest_level VARCHAR(50),
    callback_requested BOOLEAN DEFAULT FALSE,
    best_time_to_call VARCHAR(100),
    vapi_call_id VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create a user for n8n if you want specific access (Optional, root usually works locally)
-- CREATE USER 'n8n_user'@'%' IDENTIFIED BY 'password';
-- GRANT ALL PRIVILEGES ON royal_automate.* TO 'n8n_user'@'%';
-- FLUSH PRIVILEGES;
