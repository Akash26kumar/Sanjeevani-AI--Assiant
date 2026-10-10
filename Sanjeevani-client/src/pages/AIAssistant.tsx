
import React, { useState } from 'react';
import { Bot, User, Send, PlusCircle, Sparkles, ThumbsUp, ThumbsDown, Loader2, Check, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: 'Hello! I\'m Sanjeevani, your AI health assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponses = [
        "Based on your symptoms, you might be experiencing seasonal allergies. I recommend taking an antihistamine and keeping track of when symptoms appear to identify triggers.",
        "Your medication schedule has been updated. I'll remind you to take Metformin at 9:00 AM and 9:00 PM daily.",
        "According to your health data, your blood pressure readings have improved over the past month. Keep up the good work with your diet and exercise routine!",
        "I've analyzed your sleep patterns, and you've been averaging 6.2 hours per night. For optimal health, adults should aim for 7-9 hours. Would you like some tips to improve sleep quality?",
        "The symptoms you're describing could be signs of dehydration. Try drinking water and electrolytes. If symptoms persist for more than 24 hours, please consult with a healthcare provider.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: chatMessages.length + 2,
        role: 'bot',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setChatMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const suggestedQuestions = [
    "What are the side effects of my medication?",
    "How can I improve my sleep quality?",
    "What could be causing my headaches?",
    "Should I be worried about these symptoms?",
    "How do I manage my stress levels?",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Sanjeevani AI Assistant</h1>
            <p className="text-muted-foreground text-center mb-10">
              24/7 health guidance, symptom assessment, and emergency support at your fingertips
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FadeIn delay={100}>
                <Card className="shadow-sm border-white/20 overflow-hidden h-[600px] flex flex-col">
                  <div className="bg-health-500 p-4 text-white">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded-full mr-3">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold">Sanjeevani AI</h2>
                        <p className="text-xs opacity-90">Online • Responding in seconds</p>
                      </div>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground ml-12' 
                                : 'bg-muted mr-12'
                            }`}
                          >
                            <div className="flex items-center mb-1">
                              <div 
                                className={`p-1 rounded-full mr-2 ${
                                  msg.role === 'user' ? 'bg-primary-foreground/20' : 'bg-health-100'
                                }`}
                              >
                                {msg.role === 'user' ? (
                                  <User className="h-3 w-3" />
                                ) : (
                                  <Bot className="h-3 w-3 text-health-500" />
                                )}
                              </div>
                              <span className="text-xs opacity-70">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm">{msg.content}</p>
                            
                            {msg.role === 'bot' && (
                              <div className="flex items-center mt-2 justify-end gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg p-3 bg-muted mr-12">
                            <div className="flex items-center">
                              <div className="p-1 rounded-full mr-2 bg-health-100">
                                <Bot className="h-3 w-3 text-health-500" />
                              </div>
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Type your health question here..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="resize-none min-h-[60px]"
                      />
                      <Button 
                        className="bg-health-500 hover:bg-health-600 text-white" 
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isTyping}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {suggestedQuestions.slice(0, 3).map((question, idx) => (
                        <Button 
                          key={idx} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => setMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
            
            <div>
              <FadeIn delay={150}>
                <Card className="mb-6">
                  <CardContent className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-health-100 rounded-full mr-3">
                        <Sparkles className="h-5 w-5 text-health-600" />
                      </div>
                      <h3 className="font-medium">AI Capabilities</h3>
                    </div>
                    
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <div className="bg-health-50 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-health-500" />
                        </div>
                        <span>Symptom assessment and guidance</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-health-50 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-health-500" />
                        </div>
                        <span>Medication and treatment information</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-health-50 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-health-500" />
                        </div>
                        <span>Diet and exercise recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-health-50 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-health-500" />
                        </div>
                        <span>Health data analysis and insights</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-health-50 p-1 rounded-full mr-2 mt-0.5">
                          <Check className="h-3 w-3 text-health-500" />
                        </div>
                        <span>Emergency situation guidance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
              
              <FadeIn delay={200}>
                <Tabs defaultValue="faq">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="faq">FAQs</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="faq" className="p-0 mt-5">
                    <div className="space-y-3">
                      <div className="bg-secondary p-3 rounded-lg">
                        <p className="text-sm font-medium">How accurate is the AI assistant?</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Sanjeevani AI is trained on medical data but always consult a healthcare professional for diagnosis.
                        </p>
                      </div>
                      <div className="bg-secondary p-3 rounded-lg">
                        <p className="text-sm font-medium">Is my conversation private?</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Yes, all conversations are encrypted and securely stored in compliance with HIPAA regulations.
                        </p>
                      </div>
                      <div className="bg-secondary p-3 rounded-lg">
                        <p className="text-sm font-medium">Can I share my conversation with my doctor?</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Yes, you can export or share your conversation history with healthcare providers.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="p-0 mt-5">
                    <div className="space-y-3">
                      <div className="border p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Yesterday, 3:45 PM</p>
                        <p className="text-sm font-medium">About migraine symptoms</p>
                      </div>
                      <div className="border p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">May 12, 10:20 AM</p>
                        <p className="text-sm font-medium">Medication interactions</p>
                      </div>
                      <div className="border p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">May 5, 8:15 PM</p>
                        <p className="text-sm font-medium">Diet recommendations</p>
                      </div>
                      <Button variant="link" className="text-health-500 text-xs pl-0">
                        View full history
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </FadeIn>
              
              <FadeIn delay={250}>
                <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-medium text-red-800">Important Notice</h3>
                  </div>
                  <p className="text-xs text-red-700">
                    In case of medical emergency, call emergency services immediately. 
                    This AI assistant is not a substitute for professional medical advice, 
                    diagnosis, or treatment.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAssistant;
