import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "@/api/entities";
import { Company } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, BookOpen, Award } from "lucide-react";

export default function CoursePage() {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        console.log("Course page loading...");
        
        // Get course ID from URL
        const urlPath = window.location.pathname;
        const courseId = urlPath.split('/Course/')[1];
        
        console.log("Course ID from URL:", courseId);
        
        if (!courseId) {
          setError("No course ID in URL");
          return;
        }

        // Load all courses and find the one we want
        const allCourses = await Course.list();
        console.log("All courses:", allCourses);
        
        const foundCourse = allCourses.find(c => c.id === courseId);
        console.log("Found course:", foundCourse);
        
        if (!foundCourse) {
          setError("Course not found");
          return;
        }

        setCourse(foundCourse);

        // Load company info
        if (foundCourse.manufacturer_id) {
          const companies = await Company.list();
          const foundCompany = companies.find(c => c.id === foundCourse.manufacturer_id);
          setCompany(foundCompany);
        }

      } catch (error) {
        console.error("Error loading course:", error);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            {company?.logo_url && (
              <img src={company.logo_url} alt={company.name} className="w-12 h-12 rounded-full" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600">by {course.instructor_name} • {company?.name || 'Pinz Academy'}</p>
            </div>
          </div>

          {course.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= course.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({course.rating}/5)</span>
            </div>
          )}

          <p className="text-gray-700 mb-6">{course.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <Badge variant="outline">{course.difficulty}</Badge>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {course.duration_minutes} minutes
            </div>
            {course.equipment_name && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                {course.equipment_name}
              </div>
            )}
          </div>

          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Enroll in Course
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Skills */}
          {course.skills_gained && course.skills_gained.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skills you'll gain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.skills_gained.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Modules */}
          {course.modules && course.modules.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Level</span>
                <span className="font-semibold">{course.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold">{course.duration_minutes} min</span>
              </div>
              {course.equipment_name && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Equipment</span>
                  <span className="font-semibold">{course.equipment_name}</span>
                </div>
              )}
              {course.pin_id && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Certification</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Award className="w-4 h-4" />
                    <span className="font-semibold">Pin</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}