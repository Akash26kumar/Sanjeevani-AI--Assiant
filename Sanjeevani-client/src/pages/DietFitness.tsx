import React, { useEffect, useState } from "react";
import { Utensils, Clock, ArrowRight, IceCreamBowl } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { REPORTS_API_URL } from "@/lib/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import axios from "axios";

const DietFitness = () => {
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedPlan = localStorage.getItem("dietPlan");
    if (storedPlan) {
      setDietPlan(JSON.parse(storedPlan));
    }
  }, []);

  const fetchDietPlan = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${REPORTS_API_URL}/diet`,
        { patientId: "67de81a66e6820d3446eaa22" }
      );

      setDietPlan(response.data.diet_plan);
      localStorage.setItem("dietPlan", JSON.stringify(response.data.diet_plan));
    } catch (err) {
      setError("Failed to fetch diet plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Personalized Diet & Fitness
          </h1>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Get customized nutrition and exercise plans based on your health data and goals.
          </p>
        </FadeIn>

        <Tabs defaultValue="diet" className="w-full max-w-4xl mx-auto">
          <TabsList className="w-full justify-center bg-transparent space-x-2">
            <TabsTrigger
              value="diet"
              className="data-[state=active]:bg-health-500 data-[state=active]:text-white py-2 px-4 rounded-full"
            >
              <Utensils className="mr-2 h-4 w-4" />
              Diet Plan
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="diet" className="mt-0">
              {loading && <p className="text-center text-blue-500">Loading...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}

              {dietPlan ? (
                <FadeIn delay={100}>
                  <Card className="bg-white mb-8">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-health-500" />
                        Today's Meal Plan
                      </h3>

                      <div className="space-y-6">
                        {Object.entries(dietPlan).map(([meal, description]) =>
                          meal !== "Notes" ? (
                            <div key={meal}>
                              <h4 className="font-medium text-health-600 mb-2">{meal}</h4>
                              <Card className="border bg-secondary/30">
                                <CardContent className="p-4">
                                  <div className="flex gap-4">
                                    <div className="h-16 w-16 flex justify-center items-center bg-muted rounded-md">
                                      <IceCreamBowl className="text-gray-500"/>
                                    </div>
                                    <div>
                                      <h5 className="font-medium">{description.split(" - ")[0]}</h5>
                                      <p className="text-sm text-muted-foreground">
                                        {description.split(" - ")[1]}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          ) : null
                        )}
                      </div>
                    </CardContent>
                  </Card>

                   <div className="bg-health-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Dietary Notes</h3>
                    <p className="text-muted-foreground">{dietPlan.Notes}</p>
                  </div> 
                </FadeIn>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">No diet plan found. Click below to generate one.</p>
                  <button
                    onClick={fetchDietPlan}
                    className="bg-health-500 text-white px-6 py-2 rounded-md hover:bg-health-600 transition"
                  >
                    Generate Diet Plan
                  </button>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default DietFitness;
