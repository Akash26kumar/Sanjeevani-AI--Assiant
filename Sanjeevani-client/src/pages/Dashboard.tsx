import React from "react";
import {
  User,
  Calendar,
  Bell,
  FileBarChart,
  Brain,
  ShieldCheck,
  Clock,
  Sparkles,
  MessageCircle,
  ChevronRight,
  Activity,
  Pill,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src="https://example.com/avatar.jpg" alt="User" />

                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Welcome, Priya
                  </h1>
                  <p className="text-muted-foreground">Your health dashboard</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-health-500 hover:bg-health-600"
                  variant="health"
                  onClick={() => (window.location.href = "/health-id")}
                >
                  <FileBarChart className="mr-2 h-4 w-4" /> View Health ID
                </Button>
                <Button variant="outline">
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </Button>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <FadeIn delay={100}>
              <Card className="hover:shadow-md transition-shadow overflow-hidden border-muted">
                <div className="bg-health-50 h-2"></div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-2">Health Score</h3>
                      <div className="text-3xl font-bold text-health-600">
                        83
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Activity className="h-3 w-3 mr-1" />
                        <span>3% better than last month</span>
                      </div>
                    </div>
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-health-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={150}>
              <Card className="hover:shadow-md transition-shadow overflow-hidden border-muted">
                <div className="bg-amber-50 h-2"></div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-2">
                        Upcoming Appointments
                      </h3>
                      <div className="text-3xl font-bold text-amber-600">2</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Next: Dr. Mehta, May 25</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="hover:shadow-md transition-shadow overflow-hidden border-muted">
                <div className="bg-blue-50 h-2"></div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-2">Medications</h3>
                      <div className="text-3xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Pill className="h-3 w-3 mr-1" />
                        <span>Next dose in 2 hours</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                      <Pill className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <div className="mb-10">
            <FadeIn delay={250}>
              <h2 className="text-xl font-semibold mb-4">
                Sanjeevani Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/health-id" className="block">
                  <Card className="hover:shadow-md transition-all hover:border-health-200 h-full cursor-pointer">
                    <CardContent className="p-5 flex items-start">
                      <div className="mr-4 bg-health-100 p-3 rounded-lg">
                        <FileBarChart className="h-6 w-6 text-health-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Jeevani Health ID</h3>
                        <p className="text-sm text-muted-foreground">
                          Your secure digital health identity
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/medical-reports" className="block">
                  <Card className="hover:shadow-md transition-all hover:border-health-200 h-full cursor-pointer">
                    <CardContent className="p-5 flex items-start">
                      <div className="mr-4 bg-health-100 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-health-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Medical Reports</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload and manage your medical records
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/predictive-alerts" className="block">
                  <Card className="hover:shadow-md transition-all hover:border-health-200 h-full cursor-pointer">
                    <CardContent className="p-5 flex items-start">
                      <div className="mr-4 bg-health-100 p-3 rounded-lg">
                        <Brain className="h-6 w-6 text-health-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Predictive Health Alerts
                        </h3>
                        <p className="text-sm text-muted-foreground">

                          Potential health risks
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/medicine-scanner" className="block">
                  <Card className="hover:shadow-md transition-all hover:border-health-200 h-full cursor-pointer">
                    <CardContent className="p-5 flex items-start">
                      <div className="mr-4 bg-health-100 p-3 rounded-lg">
                        <ShieldCheck className="h-6 w-6 text-health-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Fake Medicine Scanner
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Verify medication authenticity
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/medication-reminders" className="block">
                  <Card className="hover:shadow-md transition-all hover:border-health-200 h-full cursor-pointer">
                    <CardContent className="p-5 flex items-start">
                      <div className="mr-4 bg-health-100 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-health-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Medication Reminders
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          <Badge className="bg-blue-100 text-blue-700 border-none mr-2">
                            NEXT: 2PM
                          </Badge>
                          Never miss a dose
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/diet-fitness" className="block">
                  <Card className="hover:shadow-md transition-all hover:border-health-200 h-full cursor-pointer">
                    <CardContent className="p-5 flex items-start">
                      <div className="mr-4 bg-health-100 p-3 rounded-lg">
                        <Sparkles className="h-6 w-6 text-health-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Diet & Fitness Plan
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Personalized health recommendations
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>

                {/* <Link to="/ai-assistant" className="block">
                  <Card className="hover:shadow-md transition-all hover:border-health-200 h-full cursor-pointer">
                    <CardContent className="p-5 flex items-start">
                      <div className="mr-4 bg-health-100 p-3 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-health-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">
                          Sanjeevani AI Assistant
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          24/7 health guidance
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link> */}


              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FadeIn delay={300} className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Your Health Overview</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Health Score</span>
                        <span>83/100</span>
                      </div>
                      <Progress value={83} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">
                          Recent Metrics
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 bg-secondary rounded-lg">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-sm">Blood Pressure</span>
                            </div>
                            <span className="text-sm font-medium">120/80</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-secondary rounded-lg">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                              <span className="text-sm">
                                Resting Heart Rate
                              </span>
                            </div>
                            <span className="text-sm font-medium">68 bpm</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-secondary rounded-lg">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                              <span className="text-sm">Sleep Quality</span>
                            </div>
                            <span className="text-sm font-medium">7.5 hrs</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">
                          Upcoming Tasks
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center p-2 bg-secondary rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">Blood Test (May 28)</span>
                          </div>
                          <div className="flex items-center p-2 bg-secondary rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm">
                              Medication Refill (May 25)
                            </span>
                          </div>
                          <div className="flex items-center p-2 bg-secondary rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">
                              Dental Checkup (June 10)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        View Complete Health Record
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={350}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Latest Activity</h3>
                    <Button
                      variant="link"
                      className="text-health-500 p-0 h-auto"
                    >
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3 border-b pb-3">
                      <div className="bg-muted p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <Pill className="h-4 w-4 text-health-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Medication Taken</p>
                        <p className="text-xs text-muted-foreground">
                          Metformin 500mg
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Today, 9:15 AM
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 border-b pb-3">
                      <div className="bg-muted p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <Activity className="h-4 w-4 text-health-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Blood Pressure Updated
                        </p>
                        <p className="text-xs text-muted-foreground">
                          120/80 mmHg
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Today, 8:30 AM
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 border-b pb-3">
                      <div className="bg-muted p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-4 w-4 text-health-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">AI Assistant Chat</p>
                        <p className="text-xs text-muted-foreground">
                          About headache symptoms
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Yesterday, 3:45 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="bg-muted p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-4 w-4 text-health-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Medicine Verified</p>
                        <p className="text-xs text-muted-foreground">
                          Atorvastatin 20mg
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Yesterday, 10:20 AM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
