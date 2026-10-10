import React, { useState, useEffect } from 'react';
import { REPORTS_API_URL } from "@/lib/api";
import axios from 'axios';
import { AlertTriangle, Info, Check, ArrowRight, Loader } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';

const PredictiveAlerts = () => {
  const [highRisks, setHighRisks] = useState([]);
  const [moderateRisks, setModerateRisks] = useState([]);
  const [lowRisks, setLowRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const { data } =  await axios.post(
          `${REPORTS_API_URL}/alerts`,
          { patientId: "67de81a66e6820d3446eaa22" }
        );
  
        localStorage.setItem('healthAlerts', JSON.stringify(data.alerts));

        setHighRisks(data.alerts.filter(alert => alert.severity.toLowerCase() === 'high'));
        setModerateRisks(data.alerts.filter(alert => alert.severity.toLowerCase() === 'moderate'));
        setLowRisks(data.alerts.filter(alert => alert.severity.toLowerCase() === 'low'));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };

    const storedAlerts = localStorage.getItem('healthAlerts');
    if (storedAlerts) {
      const parsedAlerts = JSON.parse(storedAlerts);
      setHighRisks(parsedAlerts.filter(alert => alert.severity.toLowerCase() === 'high'));
      setModerateRisks(parsedAlerts.filter(alert => alert.severity.toLowerCase() === 'moderate'));
      setLowRisks(parsedAlerts.filter(alert => alert.severity.toLowerCase() === 'low'));
      setLoading(false);
    } else {
      fetchAlerts();
    }
  }, []);

  const renderRiskCard = (risk) => {
    const severityColors = {
      high: 'border-l-4 border-l-red-500',
      moderate: 'border-l-4 border-l-amber-500',
      low: 'border-l-4 border-l-blue-500',
    };

    const severityIcons = {
      high: <AlertTriangle className="h-5 w-5 text-red-500" />,
      moderate: <Info className="h-5 w-5 text-amber-500" />,
      low: <Info className="h-5 w-5 text-blue-500" />,
    };

    return (
      <Card key={risk.title} className={`mb-4 hover:shadow-md transition-shadow ${severityColors[risk.severity.toLowerCase()]}`}>
        <CardContent className="p-5">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">{severityIcons[risk.severity.toLowerCase()]}</div>
            <div className="flex-grow">
              <h3 className="font-medium text-lg">{risk.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{risk.description}</p>

              {risk.suggestedActions && (
                <div className="mt-3 p-3 bg-primary-foreground/50 rounded-md">
                  {risk.suggestedActions.map((action, index) => (
                    <div key={index} className="flex items-start mb-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                      <p className="text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3">
                {/* <Button variant="link" className="text-health-500 p-0 h-auto">
                  View detailed analysis <ArrowRight className="ml-1 h-3 w-3" />
                </Button> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />
  
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Predictive Health Alerts</h1>
            <p className="text-muted-foreground text-center mb-10">
              AI-powered analysis to identify potential health risks before they become serious issues
            </p>
          </FadeIn>
  
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="animate-spin h-8 w-8 text-gray-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <FadeIn delay={100}>
              <div>
                <h2 className="text-xl font-semibold">Your Health Risk Assessment</h2>
                <p className="text-muted-foreground">Last updated: Today, 9:45 AM</p>
              </div>
  
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">High Risk: {highRisks.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm">Moderate Risk: {moderateRisks.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Low Risk: {lowRisks.length}</span>
                </div>
              </div>
  
              <Tabs defaultValue="all" className="mt-6">
                <TabsList className="mx-auto">
                  <TabsTrigger value="all">All Alerts</TabsTrigger>
                  <TabsTrigger value="high">High Risk</TabsTrigger>
                  <TabsTrigger value="moderate">Moderate Risk</TabsTrigger>
                  <TabsTrigger value="low">Low Risk</TabsTrigger>
                </TabsList>
  
                <TabsContent value="all" className="mt-6">
                  <div className="space-y-4">
                    {highRisks.map(renderRiskCard)}
                    {moderateRisks.map(renderRiskCard)}
                    {lowRisks.map(renderRiskCard)}
                  </div>
                </TabsContent>
  
                <TabsContent value="high" className="mt-6">
                  <div className="space-y-4">
                    {highRisks.map(renderRiskCard)}
                  </div>
                </TabsContent>
  
                <TabsContent value="moderate" className="mt-6">
                  <div className="space-y-4">
                    {moderateRisks.map(renderRiskCard)}
                  </div>
                </TabsContent>
  
                <TabsContent value="low" className="mt-6">
                  <div className="space-y-4">
                    {lowRisks.map(renderRiskCard)}
                  </div>
                </TabsContent>
              </Tabs>
            </FadeIn>
          )}
        </div>
      </main>
  
      <Footer />
    </div>
  );
  
};

export default PredictiveAlerts;
