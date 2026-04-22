CREATE TABLE public.audit_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website_url TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('mini', 'full')),
  stripe_session_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;

-- No public policies: only service role (used by edge functions) can read/write.
-- This keeps customer PII and payment data inaccessible to clients.