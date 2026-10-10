
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import HealthId from "./pages/HealthId";
import PredictiveAlerts from "./pages/PredictiveAlerts";
import MedicineScanner from "./pages/MedicineScanner";
import MedicationReminders from "./pages/MedicationReminders";
import DietFitness from "./pages/DietFitness";
import AIAssistant from "./pages/AIAssistant";
import MedicalReports from "./pages/MedicalReports";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health-id" element={<HealthId />} />
          <Route path="/predictive-alerts" element={<PredictiveAlerts />} />
          <Route path="/medicine-scanner" element={<MedicineScanner />} />
          <Route path="/medication-reminders" element={<MedicationReminders />} />
          <Route path="/diet-fitness" element={<DietFitness />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/medical-reports" element={<MedicalReports />} />
          <Route path='/report' element={<Reports/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
