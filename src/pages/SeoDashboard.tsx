import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, RefreshCw, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

interface GscRow {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface GscTotals {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface GscPayload {
  range: { start: string; end: string };
  previousRange: { start: string; end: string };
  current: { rows?: GscRow[] };
  previous: { rows?: GscRow[] };
  trend: { rows?: GscRow[] };
  queries: { rows?: GscRow[] };
  pages: { rows?: GscRow[] };
  opportunities: { rows?: GscRow[] };
  sitemaps: {
    sitemap?: Array<{
      path: string;
      lastSubmitted?: string;
      lastDownloaded?: string;
      errors?: number;
      warnings?: number;
    }>;
  };
}

const SITE = "https://audit.hlpr.io";

function totalsFrom(rows?: GscRow[]): GscTotals {
  const r = rows?.[0];
  return {
    clicks: r?.clicks ?? 0,
    impressions: r?.impressions ?? 0,
    ctr: r?.ctr ?? 0,
    position: r?.position ?? 0,
  };
}
function delta(curr: number, prev: number) {
  if (!prev) return curr ? 100 : 0;
  return ((curr - prev) / prev) * 100;
}
const fmtPct = (v: number, d = 1) => `${(v * 100).toFixed(d)}%`;
const fmtPos = (v: number) => (v ? v.toFixed(1) : "—");
const fmtNum = (v: number) => v.toLocaleString();

const POSITION_CTR_BASELINE: Record<number, number> = {
  1: 0.28, 2: 0.16, 3: 0.11, 4: 0.08, 5: 0.06,
  6: 0.05, 7: 0.04, 8: 0.035, 9: 0.03, 10: 0.025,
  11: 0.018, 12: 0.015, 13: 0.013, 14: 0.011, 15: 0.01,
  16: 0.009, 17: 0.008, 18: 0.007, 19: 0.006, 20: 0.005,
};
function expectedCtr(pos: number) {
  const k = Math.min(20, Math.max(1, Math.round(pos)));
  return POSITION_CTR_BASELINE[k] ?? 0.005;
}

function KpiCard({ label, value, prev, format }: {
  label: string;
  value: number;
  prev: number;
  format: (v: number) => string;
}) {
  const d = delta(value, prev);
  const positive = label === "Avg position" ? d < 0 : d >= 0;
  const Arrow = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{format(value)}</p>
      <p className={`mt-1 inline-flex items-center gap-1 text-xs ${positive ? "text-emerald-600" : "text-rose-600"}`}>
        <Arrow className="h-3.5 w-3.5" />
        {Math.abs(d).toFixed(1)}% vs prior 28d
      </p>
    </Card>
  );
}

export default function SeoDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<GscPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth", { replace: true }); return; }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = (roles ?? []).some((r: any) => r.role === "admin");
      setIsAdmin(admin);
      setAuthChecked(true);
      if (admin) load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-analytics");
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setData(data as GscPayload);
    } catch (e: any) {
      const msg = e?.message ?? "Failed to load";
      setError(msg);
      toast({ title: "Failed to load", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const totals = useMemo(() => totalsFrom(data?.current.rows), [data]);
  const prevTotals = useMemo(() => totalsFrom(data?.previous.rows), [data]);

  const trendData = useMemo(
    () =>
      (data?.trend.rows ?? []).map((r) => ({
        date: r.keys?.[0] ?? "",
        clicks: r.clicks,
        impressions: r.impressions,
      })),
    [data],
  );

  const opportunities = useMemo(() => {
    const rows = data?.opportunities.rows ?? [];
    return rows
      .filter(
        (r) =>
          r.position >= 5 &&
          r.position <= 20 &&
          r.impressions >= 100 &&
          r.ctr < expectedCtr(r.position) * 0.8,
      )
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25);
  }, [data]);

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground text-center">You're signed in but not an admin yet.</p>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>SEO Dashboard — hlpr</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="min-h-screen bg-background px-6 py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">SEO Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Google Search Console · audit.hlpr.io
                {data?.range && (
                  <> · {data.range.start} → {data.range.end}</>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={load} disabled={loading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
            </div>
          </header>

          {error && (
            <Card className="border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
              {error}
            </Card>
          )}

          {loading && !data ? (
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
          ) : data ? (
            <>
              <section className="grid gap-4 md:grid-cols-4">
                <KpiCard label="Clicks" value={totals.clicks} prev={prevTotals.clicks} format={fmtNum} />
                <KpiCard label="Impressions" value={totals.impressions} prev={prevTotals.impressions} format={fmtNum} />
                <KpiCard label="CTR" value={totals.ctr} prev={prevTotals.ctr} format={(v) => fmtPct(v)} />
                <KpiCard label="Avg position" value={totals.position} prev={prevTotals.position} format={fmtPos} />
              </section>

              <Card className="p-5">
                <h2 className="text-sm font-medium">Daily clicks & impressions · last 90 days</h2>
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      />
                      <Area yAxisId="right" type="monotone" dataKey="impressions" stroke="hsl(var(--muted-foreground))" fill="url(#g2)" />
                      <Area yAxisId="left" type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" fill="url(#g1)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <section className="grid gap-6 lg:grid-cols-2">
                <Card className="p-5">
                  <h2 className="text-sm font-medium">Top queries</h2>
                  <p className="text-xs text-muted-foreground">By impressions, last 28 days</p>
                  <div className="mt-3 max-h-96 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Query</TableHead>
                          <TableHead className="text-right">Clicks</TableHead>
                          <TableHead className="text-right">Impr.</TableHead>
                          <TableHead className="text-right">CTR</TableHead>
                          <TableHead className="text-right">Pos.</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(data.queries.rows ?? []).map((r) => (
                          <TableRow key={r.keys?.[0]}>
                            <TableCell className="max-w-[220px] truncate">{r.keys?.[0]}</TableCell>
                            <TableCell className="text-right">{fmtNum(r.clicks)}</TableCell>
                            <TableCell className="text-right">{fmtNum(r.impressions)}</TableCell>
                            <TableCell className="text-right">{fmtPct(r.ctr)}</TableCell>
                            <TableCell className="text-right">{fmtPos(r.position)}</TableCell>
                          </TableRow>
                        ))}
                        {(data.queries.rows ?? []).length === 0 && (
                          <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No data yet — Google needs ~1–2 weeks to start reporting.</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Card>

                <Card className="p-5">
                  <h2 className="text-sm font-medium">Top pages</h2>
                  <p className="text-xs text-muted-foreground">By clicks, last 28 days</p>
                  <div className="mt-3 max-h-96 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Page</TableHead>
                          <TableHead className="text-right">Clicks</TableHead>
                          <TableHead className="text-right">Impr.</TableHead>
                          <TableHead className="text-right">CTR</TableHead>
                          <TableHead className="text-right">Pos.</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(data.pages.rows ?? []).map((r) => {
                          const path = (r.keys?.[0] ?? "").replace(SITE, "") || "/";
                          return (
                            <TableRow key={r.keys?.[0]}>
                              <TableCell className="max-w-[220px] truncate font-mono text-xs">{path}</TableCell>
                              <TableCell className="text-right">{fmtNum(r.clicks)}</TableCell>
                              <TableCell className="text-right">{fmtNum(r.impressions)}</TableCell>
                              <TableCell className="text-right">{fmtPct(r.ctr)}</TableCell>
                              <TableCell className="text-right">{fmtPos(r.position)}</TableCell>
                            </TableRow>
                          );
                        })}
                        {(data.pages.rows ?? []).length === 0 && (
                          <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No data yet.</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </section>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-medium">Opportunity queries</h2>
                    <p className="text-xs text-muted-foreground">
                      Ranking position 5–20, ≥100 impressions, CTR below baseline. Best targets to refresh.
                    </p>
                  </div>
                  <Badge variant="secondary">{opportunities.length}</Badge>
                </div>
                <div className="mt-3 max-h-96 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Query</TableHead>
                        <TableHead>Page</TableHead>
                        <TableHead className="text-right">Impr.</TableHead>
                        <TableHead className="text-right">CTR</TableHead>
                        <TableHead className="text-right">Pos.</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {opportunities.map((r, i) => {
                        const path = (r.keys?.[1] ?? "").replace(SITE, "") || "/";
                        return (
                          <TableRow key={`${r.keys?.[0]}-${i}`}>
                            <TableCell className="max-w-[200px] truncate">{r.keys?.[0]}</TableCell>
                            <TableCell className="max-w-[200px] truncate font-mono text-xs">{path}</TableCell>
                            <TableCell className="text-right">{fmtNum(r.impressions)}</TableCell>
                            <TableCell className="text-right">{fmtPct(r.ctr)}</TableCell>
                            <TableCell className="text-right">{fmtPos(r.position)}</TableCell>
                          </TableRow>
                        );
                      })}
                      {opportunities.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Nothing flagged yet — appears once you accumulate impressions.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              <Card className="p-5">
                <h2 className="text-sm font-medium">Sitemap coverage</h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {(data.sitemaps.sitemap ?? []).map((s) => (
                    <div key={s.path} className="rounded-md border p-3 text-sm">
                      <p className="truncate font-mono text-xs">{s.path}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>Submitted: {s.lastSubmitted?.slice(0, 10) ?? "—"}</div>
                        <div>Last read: {s.lastDownloaded?.slice(0, 10) ?? "—"}</div>
                        <div>Errors: <span className={s.errors ? "text-rose-600" : ""}>{s.errors ?? 0}</span></div>
                        <div>Warnings: {s.warnings ?? 0}</div>
                      </div>
                    </div>
                  ))}
                  {(data.sitemaps.sitemap ?? []).length === 0 && (
                    <p className="text-sm text-muted-foreground">No sitemaps registered.</p>
                  )}
                </div>
              </Card>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
