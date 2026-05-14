import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } },
        );
        const data = await res.json();
        if (res.status === 404) { setState("invalid"); return; }
        if (data.valid === false && data.reason === "already_unsubscribed") { setState("already"); return; }
        if (data.valid === true) { setState("valid"); return; }
        setState("invalid");
      } catch (e: any) {
        setState("error"); setErrorMsg(e.message);
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      if (data?.success) setState("done");
      else if (data?.reason === "already_unsubscribed") setState("already");
      else { setState("error"); setErrorMsg("Could not unsubscribe"); }
    } catch (e: any) {
      setState("error"); setErrorMsg(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Helmet><title>Unsubscribe — hlpr</title><meta name="robots" content="noindex" /></Helmet>
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-6 text-center space-y-4">
          {state === "loading" && <p className="text-muted-foreground">Checking your link…</p>}
          {state === "invalid" && (
            <>
              <h1 className="text-xl font-bold">Invalid link</h1>
              <p className="text-muted-foreground text-sm">This unsubscribe link is invalid or expired.</p>
            </>
          )}
          {state === "valid" && (
            <>
              <h1 className="text-xl font-bold">Unsubscribe from hlpr emails?</h1>
              <p className="text-muted-foreground text-sm">You'll stop receiving emails from us.</p>
              <Button onClick={confirm} className="w-full">Confirm unsubscribe</Button>
            </>
          )}
          {state === "submitting" && <p className="text-muted-foreground">Processing…</p>}
          {state === "done" && (
            <>
              <h1 className="text-xl font-bold">You're unsubscribed</h1>
              <p className="text-muted-foreground text-sm">We won't send you any more emails.</p>
            </>
          )}
          {state === "already" && (
            <>
              <h1 className="text-xl font-bold">Already unsubscribed</h1>
              <p className="text-muted-foreground text-sm">This email address is already removed from our list.</p>
            </>
          )}
          {state === "error" && (
            <>
              <h1 className="text-xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground text-sm">{errorMsg || "Please try again later."}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
