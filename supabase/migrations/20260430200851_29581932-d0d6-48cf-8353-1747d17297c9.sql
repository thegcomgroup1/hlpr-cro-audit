ALTER TABLE public.cro_score_requests
ADD COLUMN IF NOT EXISTS monthly_revenue TEXT;

COMMENT ON COLUMN public.cro_score_requests.monthly_revenue
IS 'Revenue range qualifier: <25k, 25k-100k, 100k-500k, 500k+';