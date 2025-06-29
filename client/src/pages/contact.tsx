import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { api } from "@/lib/api";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "general",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: api.inquiries.create,
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted Successfully",
        description: "Thank you for your message. We will get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    createInquiryMutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-soft-gray">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-brown mb-6">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-primary-brown opacity-80 leading-relaxed max-w-4xl mx-auto">
            Ready to transform your space with our luxury carpets? We're here to help you find the perfect piece 
            or create a custom design that reflects your unique vision.
          </p>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <Card className="bg-primary-brown text-white border-0 mb-8">
                <CardHeader>
                  <CardTitle className="font-serif text-3xl text-warm-gold">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-warm-gold flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-warm-gold mb-1">Address</h4>
                      <p className="text-cream">
                        123 Artisan Quarter<br />
                        Heritage District<br />
                        Mumbai 400001, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-warm-gold flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-warm-gold mb-1">Phone</h4>
                      <p className="text-cream">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-warm-gold flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-warm-gold mb-1">Email</h4>
                      <p className="text-cream">info@ishwarrugs.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary-brown">
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-primary-brown">Monday - Friday</span>
                      <span className="text-primary-brown font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-brown">Saturday</span>
                      <span className="text-primary-brown font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-brown">Sunday</span>
                      <span className="text-primary-brown font-semibold">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary-brown">
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-primary-brown hover:text-warm-gold transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-8 w-8" />
                    </a>
                    <a
                      href="#"
                      className="text-primary-brown hover:text-warm-gold transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-8 w-8" />
                    </a>
                    <a
                      href="#"
                      className="text-primary-brown hover:text-warm-gold transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-8 w-8" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-3xl text-primary-brown">
                    Send us a Message
                  </CardTitle>
                  <p className="text-primary-brown opacity-80">
                    Whether you're interested in our collections or need a custom design, 
                    we'd love to hear from you.
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-brown font-semibold">
                                Full Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="border-soft-gray focus:border-warm-gold"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-brown font-semibold">
                                Email Address *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                  className="border-soft-gray focus:border-warm-gold"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-brown font-semibold">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your phone number"
                                  className="border-soft-gray focus:border-warm-gold"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-brown font-semibold">
                                Inquiry Type
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-soft-gray focus:border-warm-gold">
                                    <SelectValue placeholder="Select inquiry type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">General Inquiry</SelectItem>
                                  <SelectItem value="collection_inquiry">Collection Inquiry</SelectItem>
                                  <SelectItem value="custom_design">Custom Design Request</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-brown font-semibold">
                              Subject *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter subject"
                                className="border-soft-gray focus:border-warm-gold"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-brown font-semibold">
                              Message *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={6}
                                placeholder="Tell us about your requirements, preferred styles, dimensions, or any specific requests..."
                                className="border-soft-gray focus:border-warm-gold resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={createInquiryMutation.isPending}
                        className="w-full btn-primary text-lg py-6"
                      >
                        {createInquiryMutation.isPending ? "SENDING MESSAGE..." : "SEND MESSAGE"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="py-20 bg-soft-gray">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-brown mb-6">
            Custom Design Services
          </h2>
          <p className="text-xl text-primary-brown opacity-80 mb-8 leading-relaxed max-w-4xl mx-auto">
            Our design team specializes in creating bespoke carpets tailored to your exact specifications. 
            From concept to completion, we'll work with you to bring your vision to life.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-warm-gold text-primary-brown w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-2xl font-bold">
                1
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-brown mb-2">
                Consultation
              </h3>
              <p className="text-primary-brown opacity-80">
                Discuss your vision, space requirements, and design preferences with our experts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-warm-gold text-primary-brown w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-2xl font-bold">
                2
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-brown mb-2">
                Design & Approval
              </h3>
              <p className="text-primary-brown opacity-80">
                Our designers create detailed sketches and color renderings for your approval.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-warm-gold text-primary-brown w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-2xl font-bold">
                3
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-brown mb-2">
                Crafting & Delivery
              </h3>
              <p className="text-primary-brown opacity-80">
                Master artisans handcraft your carpet using traditional techniques and premium materials.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-primary-brown mb-4">
              Ready to Start Your Custom Design?
            </h3>
            <p className="text-primary-brown opacity-80 mb-6">
              Contact our design team today to discuss your project. We'll provide a detailed 
              consultation and timeline for your custom carpet creation.
            </p>
            <Button className="btn-secondary text-lg px-8 py-4">
              SCHEDULE DESIGN CONSULTATION
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-brown mb-6">
              Visit Our Showroom
            </h2>
            <p className="text-xl text-primary-brown opacity-80 max-w-4xl mx-auto">
              Experience our collections firsthand at our flagship showroom in Mumbai's Heritage District. 
              Our experts are available to guide you through our extensive collection.
            </p>
          </div>
          
          <div className="bg-soft-gray rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl font-bold text-primary-brown mb-4">
                Showroom Address
              </h3>
              <p className="text-lg text-primary-brown mb-6">
                123 Artisan Quarter, Heritage District<br />
                Mumbai 400001, India
              </p>
              <p className="text-primary-brown opacity-80 mb-8">
                Appointments recommended for personalized consultations and custom design services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary">
                  SCHEDULE APPOINTMENT
                </Button>
                <Button variant="outline" className="border-primary-brown text-primary-brown hover:bg-primary-brown hover:text-white">
                  GET DIRECTIONS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
