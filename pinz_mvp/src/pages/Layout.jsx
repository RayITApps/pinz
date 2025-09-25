
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Home, Compass, BookOpen, User as UserIcon } from "lucide-react";

const navItems = [
  { title: "Home", url: "Home", icon: Home },
  { title: "Explore", url: "Explore", icon: Compass },
  { title: "My Pinz", url: "MyPinz", icon: BookOpen },
  { title: "Profile", url: "Profile", icon: UserIcon },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthPage = ["LandingPage", "Auth", "Onboarding"].includes(currentPageName);

  useEffect(() => {
    const fetchUserAndRedirect = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
        if (isAuthPage) {
          if (userData && !userData.onboarding_completed) {
            navigate(createPageUrl('Onboarding'));
          } else {
            navigate(createPageUrl('Home'));
          }
        }
      } catch (e) {
        if (!isAuthPage) {
          navigate(createPageUrl('LandingPage'));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndRedirect();
  }, [currentPageName, navigate, isAuthPage]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (isAuthPage || !user) {
    return <div className="bg-gray-50 text-gray-900">{children}</div>;
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          -webkit-font-smoothing: antialiased; 
          -moz-osx-font-smoothing: grayscale; 
        }
      `}</style>
      
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(createPageUrl(item.url));
              return (
                <Link
                  key={item.title}
                  to={createPageUrl(item.url)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <item.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.title}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
