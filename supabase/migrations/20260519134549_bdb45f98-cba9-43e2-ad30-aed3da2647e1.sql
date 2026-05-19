
-- Enums
CREATE TYPE public.app_role AS ENUM ('client', 'attorney', 'admin');
CREATE TYPE public.case_status AS ENUM ('submitted', 'matched', 'in_progress', 'closed', 'cancelled');
CREATE TYPE public.case_urgency AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE public.subscription_status AS ENUM ('pending', 'active', 'past_due', 'cancelled', 'expired');
CREATE TYPE public.subscription_provider AS ENUM ('paypal', 'paystack');
CREATE TYPE public.match_status AS ENUM ('proposed', 'accepted', 'declined', 'completed');

-- profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security definer
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- attorney_profiles
CREATE TABLE public.attorney_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  firm_name TEXT,
  bar_number TEXT,
  jurisdictions TEXT[] NOT NULL DEFAULT '{}',
  practice_areas TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT,
  hourly_rate NUMERIC(10,2),
  years_experience INT,
  headshot_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  accepting_clients BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.attorney_profiles ENABLE ROW LEVEL SECURITY;

-- cases
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  practice_area TEXT NOT NULL,
  jurisdiction TEXT,
  urgency case_urgency NOT NULL DEFAULT 'normal',
  description TEXT NOT NULL,
  status case_status NOT NULL DEFAULT 'submitted',
  assigned_attorney_id UUID REFERENCES auth.users ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_cases_client ON public.cases(client_id);
CREATE INDEX idx_cases_attorney ON public.cases(assigned_attorney_id);

-- case_matches
CREATE TABLE public.case_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases ON DELETE CASCADE,
  attorney_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  status match_status NOT NULL DEFAULT 'proposed',
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(case_id, attorney_id)
);
ALTER TABLE public.case_matches ENABLE ROW LEVEL SECURITY;

-- messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_messages_case ON public.messages(case_id, created_at);

-- subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  provider subscription_provider NOT NULL,
  external_id TEXT,
  status subscription_status NOT NULL DEFAULT 'pending',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);

-- earnings
CREATE TABLE public.earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attorney_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  case_id UUID REFERENCES public.cases ON DELETE SET NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  description TEXT,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.earnings ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_earnings_attorney ON public.earnings(attorney_id);

-- Trigger fn: auto-create profile + client role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'client');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_profiles_touch BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_attorney_profiles_touch BEFORE UPDATE ON public.attorney_profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_cases_touch BEFORE UPDATE ON public.cases FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_subs_touch BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- RLS POLICIES

-- profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- user_roles
CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- attorney_profiles
CREATE POLICY "attorney_profiles_public_verified" ON public.attorney_profiles FOR SELECT USING (is_verified = true);
CREATE POLICY "attorney_profiles_select_own" ON public.attorney_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "attorney_profiles_insert_own" ON public.attorney_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "attorney_profiles_update_own" ON public.attorney_profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id AND is_verified = (SELECT is_verified FROM public.attorney_profiles WHERE id = auth.uid()));
CREATE POLICY "attorney_profiles_admin_all" ON public.attorney_profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- cases
CREATE POLICY "cases_client_select" ON public.cases FOR SELECT TO authenticated USING (auth.uid() = client_id);
CREATE POLICY "cases_attorney_select" ON public.cases FOR SELECT TO authenticated USING (auth.uid() = assigned_attorney_id OR EXISTS (SELECT 1 FROM public.case_matches m WHERE m.case_id = cases.id AND m.attorney_id = auth.uid()));
CREATE POLICY "cases_admin_select" ON public.cases FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "cases_client_insert" ON public.cases FOR INSERT TO authenticated WITH CHECK (auth.uid() = client_id);
CREATE POLICY "cases_client_update" ON public.cases FOR UPDATE TO authenticated USING (auth.uid() = client_id) WITH CHECK (auth.uid() = client_id);
CREATE POLICY "cases_admin_all" ON public.cases FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- case_matches
CREATE POLICY "case_matches_attorney_select" ON public.case_matches FOR SELECT TO authenticated USING (auth.uid() = attorney_id OR EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND c.client_id = auth.uid()));
CREATE POLICY "case_matches_attorney_update" ON public.case_matches FOR UPDATE TO authenticated USING (auth.uid() = attorney_id) WITH CHECK (auth.uid() = attorney_id);
CREATE POLICY "case_matches_admin_all" ON public.case_matches FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- messages
CREATE POLICY "messages_participant_select" ON public.messages FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND (c.client_id = auth.uid() OR c.assigned_attorney_id = auth.uid()))
  OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "messages_participant_insert" ON public.messages FOR INSERT TO authenticated WITH CHECK (
  sender_id = auth.uid() AND EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND (c.client_id = auth.uid() OR c.assigned_attorney_id = auth.uid()))
);

-- subscriptions
CREATE POLICY "subs_select_own" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "subs_admin_all" ON public.subscriptions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- earnings
CREATE POLICY "earnings_select_own" ON public.earnings FOR SELECT TO authenticated USING (auth.uid() = attorney_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "earnings_admin_all" ON public.earnings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cases;
