import React, { useState, useEffect } from 'react';
import { User } from "@/api/entities";
import { UserPinz } from "@/api/entities";
import { Course } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Upload, Share, Award, Calendar, FileText, Edit } from "lucide-react";

const LEVEL_THRESHOLDS = {
  "Beginner Tech": 0,
  "Advanced Tech": 50, 
  "Pro Tech": 150
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userPinz, setUserPinz] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userData = await User.me();
        setUser(userData);

        const [pinzData, coursesData] = await Promise.all([
          UserPinz.filter({ user_id: userData.id }),
          Course.list()
        ]);
        
        setUserPinz(pinzData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfileData();
  }, []);

  const getCurrentLevelProgress = () => {
    if (!user) return { progress: 0, nextLevel: null, creditsToNext: 0 };
    
    const currentLevel = user.current_level || "Beginner Tech";
    const currentCredits = user.total_credits || 0;
    
    if (currentLevel === "Pro Tech") {
      return { progress: 100, nextLevel: null, creditsToNext: 0 };
    }
    
    const currentThreshold = LEVEL_THRESHOLDS[currentLevel];
    const nextLevel = currentLevel === "Beginner Tech" ? "Advanced Tech" : "Pro Tech";
    const nextThreshold = LEVEL_THRESHOLDS[nextLevel];
    
    const progress = ((currentCredits - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    
    return {
      progress: Math.min(Math.max(progress, 0), 100),
      nextLevel,
      creditsToNext: nextThreshold - currentCredits
    };
  };

  const getCourseById = (courseId) => {
    return courses.find(c => c.id === courseId);
  };

  const handleShare = () => {
    // Share profile functionality
    if (navigator.share) {
      navigator.share({
        title: `${user?.full_name}'s Pinz Profile`,
        text: `Check out my hospitality certifications - ${user?.total_credits || 0} credits earned!`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const levelProgress = getCurrentLevelProgress();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.profile_photo_url} />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                  {user?.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{user?.full_name}</h2>
                <p className="text-gray-600 capitalize">{user?.profession}</p>
                <Badge className="mt-2 bg-blue-100 text-blue-700">
                  {user?.current_level || "Beginner Tech"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user?.total_credits || 0}</div>
                <div className="text-sm text-gray-600">Total Credits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userPinz.length}</div>
                <div className="text-sm text-gray-600">Pinz Earned</div>
              </div>
            </div>

            {levelProgress.nextLevel && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to {levelProgress.nextLevel}</span>
                  <span>{levelProgress.creditsToNext} credits needed</span>
                </div>
                <Progress value={levelProgress.progress} className="mb-2" />
                <p className="text-xs text-gray-500">
                  {Math.round(levelProgress.progress)}% complete
                </p>
              </div>
            )}

            {!user?.resume_url ? (
              <Button variant="outline" className="w-full mt-4">
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
            ) : (
              <Button variant="outline" className="w-full mt-4">
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </Button>
            )}
          </CardContent>
        </Card>

        {/* My Pinz */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              My Pinz ({userPinz.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userPinz.length > 0 ? (
              <div className="grid gap-4">
                {userPinz.map(pinz => {
                  const course = getCourseById(pinz.course_id);
                  return (
                    <div key={pinz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {course?.vendor_logo_url && (
                          <img 
                            src={course.vendor_logo_url} 
                            alt={course.vendor_name}
                            className="w-10 h-10 object-contain"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900">{course?.title}</h4>
                          <p className="text-sm text-gray-600">{course?.vendor_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">+{pinz.credits_awarded}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(pinz.earned_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pinz Yet</h3>
                <p className="text-gray-600 mb-4">Complete your first course to earn your first Pinz!</p>
                <Button>
                  <Award className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}