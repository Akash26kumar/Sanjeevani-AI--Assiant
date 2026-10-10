
import React from 'react';
import { Sparkles, ShieldCheck, Clock, Brain, FileBarChart, MessageCircle } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const Features = () => {
  const features = [
    {
      icon: <FileBarChart size={24} className="text-health-500" />,
      title: 'Jeevani Digital Health ID',
      description: 'Securely store and access your complete health profile, medical history, and emergency contacts in one place.',
    },
    {
      icon: <Brain size={24} className="text-health-500" />,
      title: 'Predictive Health Alerts',
      description: 'AI-powered analysis to identify potential health risks before they become serious issues.',
    },
    {
      icon: <ShieldCheck size={24} className="text-health-500" />,
      title: 'Fake Medicine Scanner',
      description: 'Verify the authenticity of your medications with our advanced image recognition technology.',
    },
    {
      icon: <Clock size={24} className="text-health-500" />,
      title: 'Smart Medication Reminders',
      description: 'Never miss a dose with personalized reminders and automatic refill notifications.',
    },
    {
      icon: <Sparkles size={24} className="text-health-500" />,
      title: 'Personalized Diet & Fitness',
      description: 'Get customized nutrition and exercise plans based on your health data and goals.',
    },
    {
      icon: <MessageCircle size={24} className="text-health-500" />,
      title: 'Sanjeevani AI Assistant',
      description: '24/7 health guidance, symptom assessment, and emergency support at your fingertips.',
    },
  ];

  return (
    <section id="features" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-health-500 font-medium mb-2 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Health Management</h2>
            <p className="text-muted-foreground">
              Our AI-powered platform offers a suite of innovative features designed to revolutionize 
              how you manage your health and wellness journey.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={100 * index} direction="up">
              <div className="bg-card shadow-sm hover:shadow-md transition-shadow rounded-xl p-6 border border-border h-full">
                <div className="p-3 bg-secondary rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
