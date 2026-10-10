
import React from 'react';
import { Bell, Calendar, Shield, PieChart, MessageSquare, Activity } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

const DashboardPreview = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-health-500 font-medium mb-2 block">Intelligent Dashboard</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Health at a Glance</h2>
            <p className="text-muted-foreground">
              Monitor your health metrics, receive personalized insights, and manage your wellness 
              journey through our intuitive and comprehensive dashboard.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="glass border border-white/20 rounded-2xl shadow-xl overflow-hidden mx-auto max-w-5xl">
            <div className="bg-health-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Sanjeevani Health Dashboard</div>
                <div className="flex items-center gap-3">
                  <Bell size={18} />
                  <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold">Welcome back, Rahul</h3>
                  <p className="text-muted-foreground">Your health stats for today</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-health-100 text-health-600 rounded-md">
                    Today
                  </button>
                  <button className="px-3 py-1 text-sm bg-secondary text-foreground/70 rounded-md">
                    Week
                  </button>
                  <button className="px-3 py-1 text-sm bg-secondary text-foreground/70 rounded-md">
                    Month
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Activity size={18} className="text-health-500 mr-2" />
                    <h4 className="font-medium">Health Score</h4>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold">87</span>
                    <span className="text-green-500 text-sm">↑ 3%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-health-500 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Calendar size={18} className="text-health-500 mr-2" />
                    <h4 className="font-medium">Medication</h4>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold">2</span>
                    <span className="text-muted-foreground text-sm">doses today</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Next: Vitamin D at 9:00 PM
                  </p>
                </div>
                
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Shield size={18} className="text-health-500 mr-2" />
                    <h4 className="font-medium">Health Alerts</h4>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-muted-foreground text-sm">active alerts</span>
                  </div>
                  <p className="text-sm text-green-500 mt-2">
                    All metrics within normal range
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-2 bg-secondary rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium flex items-center">
                      <PieChart size={18} className="text-health-500 mr-2" />
                      Weekly Activity
                    </h4>
                    <button className="text-sm text-health-500">View Details</button>
                  </div>
                  
                  <div className="h-48 flex items-end justify-between px-2">
                    {[40, 65, 45, 70, 85, 60, 50].map((height, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div 
                          className="w-5 bg-health-200 hover:bg-health-300 transition-colors rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-muted-foreground">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center mb-4">
                    <MessageSquare size={18} className="text-health-500 mr-2" />
                    <h4 className="font-medium">Sanjeevani Assistant</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">How can I help you today?</p>
                    </div>
                    
                    <div className="bg-health-100 rounded-lg p-3 ml-auto max-w-[80%]">
                      <p className="text-sm">What's my health score today?</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">Your health score today is 87, which is 3% higher than yesterday. All your vitals are in the normal range.</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask something..."
                      className="flex-1 text-sm p-2 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-health-500"
                    />
                    <button className="bg-health-500 text-white p-2 rounded-lg">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default DashboardPreview;
