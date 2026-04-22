CREATE TABLE public.cro_score_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cro_score_requests ENABLE ROW LEVEL SECURITY;

-- No public policies: only service role (used by edge function) can read/write.
-- This prevents any client-side access to the collected emails/URLs.