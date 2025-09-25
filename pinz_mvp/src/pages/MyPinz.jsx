import React, { useState, useEffect } from 'react';
import { UserPinz } from "@/api/entities";
import { Course } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, Share, Download, Trophy, Star } from "lucide-react";

const LEVEL_THRESHOLDS = {
  "Beginner Tech": 0,
  "Advanced Tech": 50, 
  "Pro Tech": 150
};

export default function MyPinzPage() {
  const [user, setUser] = useState(null);
  const [userPinz, setUserPinz] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await User.me();
        setUser(userData);

        const [pinzData, coursesData] = await Promise.all([
          UserPinz.filter({ user_id: userData.id }, '-earned_date'),
          Course.list()
        ]);
        
        setUserPinz(pinzData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getCourseById = (courseId) => {
    return courses.find(c => c.id === courseId);
  };

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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Pinz</h1>
            <p className="text-gray-600 mt-1">Your certifications and achievements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Badge className="bg-white/20 text-white border-white/20 mb-2">
                  {user?.current_level || "Beginner Tech"}
                </Badge>
                <h3 className="text-2xl font-bold">{user?.total_credits || 0} Total Credits</h3>
                <p className="text-purple-100 text-sm">{userPinz.length} Pinz Earned</p>
              </div>
              <div className="text-right">
                <Trophy className="w-12 h-12 text-white/40 mx-auto" />
                {levelProgress.nextLevel && (
                  <p className="text-purple-100 text-sm mt-2">
                    {levelProgress.creditsToNext} to {levelProgress.nextLevel}
                  </p>
                )}
              </div>
            </div>
            
            {levelProgress.nextLevel && (
              <div>
                <Progress value={levelProgress.progress} className="bg-white/20 h-2" />
                <p className="text-xs text-purple-100 mt-2">
                  {Math.round(levelProgress.progress)}% to next level
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Earned Pinz */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Earned Pinz ({userPinz.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userPinz.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {userPinz.map(pinz => {
                  const course = getCourseById(pinz.course_id);
                  return (
                    <Card key={pinz.id} className="shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {course?.vendor_logo_url && (
                              <img 
                                src={course.vendor_logo_url} 
                                alt={course.vendor_name}
                                className="w-12 h-12 object-contain p-1 bg-gray-50 rounded-lg"
                              />
                            )}
                            <div>
                              <h4 className="font-semibold text-gray-900">{course?.title}</h4>
                              <p className="text-sm text-gray-600">{course?.vendor_name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {course?.difficulty}
                                </Badge>
                                {pinz.quiz_score && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Star className="w-3 h-3" />
                                    <span>{pinz.quiz_score}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">+{pinz.credits_awarded}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(pinz.earned_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pinz Earned Yet</h3>
                <p className="text-gray-600 mb-6">Complete courses to start earning your first Pinz!</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Award className="w-4 h-4 mr-2" />
                  Explore Courses
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{userPinz.length}</div>
              <div className="text-sm text-gray-600">Pinz Earned</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{user?.total_credits || 0}</div>
              <div className="text-sm text-gray-600">Total Credits</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(userPinz.map(p => getCourseById(p.course_id)?.vendor_name)).size}
              </div>
              <div className="text-sm text-gray-600">Vendors</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(userPinz.reduce((acc, p) => acc + (p.quiz_score || 0), 0) / (userPinz.length || 1))}%
              </div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}