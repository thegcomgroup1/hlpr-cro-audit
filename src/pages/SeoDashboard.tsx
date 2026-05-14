import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, RefreshCw, LogOut, TrendingUp, TrendingDown, MousePointerClick, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Snapshot = { snapshot_date: string; page: string; clicks: number; impressions: number; ctr: number; position: number };
type Alert = { id: string; alert_type: string; page: string; message: string; metric_value: number | null; created_at: string; acknowledged: boolean };

const ALERT_LABEL: Record<string, { label: string; color: string }> = {
  first_impressions: { label: "New page indexed", color: "bg-blue-500" },
  crossed_100: { label: "100 impressions", color: "bg-green-500" },
  clicks_drop: { label: "Clicks drop", color: "bg-red-500" },
  low_ctr: { label: "Low CTR", color: "bg-amber-500" },
};

export default function SeoDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth", { replace: true }); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      const admin = (roles ?? []).some((r: any) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) await loadData();
      setLoading(false);
    })();
  }, [navigate]);

  const loadData = async () => {
    const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const [snap, al] = await Promise.all([
      supabase.from("seo_page_snapshots").select("*").gte("snapshot_date", since).order("snapshot_date", { ascending: false }),
      supabase.from("seo_alerts").select("*").order("created_at", { ascending: false }).limit(50),
    ]);
    setSnapshots((snap.data as Snapshot[]) ?? []);
    setAlerts((al.data as Alert[]) ?? []);
  };

  const runSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-sync");
      if (error) throw error;
      toast({ title: "Synced", description: `${data?.rows ?? 0} pages, ${data?.alerts_inserted ?? 0} new alerts` });
      await loadData();
    } catch (e: any) {
      toast({ title: "Sync failed", description: e.message, variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  const ackAlert = async (id: string) => {
    await supabase.from("seo_alerts").update({ acknowledged: true }).eq("id", id);
    setAlerts((a) => a.map((x) => x.id === id ? { ...x, acknowledged: true } : x));
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/auth"); };

  // Aggregate by page (30d)
  const byPage = useMemo(() => {
    const m = new Map<string, { clicks: number; impressions: number; positions: number[] }>();
    snapshots.forEach((s) => {
      const e = m.get(s.page) ?? { clicks: 0, impressions: 0, positions: [] };
      e.clicks += s.clicks; e.impressions += s.impressions;
      if (s.position > 0) e.positions.push(s.position);
      m.set(s.page, e);
    });
    return Array.from(m.entries())
      .map(([page, v]) => ({
        page,
        clicks: v.clicks,
        impressions: v.impressions,
        ctr: v.impressions ? v.clicks / v.impressions : 0,
        avgPos: v.positions.length ? v.positions.reduce((a, b) => a + b, 0) / v.positions.length : 0,
      }))
      .sort((a, b) => b.impressions - a.impressions);
  }, [snapshots]);

  const totals = useMemo(() => byPage.reduce(
    (acc, p) => ({ clicks: acc.clicks + p.clicks, impressions: acc.impressions + p.impressions }),
    { clicks: 0, impressions: 0 },
  ), [byPage]);

  const unackAlerts = alerts.filter((a) => !a.acknowledged);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-muted-foreground text-center">You're signed in but not an admin yet. Ask the project owner to grant access.</p>
      <Button variant="outline" onClick={signOut}>Sign out</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/40">
      <Helmet><title>SEO Dashboard — hlpr</title><meta name="robots" content="noindex" /></Helmet>

      <header className="border-b bg-background">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">SEO Dashboard <span className="text-muted-foreground font-normal text-sm ml-2">last 30 days</span></h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={runSync} disabled={syncing}>
              <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} /> Sync now
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={<Eye className="w-4 h-4" />} label="Impressions (30d)" value={totals.impressions.toLocaleString()} />
          <StatCard icon={<MousePointerClick className="w-4 h-4" />} label="Clicks (30d)" value={totals.clicks.toLocaleString()} />
          <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Avg CTR" value={`${totals.impressions ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : "0.00"}%`} />
          <StatCard icon={<AlertCircle className="w-4 h-4" />} label="Active alerts" value={String(unackAlerts.length)} />
        </div>

        {/* Alerts */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Alerts</CardTitle></CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No alerts yet. Run a sync or wait for the daily job.</p>
            ) : (
              <div className="space-y-2">
                {alerts.slice(0, 20).map((a) => {
                  const meta = ALERT_LABEL[a.alert_type] ?? { label: a.alert_type, color: "bg-gray-500" };
                  return (
                    <div key={a.id} className={`flex items-start justify-between gap-3 p-3 rounded-md border ${a.acknowledged ? "opacity-50" : "bg-background"}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={`${meta.color} text-white border-0`}>{meta.label}</Badge>
                          <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-medium truncate">{a.page}</p>
                        <p className="text-xs text-muted-foreground">{a.message}</p>
                      </div>
                      {!a.acknowledged && (
                        <Button variant="ghost" size="sm" onClick={() => ackAlert(a.id)}>Dismiss</Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Page table */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Pages (30 days)</CardTitle></CardHeader>
          <CardContent>
            {byPage.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet. Click <strong>Sync now</strong> to pull the latest from Search Console.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Impr.</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">Avg pos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {byPage.map((p) => (
                    <TableRow key={p.page}>
                      <TableCell className="max-w-xs truncate text-sm">{p.page.replace("https://audit.hlpr.io", "")}</TableCell>
                      <TableCell className="text-right font-mono">{p.clicks}</TableCell>
                      <TableCell className="text-right font-mono">{p.impressions.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono">{(p.ctr * 100).toFixed(2)}%</TableCell>
                      <TableCell className="text-right font-mono">{p.avgPos.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">{icon}{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
