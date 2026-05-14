import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IntakePreview from "./pages/IntakePreview.tsx";
import NotFound from "./pages/NotFound.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import ProgrammaticAudit from "./pages/ProgrammaticAudit.tsx";
import Auth from "./pages/Auth.tsx";
import SeoDashboard from "./pages/SeoDashboard.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import { PROGRAMMATIC_PAGES } from "./data/programmatic-pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/audit/intake-preview" element={<IntakePreview />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/seo" element={<SeoDashboard />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          {PROGRAMMATIC_PAGES.map((p) => (
            <Route key={p.slug} path={`/${p.slug}`} element={<ProgrammaticAudit />} />
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
