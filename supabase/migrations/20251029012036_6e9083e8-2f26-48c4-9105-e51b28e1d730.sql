-- Create tourist profiles table
CREATE TABLE public.tourist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  country TEXT NOT NULL,
  passport_number TEXT,
  aadhaar_number TEXT,
  phone_number TEXT NOT NULL,
  safety_score INTEGER DEFAULT 85 CHECK (safety_score >= 0 AND safety_score <= 100),
  current_location_lat DECIMAL(10, 8),
  current_location_lng DECIMAL(11, 8),
  current_location_name TEXT,
  location_tracking_enabled BOOLEAN DEFAULT false,
  trip_start_date TIMESTAMP WITH TIME ZONE,
  trip_end_date TIMESTAMP WITH TIME ZONE,
  destination TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create emergency contacts table
CREATE TABLE public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id UUID NOT NULL REFERENCES public.tourist_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create panic alerts table
CREATE TABLE public.panic_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id UUID NOT NULL REFERENCES public.tourist_profiles(id) ON DELETE CASCADE,
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  location_name TEXT,
  alert_type TEXT DEFAULT 'panic_button',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'responded', 'resolved', 'false_alarm')),
  description TEXT,
  response_time TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create incident reports table
CREATE TABLE public.incident_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id UUID NOT NULL REFERENCES public.tourist_profiles(id) ON DELETE CASCADE,
  incident_type TEXT NOT NULL CHECK (incident_type IN ('accident', 'crime', 'medical', 'harassment', 'theft', 'other')),
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  location_name TEXT,
  description TEXT NOT NULL,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'investigating', 'resolved', 'closed')),
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create safety status table (I'm safe updates)
CREATE TABLE public.safety_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id UUID NOT NULL REFERENCES public.tourist_profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('safe', 'need_help', 'emergency', 'checking_in')),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_name TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create location check-ins table
CREATE TABLE public.location_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id UUID NOT NULL REFERENCES public.tourist_profiles(id) ON DELETE CASCADE,
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  location_name TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create safety tips table (pre-populated by admins)
CREATE TABLE public.safety_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('general', 'health', 'crime', 'weather', 'transportation', 'cultural', 'emergency')),
  region TEXT,
  language TEXT DEFAULT 'en',
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create helplines table (emergency contact numbers)
CREATE TABLE public.helplines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('police', 'ambulance', 'fire', 'tourist_helpline', 'women_helpline', 'disaster', 'other')),
  phone_number TEXT NOT NULL,
  region TEXT,
  language TEXT DEFAULT 'en',
  available_24_7 BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create safe zones table
CREATE TABLE public.safe_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  zone_type TEXT NOT NULL CHECK (zone_type IN ('safe', 'hazard', 'restricted', 'shelter', 'evacuation')),
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  radius_meters INTEGER DEFAULT 500,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tourist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.panic_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.helplines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safe_zones ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tourist_profiles
CREATE POLICY "Users can view their own profile"
  ON public.tourist_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.tourist_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.tourist_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for emergency_contacts
CREATE POLICY "Users can manage their emergency contacts"
  ON public.emergency_contacts FOR ALL
  USING (tourist_id IN (SELECT id FROM public.tourist_profiles WHERE user_id = auth.uid()));

-- RLS Policies for panic_alerts
CREATE POLICY "Users can view their own alerts"
  ON public.panic_alerts FOR SELECT
  USING (tourist_id IN (SELECT id FROM public.tourist_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can create alerts"
  ON public.panic_alerts FOR INSERT
  WITH CHECK (tourist_id IN (SELECT id FROM public.tourist_profiles WHERE user_id = auth.uid()));

-- RLS Policies for incident_reports
CREATE POLICY "Users can manage their incident reports"
  ON public.incident_reports FOR ALL
  USING (tourist_id IN (SELECT id FROM public.tourist_profiles WHERE user_id = auth.uid()));

-- RLS Policies for safety_status
CREATE POLICY "Users can manage their safety status"
  ON public.safety_status FOR ALL
  USING (tourist_id IN (SELECT id FROM public.tourist_profiles WHERE user_id = auth.uid()));

-- RLS Policies for location_checkins
CREATE POLICY "Users can manage their location check-ins"
  ON public.location_checkins FOR ALL
  USING (tourist_id IN (SELECT id FROM public.tourist_profiles WHERE user_id = auth.uid()));

-- RLS Policies for safety_tips (public read)
CREATE POLICY "Anyone can view active safety tips"
  ON public.safety_tips FOR SELECT
  USING (is_active = true);

-- RLS Policies for helplines (public read)
CREATE POLICY "Anyone can view active helplines"
  ON public.helplines FOR SELECT
  USING (is_active = true);

-- RLS Policies for safe_zones (public read)
CREATE POLICY "Anyone can view active safe zones"
  ON public.safe_zones FOR SELECT
  USING (is_active = true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_tourist_profiles_updated_at
  BEFORE UPDATE ON public.tourist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_incident_reports_updated_at
  BEFORE UPDATE ON public.incident_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample safety tips
INSERT INTO public.safety_tips (title, content, category, language, priority) VALUES
('Stay Connected', 'Always keep your phone charged and have emergency numbers saved. Share your location with trusted contacts.', 'general', 'en', 10),
('Respect Local Culture', 'Dress modestly in religious places. Ask before taking photos of people or sacred sites.', 'cultural', 'en', 8),
('Health Precautions', 'Drink only bottled water. Carry basic medications. Know the location of nearest hospitals.', 'health', 'en', 9),
('Weather Alerts', 'Check weather forecasts daily. Avoid traveling during monsoons in hilly areas.', 'weather', 'en', 7),
('Transportation Safety', 'Use licensed taxis or ride-sharing apps. Avoid traveling alone at night.', 'transportation', 'en', 8),
('Emergency Preparedness', 'Keep copies of important documents. Know your embassy contact. Have travel insurance.', 'emergency', 'en', 10);

-- Insert sample helplines
INSERT INTO public.helplines (name, category, phone_number, region, available_24_7) VALUES
('Police Emergency', 'police', '100', 'India', true),
('Ambulance', 'ambulance', '102', 'India', true),
('Fire Brigade', 'fire', '101', 'India', true),
('National Tourist Helpline', 'tourist_helpline', '1363', 'India', true),
('Women Helpline', 'women_helpline', '1091', 'India', true),
('Disaster Management', 'disaster', '108', 'India', true);

-- Enable realtime for panic_alerts
ALTER PUBLICATION supabase_realtime ADD TABLE public.panic_alerts;