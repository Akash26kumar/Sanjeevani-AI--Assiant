
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import DashboardPreview from '@/components/home/DashboardPreview';
import FadeIn from '@/components/animations/FadeIn';
import { Download, Users, ShieldCheck } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <DashboardPreview />
        
        {/* Stats Section */}
        <section className="py-20 bg-health-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn delay={100}>
                <div className="text-center">
                  <div className="text-health-500 text-4xl md:text-5xl font-bold mb-2">10M+</div>
                  <p className="text-muted-foreground">Active Users</p>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="text-center">
                  <div className="text-health-500 text-4xl md:text-5xl font-bold mb-2">98%</div>
                  <p className="text-muted-foreground">Accuracy Rate</p>
                </div>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="text-center">
                  <div className="text-health-500 text-4xl md:text-5xl font-bold mb-2">24/7</div>
                  <p className="text-muted-foreground">Health Assistance</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-0 right-0 top-0 h-1/3 bg-gradient-to-b from-health-50 to-transparent"></div>
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-l from-health-100/30 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="max-w-4xl mx-auto glass shadow-xl rounded-2xl p-8 md:p-12 border border-white/20 relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Health Journey Today</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Join millions of users who have transformed their approach to health management with Sanjeevani Health Sphere.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CustomButton 
                    variant="health" 
                    size="lg" 
                    icon={<Download size={16} />} 
                    iconPosition="left"
                  >
                    Download App
                  </CustomButton>
                  <CustomButton 
                    variant="outline" 
                    size="lg"
                  >
                    Learn More
                  </CustomButton>
                </div>
                
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <ShieldCheck size={18} className="text-health-500 mr-2" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={18} className="text-health-500 mr-2" />
                    <span>Trusted by 10M+ Users</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
