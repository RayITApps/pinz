import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChefHat, Cpu, Users, Zap, ShieldCheck, Milestone } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-primary">Pinz</h1>
        <Link to={createPageUrl('Auth')}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="text-center px-6 py-20 md:py-32">
        <h2 className="text-5xl md:text-7xl font-bold mb-4">The Cook-Tech Community.</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
          Bridging the gap between culinary artistry and modern kitchen technology. Learn, connect, and grow with the best in the industry.
        </p>
        <Link to={createPageUrl('Auth')}>
            <Button size="lg" className="text-lg h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90">Join the Community</Button>
        </Link>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
             <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-white" />
             </div>
            <h3 className="text-4xl font-bold mb-4">The Kitchen is Evolving. <br/>Are You?</h3>
            <p className="text-gray-600 text-lg">
              New technologies are transforming restaurants, but professional training hasn't kept up. Talented chefs and baristas are left to figure out complex equipment on their own, leading to inefficiency and untapped potential.
            </p>
          </div>
          <div className="w-full h-80 bg-gray-200 rounded-3xl flex items-center justify-center">
            <p className="text-gray-400 font-medium">[Soft, matte, 3D clay-like graphic of a confused chef looking at complex equipment]</p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
           <div className="w-full h-80 bg-gray-200 rounded-3xl flex items-center justify-center order-last md:order-first">
            <p className="text-gray-400 font-medium">[3D clay-like graphic of the Pinz app interface on a phone, with a wavy arm interacting with it]</p>
          </div>
          <div>
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <Milestone className="w-10 h-10 text-primary-foreground" />
             </div>
            <h3 className="text-4xl font-bold mb-4">Your Digital Passport to <br/>Kitchen Mastery.</h3>
            <p className="text-gray-600 text-lg">
              Pinz is the central hub for all Cook-Tech knowledge. Access manufacturer-certified courses, earn digital badges ("Pinz"), and showcase your expertise to a network of top-tier restaurants and professionals.
            </p>
          </div>
        </div>
      </section>

      {/* What's Inside? */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-12">Everything You Need to Succeed.</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4"/>
                <h4 className="text-xl font-bold mb-2">Certified Learning</h4>
                <p className="text-gray-600">Master new equipment with courses directly from manufacturers.</p>
            </div>
             <div className="p-6">
                <Users className="w-12 h-12 text-secondary mx-auto mb-4"/>
                <h4 className="text-xl font-bold mb-2">Community Hub</h4>
                <p className="text-gray-600">Share your creations, ask questions, and connect with peers.</p>
            </div>
             <div className="p-6">
                <Cpu className="w-12 h-12 text-primary mx-auto mb-4"/>
                <h4 className="text-xl font-bold mb-2">Career Growth</h4>
                <p className="text-gray-600">Get discovered by top restaurants looking for your specific skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Pinz. All Rights Reserved.</p>
      </footer>
    </div>
  );
}