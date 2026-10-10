import React, { useState } from 'react';
import { Clock, Bell, AlertCircle, Calendar, PlusCircle, CheckCircle2, XCircle, CheckCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';

const MedicationReminders = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('today');
  
  const medications = [
    {
      id: 1,
      name: 'Metformin',
      dosage: '500mg',
      instructions: 'Take with food',
      time: '08:00 AM',
      taken: true,
    },
    {
      id: 2,
      name: 'Loratadine',
      dosage: '10mg',
      instructions: 'Take once daily',
      time: '09:30 AM',
      taken: false,
    },
    {
      id: 3,
      name: 'Vitamin D3',
      dosage: '1000 IU',
      instructions: 'Take with breakfast',
      time: '08:00 AM',
      taken: false,
    },
    {
      id: 4,
      name: 'Atorvastatin',
      dosage: '20mg',
      instructions: 'Take at bedtime',
      time: '10:00 PM',
      taken: false,
    },
  ];
  
  const upcomingRefills = [
    {
      id: 1,
      name: 'Metformin',
      remaining: 5,
      refillDate: '23 May 2023',
    },
    {
      id: 2,
      name: 'Atorvastatin',
      remaining: 3,
      refillDate: '20 May 2023',
    },
  ];
  
  const handleToggleTaken = (id) => {
    // In a real app, this would update the state
    toast({
      title: "Medication marked as taken",
      description: "Your medication log has been updated.",
    });
  };
  
  const handleToggleReminder = (enabled) => {
    toast({
      title: enabled ? "Reminders enabled" : "Reminders disabled",
      description: `Medication reminders are now ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleAddMedication = () => {
    toast({
      title: "Add medication",
      description: "Opening medication form...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Smart Medication Reminders</h1>
            <p className="text-muted-foreground text-center mb-10">
              Never miss a dose with personalized reminders and automatic refill notifications
            </p>
          </FadeIn>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <FadeIn delay={100}>
                <Card className="mb-6">
                  <CardHeader className="bg-health-50 pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-health-500" />
                        Medication Schedule
                      </CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-health-500" 
                        onClick={handleAddMedication}
                      >
                        <PlusCircle className="mr-1 h-4 w-4" /> Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="today" className="w-full" onValueChange={setActiveTab}>
                      <div className="border-b px-6 py-2">
                        <TabsList className="bg-transparent border p-0 h-auto rounded-full">
                          <TabsTrigger 
                            value="today"
                            className="data-[state=active]:bg-health-100 data-[state=active]:text-health-700 rounded-full px-4 py-1"
                          >
                            Today
                          </TabsTrigger>
                          <TabsTrigger 
                            value="tomorrow"
                            className="data-[state=active]:bg-health-100 data-[state=active]:text-health-700 rounded-full px-4 py-1"
                          >
                            Tomorrow
                          </TabsTrigger>
                          <TabsTrigger 
                            value="week"
                            className="data-[state=active]:bg-health-100 data-[state=active]:text-health-700 rounded-full px-4 py-1"
                          >
                            Week
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <TabsContent value="today" className="p-0 m-0">
                        <div className="divide-y">
                          {medications.map((med) => (
                            <div key={med.id} className="p-4 hover:bg-muted/30 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Toggle
                                    pressed={med.taken}
                                    onPressedChange={() => handleToggleTaken(med.id)}
                                    className={`mr-3 ${med.taken ? 'bg-health-100 text-health-700' : 'bg-muted'}`}
                                  >
                                    {med.taken ? 
                                      <CheckCircle2 className="h-4 w-4" /> : 
                                      <XCircle className="h-4 w-4" />
                                    }
                                  </Toggle>
                                  <div>
                                    <div className="flex items-center">
                                      <h3 className={`font-medium ${med.taken ? 'line-through text-muted-foreground' : ''}`}>
                                        {med.name} - {med.dosage}
                                      </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {med.instructions}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">{med.time}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tomorrow" className="p-6 m-0 text-center text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                        <p>Your medication schedule for tomorrow</p>
                        <Button variant="link" className="mt-2 text-health-500">
                          View or edit schedule
                        </Button>
                      </TabsContent>
                      
                      <TabsContent value="week" className="p-6 m-0 text-center text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                        <p>Your weekly medication schedule</p>
                        <Button variant="link" className="mt-2 text-health-500">
                          View weekly overview
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </FadeIn>
              
              <FadeIn delay={200}>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-health-500" />
                      Upcoming Refills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingRefills.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingRefills.map((refill) => (
                          <div key={refill.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                            <div>
                              <h4 className="font-medium">{refill.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {refill.remaining} days remaining
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">Refill by:</p>
                              <p className="text-sm text-health-600">{refill.refillDate}</p>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full mt-4">
                          Request All Refills
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <p className="text-muted-foreground">No upcoming refills needed</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
            
            <div className="md:w-1/3">
              <FadeIn delay={150}>
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-health-500" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Medication Reminders</label>
                        <Toggle defaultPressed onPressedChange={handleToggleReminder}>
                          <Bell className="h-4 w-4" />
                        </Toggle>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Refill Alerts</label>
                        <Toggle defaultPressed onPressedChange={handleToggleReminder}>
                          <Bell className="h-4 w-4" />
                        </Toggle>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Daily Summary</label>
                        <Toggle onPressedChange={handleToggleReminder}>
                          <Bell className="h-4 w-4" />
                        </Toggle>
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          Advanced Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              
              <FadeIn delay={250}>
                <Card>
                  <CardContent className="p-6">
                    <div className="bg-health-50 rounded-lg p-4 mb-4">
                      <h3 className="font-medium text-center mb-2">Medication Adherence</h3>
                      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white border-4 border-health-500 mx-auto">
                        <span className="text-2xl font-bold text-health-600">92%</span>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        Great job! You've taken 92% of your medications on time this month.
                      </p>
                    </div>
                    
                    <h4 className="font-medium mb-3">Tips for Remembering</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <CheckCheck className="h-4 w-4 text-health-500 mr-2 mt-0.5" />
                        <span>Take medications at the same time each day</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-4 w-4 text-health-500 mr-2 mt-0.5" />
                        <span>Use a pill organizer to sort your weekly medications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-4 w-4 text-health-500 mr-2 mt-0.5" />
                        <span>Link taking medication with daily activities like brushing teeth</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MedicationReminders;
