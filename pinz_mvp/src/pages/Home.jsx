import React, { useState, useEffect } from 'react';
import { User } from "@/api/entities";
import { Course } from "@/api/entities";
import { DailyTip } from "@/api/entities";
import { NewsUpdate } from "@/api/entities";
import { UserPinz } from "@/api/entities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

// Import card components
import TipCard from "@/components/cards/TipCard";
import NewsCard from "@/components/cards/NewsCard";
import ReminderCard from "@/components/cards/ReminderCard";
import CourseCard from "@/components/cards/CourseCard";
import PinzCard from "@/components/cards/PinzCard";
import UpdateCard from "@/components/cards/UpdateCard";
import PeerCard from "@/components/cards/PeerCard";

const LEVEL_THRESHOLDS = {
  "Beginner Tech": 0,
  "Advanced Tech": 50, 
  "Pro Tech": 150
};

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [dailyTips, setDailyTips] = useState([]);
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [continueLearning, setContinueLearning] = useState([]);
  const [featuredPinz, setFeaturedPinz] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [equipmentUpdates, setEquipmentUpdates] = useState([]);
  const [peerHighlights, setPeerHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const userData = await User.me();
        setUser(userData);

        // Load all sections data
        const [tips, news, courses] = await Promise.all([
          DailyTip.list('-date', 5),
          NewsUpdate.list('-published_date', 5),
          Course.filter({ status: 'active' }, '-created_date', 5)
        ]);
        
        setDailyTips(tips);
        setNewsUpdates(news);
        setRecommendedCourses(courses);

        // Mock data for other sections
        setReminders([
          { id: 1, title: "Finish 'iCombi Interface' quiz", due_date: "Due today", progress: 75 },
          { id: 2, title: "Recert: Grinder Calibration", due_date: "Due tomorrow", progress: 0 },
          { id: 3, title: "Start 'POS Basics'", due_date: "Due in 3 days", progress: 0 }
        ]);

        setContinueLearning([
          { 
            ...courses[0], 
            progress: 65,
            vendor_logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop"
          }
        ]);

        setFeaturedPinz([
          { 
            id: 1, 
            name: "Rational iCombi Pro Operator", 
            vendor_name: "Rational", 
            vendor_logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop",
            credit_value: 8, 
            estimated_time: 120 
          },
          { 
            id: 2, 
            name: "La Marzocco Espresso Mastery", 
            vendor_name: "La Marzocco", 
            vendor_logo_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=32&h=32&fit=crop",
            credit_value: 6, 
            estimated_time: 90 
          }
        ]);

        setEquipmentUpdates([
          { 
            id: 1, 
            manufacturer: "Rational", 
            title: "iCombi firmware 3.2 — improved humidity control", 
            description: "Enhanced steam precision and energy efficiency improvements",
            version: "3.2", 
            date: "Dec 15" 
          },
          { 
            id: 2, 
            manufacturer: "Vitamix", 
            title: "Safety patch update", 
            description: "Critical security update for connected blenders",
            version: "1.4", 
            date: "Dec 12" 
          }
        ]);

        setPeerHighlights([
          { 
            id: 1, 
            name: "Ava Chen", 
            achievement: "iCombi Operator", 
            time_ago: "2 hours ago",
            profile_photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612c7d7?w=32&h=32&fit=crop"
          },
          { 
            id: 2, 
            name: "Liam Rodriguez", 
            achievement: "Bar Flow Basics", 
            time_ago: "5 hours ago",
            profile_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
          }
        ]);

      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const getCurrentLevelProgress = () => {
    if (!user) return { current: 0, next: 50, progress: 0, nextLevel: "Advanced Tech" };
    
    const currentLevel = user.current_level || "Beginner Tech";
    const currentCredits = user.total_credits || 0;
    
    if (currentLevel === "Pro Tech") {
      return { current: currentCredits, next: null, progress: 100, nextLevel: null };
    }
    
    const currentThreshold = LEVEL_THRESHOLDS[currentLevel];
    const nextLevel = currentLevel === "Beginner Tech" ? "Advanced Tech" : "Pro Tech";
    const nextThreshold = LEVEL_THRESHOLDS[nextLevel];
    
    const progress = ((currentCredits - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    
    return {
      current: currentCredits,
      next: nextThreshold,
      progress: Math.min(Math.max(progress, 0), 100),
      nextLevel
    };
  };

  const levelProgress = getCurrentLevelProgress();

  const SectionHeader = ({ title, seeAllUrl, count = 0 }) => (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {count > 0 && (
        <Link to={createPageUrl(seeAllUrl || 'Explore')}>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  {user?.total_credits || 0} Credits
                </span>
                {levelProgress.nextLevel && (
                  <span className="text-xs text-gray-500 ml-2">
                    {levelProgress.next - levelProgress.current} to {levelProgress.nextLevel}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="text-xs font-medium text-orange-700">
                    {user?.daily_streak || 0}-day streak
                  </span>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.profile_photo_url} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                    {user?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            {levelProgress.nextLevel && (
              <Progress value={levelProgress.progress} className="h-1" />
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Daily Tips */}
        {dailyTips.length > 0 && (
          <section>
            <SectionHeader title="💡 Daily Tips" count={dailyTips.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dailyTips.slice(0, 5).map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>
        )}

        {/* Industry News */}
        {newsUpdates.length > 0 && (
          <section>
            <SectionHeader title="📢 Industry News" count={newsUpdates.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newsUpdates.slice(0, 5).map(news => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </section>
        )}

        {/* Reminders & Upcoming */}
        {reminders.length > 0 && (
          <section>
            <SectionHeader title="🔔 Reminders & Upcoming" count={reminders.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {reminders.slice(0, 5).map(reminder => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </section>
        )}

        {/* Continue Learning */}
        {continueLearning.length > 0 && (
          <section>
            <SectionHeader title="📚 Continue Learning" count={continueLearning.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {continueLearning.slice(0, 5).map(course => (
                <CourseCard key={course.id} course={course} progress={course.progress} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Pinz */}
        {featuredPinz.length > 0 && (
          <section>
            <SectionHeader title="⭐ Featured Pinz" count={featuredPinz.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredPinz.slice(0, 5).map(pinz => (
                <PinzCard key={pinz.id} pinz={pinz} />
              ))}
            </div>
          </section>
        )}

        {/* Recommended For You */}
        {recommendedCourses.length > 0 && (
          <section>
            <SectionHeader title="🎓 Recommended For You" count={recommendedCourses.length} seeAllUrl="Explore" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedCourses.slice(0, 5).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Equipment Updates */}
        {equipmentUpdates.length > 0 && (
          <section>
            <SectionHeader title="🔧 Equipment Updates" count={equipmentUpdates.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {equipmentUpdates.slice(0, 5).map(update => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          </section>
        )}

        {/* Peer Highlights */}
        {peerHighlights.length > 0 && (
          <section>
            <SectionHeader title="👥 Peer Highlights" count={peerHighlights.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {peerHighlights.slice(0, 5).map(peer => (
                <PeerCard key={peer.id} peer={peer} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}