
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Layout } from '@/components/layout/Layout';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from '@/components/ui/CustomButton';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, this would connect to an auth service
    console.log(values);
    toast({
      title: "Login successful",
      description: "Welcome back to Sanjeevani Health Sphere!",
    });
    navigate("/dashboard");
  }

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <Link to="/" className="flex items-center text-health-500 mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Sanjeevani account</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CustomButton 
              type="submit" 
              variant="health" 
              size="lg" 
              className="w-full"
              isLoading={form.formState.isSubmitting}
            >
              Sign In
            </CustomButton>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-health-500 hover:underline">
                  Sign up
                </Link>
              </p>
              <Link to="/" className="text-sm text-health-500 hover:underline block mt-2">
                Forgot your password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
