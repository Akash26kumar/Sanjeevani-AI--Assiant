
import React from 'react';
import { ArrowRight, Shield, CheckCircle, Zap } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import CustomButton from '../ui/CustomButton';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-gradient-to-l from-health-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-gradient-to-r from-health-200/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <FadeIn delay={100} direction="up">
            <div className="text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-health-100 text-health-700 text-sm font-medium mb-6">
                <span className="flex items-center">
                  <Zap size={16} className="mr-1" /> 
                  Next-gen Healthcare Platform
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your <span className="text-gradient">Intelligent</span> Health Companion
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Experience healthcare reimagined with AI-powered health management, personalized insights, and 24/7 guidance at your fingertips.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <CustomButton variant="health" size="lg" icon={<ArrowRight size={16} />} iconPosition="right">
                  Get Started
                </CustomButton>
                <CustomButton variant="outline" size="lg">
                  Learn More
                </CustomButton>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-health-500 mr-2" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-health-500 mr-2" />
                  <span>AI-Powered Insights</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-health-500 mr-2" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </FadeIn>
          
          {/* Hero Image/Animation */}
          <FadeIn delay={300} direction="right">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass">
                <div className="aspect-[4/3] bg-gradient-to-br from-health-100 to-health-50 p-6 flex items-center justify-center">
                  {/* Health ID Card Animation/Mockup */}
                  <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative hover-scale">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">Jeevani Health ID</h3>
                        <p className="text-sm text-gray-500">Digital Health Profile</p>
                      </div>
                      <div className="text-health-500 flex items-center">
                        <Shield size={24} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Name</span>
                        <span className="text-sm font-medium">Rahul Sharma</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">ID Number</span>
                        <span className="text-sm font-medium">SAN-48621937</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Blood Group</span>
                        <span className="text-sm font-medium">O+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Emergency Contact</span>
                        <span className="text-sm font-medium">+91 98765 43210</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="mb-2 h-12 bg-gray-200 rounded-md animate-pulse-subtle"></div>
                        <p className="text-xs text-gray-500">Scan to access medical records</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-health-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 -top-10 -left-10 w-32 h-32 bg-health-300/20 rounded-full blur-2xl"></div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Hero;
