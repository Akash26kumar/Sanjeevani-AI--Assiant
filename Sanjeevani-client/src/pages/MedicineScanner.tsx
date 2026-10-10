
import React, { useState } from 'react';
import { Upload, SearchCheck, ShieldCheck, AlertTriangle, Info, Camera, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/animations/FadeIn';
import CustomButton from '@/components/ui/CustomButton';

const MedicineScanner = () => {
  const [scanResult, setScanResult] = useState<null | 'authentic' | 'fake' | 'unknown'>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    // Simulate file upload
    toast({
      title: "Upload successful",
      description: "Processing your image...",
    });
    
    setIsScanning(true);
    
    // Simulate scan processing
    setTimeout(() => {
      setIsScanning(false);
      // Randomly choose a result for demonstration
      const results = ['authentic', 'fake', 'unknown'];
      const randomResult = results[Math.floor(Math.random() * results.length)] as 'authentic' | 'fake' | 'unknown';
      setScanResult(randomResult);
    }, 2000);
  };

  const renderScanResult = () => {
    if (!scanResult) return null;
    
    if (scanResult === 'authentic') {
      return (
        <Alert className="bg-green-50 border-green-200 text-green-800 mb-6">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          <AlertDescription className="ml-2">
            <span className="font-medium">Authentic Medicine Verified</span>
            <p className="text-sm mt-1">This medicine appears to be genuine and from a verified manufacturer.</p>
          </AlertDescription>
        </Alert>
      );
    } else if (scanResult === 'fake') {
      return (
        <Alert className="bg-red-50 border-red-200 text-red-800 mb-6">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="ml-2">
            <span className="font-medium">Potential Counterfeit Detected</span>
            <p className="text-sm mt-1">This medicine may be counterfeit. Please consult with your healthcare provider before use.</p>
          </AlertDescription>
        </Alert>
      );
    } else {
      return (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 mb-6">
          <Info className="h-5 w-5 text-amber-600" />
          <AlertDescription className="ml-2">
            <span className="font-medium">Unable to Verify</span>
            <p className="text-sm mt-1">We couldn't verify this medicine. Try scanning again with better lighting and a clearer image.</p>
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-health-50/30">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Fake Medicine Scanner</h1>
            <p className="text-muted-foreground text-center mb-10">
              Verify the authenticity of your medications with our advanced image recognition technology
            </p>
          </FadeIn>
          
          <FadeIn delay={100}>
            <Card className="mb-8 overflow-hidden">
              <div className="bg-health-500 p-5 text-white">
                <h2 className="text-xl font-semibold">Scan Medicine</h2>
                <p className="text-sm opacity-90">Upload an image of your medicine for verification</p>
              </div>
              
              <CardContent className="p-6">
                {renderScanResult()}
                
                <div className="bg-muted/30 border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <div className="mx-auto mb-4 bg-health-100 rounded-full p-3 w-fit">
                    <Upload className="h-6 w-6 text-health-500" />
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">Upload Medicine Image</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Take a clear photo of the medicine, including packaging and label
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CustomButton 
                      variant="health" 
                      icon={<Upload size={16} />} 
                      onClick={handleUpload}
                      isLoading={isScanning}
                    >
                      Upload Image
                    </CustomButton>
                    <Button variant="outline" onClick={handleUpload}>
                      <Camera className="mr-2 h-4 w-4" /> Take Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="bg-white p-3 rounded-full w-fit mb-4">
                    <SearchCheck className="h-5 w-5 text-health-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">How It Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI technology analyzes the visual characteristics of medicine packaging, 
                    barcodes, and pills to verify authenticity against a database of known genuine products.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-50 to-red-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="bg-white p-3 rounded-full w-fit mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Why It Matters</h3>
                  <p className="text-sm text-muted-foreground">
                    Counterfeit medicines can contain harmful ingredients or incorrect dosages. 
                    Verification helps protect your health and ensures treatment effectiveness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
          
          <FadeIn delay={300}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Scanning Tips</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 text-health-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Ensure good lighting when taking photos</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-health-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Include the entire packaging or blister pack</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-health-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Capture barcodes and batch numbers clearly</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-health-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Take multiple scans if you're unsure about results</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MedicineScanner;
