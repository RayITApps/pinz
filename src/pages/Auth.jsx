import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AuthPage() {
  const navigate = useNavigate();
  const [showEmailLogin, setShowEmailLogin] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleGoogleLogin = async () => {
    try {
      await User.login(); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // Email login would be implemented here
    console.log('Email login:', { email, password });
  };

  if (showEmailLogin) {
    return (
      <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F4F4F8'}}>
        {/* Wave-like top section */}
        <div className="relative h-48" style={{backgroundColor: '#FDBF50'}}>
          <div 
            className="absolute bottom-0 w-full h-12" 
            style={{
              backgroundColor: '#F4F4F8',
              clipPath: 'ellipse(100% 100% at 50% 100%)'
            }}
          ></div>
        </div>

        <div className="flex-1 flex flex-col items-center px-8 -mt-24">
          {/* Pinz Logo */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-lg" style={{backgroundColor: '#FFFFFF'}}>
            <span className="text-4xl font-bold" style={{color: '#FDBF50'}}>P</span>
          </div>

          <h1 className="text-3xl font-bold mb-2" style={{color: '#2A2C41'}}>Welcome to Pinz</h1>
          <p className="text-gray-500 mb-8">The Cook-Tech Community</p>

          <form onSubmit={handleEmailLogin} className="w-full max-w-sm space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full border-gray-200"
              style={{backgroundColor: '#FFFFFF'}}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-full border-gray-200"
              style={{backgroundColor: '#FFFFFF'}}
            />
            
            <div className="flex justify-end">
              <button type="button" className="text-sm" style={{color: '#FDBF50'}}>
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-full text-base font-semibold text-white"
              style={{backgroundColor: '#FDBF50'}}
            >
              Get Started
            </Button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => setShowEmailLogin(false)}
                className="text-sm"
                style={{color: '#92A87E'}}
              >
                Back to social login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F4F4F8'}}>
      {/* Wave-like top section */}
      <div className="relative h-48" style={{backgroundColor: '#FDBF50'}}>
        <div 
          className="absolute bottom-0 w-full h-12" 
          style={{
            backgroundColor: '#F4F4F8',
            clipPath: 'ellipse(100% 100% at 50% 100%)'
          }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col items-center px-8 -mt-24">
        {/* Pinz Logo */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-lg" style={{backgroundColor: '#FFFFFF'}}>
          <span className="text-4xl font-bold" style={{color: '#FDBF50'}}>P</span>
        </div>

        <h1 className="text-3xl font-bold mb-2" style={{color: '#2A2C41'}}>Welcome to Pinz</h1>
        <p className="text-gray-500 mb-10">The Cook-Tech Community</p>

        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={handleGoogleLogin} 
            className="w-full h-12 rounded-full text-base font-semibold border"
            style={{backgroundColor: '#FFFFFF', color: '#2A2C41', borderColor: '#d2d2d7'}}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-3" />
            Continue with Google
          </Button>
          
          <Button 
            disabled 
            className="w-full h-12 rounded-full text-base font-semibold opacity-50 cursor-not-allowed text-white"
            style={{backgroundColor: '#1877f2'}}
          >
            Continue with Facebook
          </Button>
          
          <Button 
            disabled 
            className="w-full h-12 rounded-full text-base font-semibold opacity-50 cursor-not-allowed text-white"
            style={{backgroundColor: '#000000'}}
          >
            Continue with Apple
          </Button>

          <div className="text-center pt-4">
            <button 
              onClick={() => setShowEmailLogin(true)}
              className="text-base font-medium"
              style={{color: '#92A87E'}}
            >
              Log in
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to Pinz's <br />
            <a href="#" className="underline" style={{color: '#FDBF50'}}>Terms of Service</a> and <a href="#" className="underline" style={{color: '#FDBF50'}}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}