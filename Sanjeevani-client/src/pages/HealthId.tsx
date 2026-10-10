import React from "react";
import { QrCode, Download, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { useToast } from "@/components/ui/use-toast";

const HealthId = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your Jeevani ID is being downloaded as PDF",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Options",
      description: "Sharing options opened",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Jeevani Digital Health ID
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              Your secure digital health identity for seamless healthcare access
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <Card className="glass shadow-lg border-white/20 overflow-hidden">
              <div className="bg-health-500 p-5 text-white">
                <h2 className="text-xl font-semibold">Jeevani Health ID</h2>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <QrCode size={160} className="text-health-800" />
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Name
                        </label>
                        <p className="font-medium">Priya Sharma</p>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Jeevani ID
                        </label>
                        <p className="font-medium">JVNI-2023-9876-5432</p>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Date of Birth
                        </label>
                        <p className="font-medium">15 Aug 1995</p>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Blood Group
                        </label>
                        <p className="font-medium">B+</p>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">
                          Emergency Contact
                        </label>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <Button
                    variant="default"
                    className="bg-health-500 hover:bg-health-600"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download ID
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-12 bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                About Jeevani Digital Health ID
              </h3>
              <p className="text-muted-foreground mb-4">
                Your Jeevani Digital Health ID is a unique identifier that gives
                you access to your health records across healthcare providers.
                It ensures a seamless healthcare experience and helps medical
                professionals provide better care with access to your complete
                health history.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Secure and encrypted personal health information</li>
                <li>Easily share your health records with doctors</li>
                <li>Access your medical history anytime, anywhere</li>
                <li>
                  Enables faster emergency response with critical health data
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthId;
