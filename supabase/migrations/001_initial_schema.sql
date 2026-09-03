-- Sacred India Database Schema
-- Phase 1+2 MVP

-- ===== CORE TABLES =====

-- Users (auth handled by Supabase Auth, this is metadata)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  faith_preference TEXT, -- 'hindu', 'islam', 'christian', 'buddhist', 'jain', 'sikh', 'zoroastrian'
  language TEXT DEFAULT 'en', -- 'en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'pa'
  panchang_digest_enabled BOOLEAN DEFAULT FALSE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sites (85+ sacred sites)
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  faith TEXT NOT NULL, -- 'hindu', 'islam', 'christian', 'buddhist', 'jain', 'sikh', 'zoroastrian'
  emoji TEXT, -- '🛕', '🕌', etc.
  story TEXT, -- founding narrative (long)
  description TEXT, -- short summary
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',

  -- Crowd intelligence
  typical_crowd TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  best_days JSONB, -- ["Monday", "Tuesday"] -- days with lowest crowds
  worst_days JSONB, -- ["Friday", "Saturday", "Sunday"]
  festival_dates JSONB, -- [{"name": "Maha Shivaratri", "date": "2024-03-25", "crowd": "very_high"}]

  -- Accessibility info
  wheelchair_accessible BOOLEAN DEFAULT FALSE,
  step_count INT,
  doli_available BOOLEAN DEFAULT FALSE,
  shaded_seating_available BOOLEAN DEFAULT FALSE,
  priority_queue_available BOOLEAN DEFAULT FALSE,
  restroom_info TEXT,

  -- Media
  thumbnail_url TEXT,
  gallery_urls JSONB, -- array of photo URLs

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Transport (per site: trains, buses, helicopters, dharmshala)
CREATE TABLE transport (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  transport_type TEXT NOT NULL, -- 'train', 'bus', 'helicopter', 'dharmshala'

  -- Train
  nearest_station TEXT,
  station_distance_km DECIMAL(5,2),
  popular_trains JSONB, -- [{"number": "12345", "name": "Express", "frequency": "daily"}]
  irctc_url TEXT,

  -- Bus
  bus_operators JSONB, -- [{"name": "KSRTC", "frequency": "6 daily", "price": "500-800"}]

  -- Helicopter
  helicopter_price_per_person DECIMAL(10,2),
  helicopter_booking_url TEXT,
  operator_name TEXT,

  -- Dharmshala (free/budget lodging)
  name TEXT,
  beds_available INT,
  price_per_night DECIMAL(7,2),
  contact_phone TEXT,
  booking_url TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

-- Services (remote puja, prasad, guides)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL, -- 'puja', 'prasad', 'guide'
  title TEXT NOT NULL,
  description TEXT,
  price_inr DECIMAL(10,2) NOT NULL,
  emoji TEXT,

  -- Puja specific
  puja_name TEXT,
  duration_minutes INT,
  includes JSONB, -- ["WhatsApp video", "80G receipt", "Prasad"]
  video_delivery_hours INT DEFAULT 2,

  -- Prasad specific
  prasad_type TEXT, -- 'tirupati', 'kashi', 'ajmer', 'golden_temple'
  delivery_days INT,

  -- Guide specific
  guide_id UUID REFERENCES guides(id) ON DELETE SET NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Verified Guides (pandits, khadims, pilgrim guides)
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  guide_type TEXT NOT NULL, -- 'pandit', 'khadim', 'pilgrim_guide'
  phone TEXT NOT NULL,
  email TEXT,
  languages JSONB, -- ["hindi", "english", "tamil"]
  faiths_served JSONB, -- ["hindu", "buddhist"]
  rating DECIMAL(3,1) DEFAULT 4.5,
  review_count INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  verified_badge_url TEXT,
  hourly_rate DECIMAL(8,2),
  daily_rate DECIMAL(8,2),
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings (user transactions)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  site_id UUID NOT NULL REFERENCES sites(id),
  service_id UUID REFERENCES services(id),

  booking_ref TEXT UNIQUE NOT NULL, -- "SACRED-20240903-ABC123"
  status TEXT DEFAULT 'confirmed', -- 'pending', 'confirmed', 'completed', 'cancelled'

  selected_date DATE NOT NULL,
  selected_time TIME,

  -- Details
  person_name TEXT,
  person_phone TEXT,
  prayer_intention TEXT, -- optional user message
  group_size INT DEFAULT 1,

  -- Payment
  amount_inr DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
  payment_method TEXT, -- 'razorpay', 'upi'
  payment_id TEXT, -- Razorpay payment ID

  -- WhatsApp confirmation
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  whatsapp_sent_at TIMESTAMP,
  confirmation_message_id TEXT,

  -- Completion tracking (for remote puja)
  completion_status TEXT, -- 'pending', 'in_progress', 'completed'
  video_url TEXT, -- WhatsApp video link for remote puja
  photo_url TEXT, -- Photo proof

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Festivals (calendar data)
CREATE TABLE festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  faith TEXT NOT NULL,
  emoji TEXT,
  description TEXT,
  date_this_year DATE,
  date_next_year DATE,
  expected_crowd TEXT, -- 'low', 'medium', 'high', 'very_high'
  best_sites JSONB, -- [{"site_id": "uuid", "reason": "main temple"}]
  why_visit TEXT, -- explanation of tradition
  duration_days INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Scriptures (7 faiths' texts)
CREATE TABLE scriptures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faith TEXT NOT NULL,
  emoji TEXT,
  title TEXT NOT NULL,
  original_language TEXT, -- 'sanskrit', 'arabic', 'pali', 'gurmukhi', 'avestan', 'tamil', 'bengali'
  original_text TEXT NOT NULL,
  english_translation TEXT,
  transliteration TEXT,
  audio_url TEXT, -- TTS-generated audio file
  verse_number TEXT,
  context TEXT, -- explanation
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Progression (badges, tiers)
CREATE TABLE user_progression (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_points INT DEFAULT 0,
  tier TEXT DEFAULT 'seeker', -- 'seeker', 'pilgrim', 'devotee', 'sage', 'legend'
  tier_changed_at TIMESTAMP,

  -- Per-faith tracks
  hindu_track_points INT DEFAULT 0,
  islam_track_points INT DEFAULT 0,
  christian_track_points INT DEFAULT 0,
  buddhist_track_points INT DEFAULT 0,
  jain_track_points INT DEFAULT 0,
  sikh_track_points INT DEFAULT 0,
  zoroastrian_track_points INT DEFAULT 0,

  -- Milestones
  sites_visited INT DEFAULT 0,
  pujas_booked INT DEFAULT 0,
  lamps_lit INT DEFAULT 0,
  badges_earned JSONB DEFAULT '[]', -- ["lightning_response", "completion_star"]

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Lamp Dedications (spiritual feature on Home)
CREATE TABLE lamp_dedications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  site_id UUID REFERENCES sites(id), -- optional, could be dedicated at home
  dedication_for TEXT, -- person's name or message
  lamp_type TEXT, -- 'diya', 'candle', 'chirag', 'butter_lamp'
  latitude DECIMAL(10,8), -- GPS location where lit
  longitude DECIMAL(11,8),
  shared_to_whatsapp BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin Events (audit trail, analytics)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'booking', 'payment', 'site_view', 'lamp_lit', 'ai_query'
  site_id UUID REFERENCES sites(id),
  booking_id UUID REFERENCES bookings(id),
  metadata JSONB, -- flexible field for extra data
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===== INDEXES =====
CREATE INDEX idx_sites_faith ON sites(faith);
CREATE INDEX idx_sites_location ON sites(latitude, longitude);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_site_id ON bookings(site_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_festivals_faith ON festivals(faith);
CREATE INDEX idx_scriptures_faith ON scriptures(faith);
CREATE INDEX idx_user_progression_user_id ON user_progression(user_id);
CREATE INDEX idx_lamp_dedications_user_id ON lamp_dedications(user_id);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_type ON events(event_type);

-- ===== ROW LEVEL SECURITY (RLS) =====
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lamp_dedications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progression ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own profile
CREATE POLICY "Users can see own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own bookings
CREATE POLICY "Users can see own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can see their lamp dedications
CREATE POLICY "Users can see own lamps" ON lamp_dedications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create lamps" ON lamp_dedications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can see their progression
CREATE POLICY "Users can see own progression" ON user_progression
  FOR SELECT USING (auth.uid() = user_id);

-- Public can read sites, services, guides, festivals, scriptures
ALTER TABLE sites SET (security_barrier = on);
CREATE POLICY "Public can read sites" ON sites FOR SELECT USING (true);

ALTER TABLE services SET (security_barrier = on);
CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);

ALTER TABLE guides SET (security_barrier = on);
CREATE POLICY "Public can read guides" ON guides FOR SELECT USING (true);

ALTER TABLE festivals SET (security_barrier = on);
CREATE POLICY "Public can read festivals" ON festivals FOR SELECT USING (true);

ALTER TABLE scriptures SET (security_barrier = on);
CREATE POLICY "Public can read scriptures" ON scriptures FOR SELECT USING (true);

ALTER TABLE transport SET (security_barrier = on);
CREATE POLICY "Public can read transport" ON transport FOR SELECT USING (true);
