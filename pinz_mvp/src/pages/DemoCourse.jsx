import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react";

export default function DemoCoursePage() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = React.useState({});

  const course = {
    title: "Mastering the Combi Oven",
    rating: 4.8,
    instructor: "Chef Marco Rodriguez",
    company: "Rational AG",
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
    certification: "Professional Certificate",
    aboutText: "Learn advanced techniques for using combi ovens in professional kitchens. Master steam, convection, and combination cooking methods to elevate your culinary skills. This comprehensive course covers everything from basic operation to advanced programming techniques.",
    skills: [
      "Combi Oven Operation",
      "Steam Cooking Techniques", 
      "Precision Temperature Control",
      "Multi-stage Cooking Programs",
      "Equipment Maintenance",
      "Food Safety Protocols"
    ],
    weeks: [
      {
        title: "Week 1: Introduction to Combi Cooking",
        content: "Understanding the three cooking modes: steam, convection, and combination. Learn when to use each mode for optimal results."
      },
      {
        title: "Week 2: Steam Techniques",
        content: "Master steam cooking for vegetables, proteins, and delicate items. Temperature control and timing strategies."
      },
      {
        title: "Week 3: Advanced Programming",
        content: "Create custom cooking programs and multi-stage recipes. Automation and efficiency techniques."
      },
      {
        title: "Week 4: Professional Applications",
        content: "Real-world applications in commercial kitchens. Troubleshooting and maintenance best practices."
      }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F4F4F8'}}>
      {/* Header */}
      <div className="px-6 py-4" style={{backgroundColor: '#FFFFFF'}}>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Course Title and Rating */}
        <div>
          <h1 className="text-3xl font-bold mb-3" style={{color: '#2A2C41'}}>
            {course.title}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1,2,3,4,5].map(star => (
                <span key={star} className={star <= Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-sm font-medium" style={{color: '#2A2C41'}}>{course.rating}</span>
          </div>
        </div>

        {/* Teacher + Company */}
        <Card className="rounded-2xl" style={{backgroundColor: '#FFFFFF'}}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <img 
                src={course.companyLogo} 
                alt={course.company}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold" style={{color: '#2A2C41'}}>{course.instructor}</p>
                <p className="text-sm" style={{color: '#92A87E'}}>{course.company}</p>
              </div>
              <div className="ml-auto">
                <div 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{backgroundColor: '#92A87E', color: '#FFFFFF'}}
                >
                  {course.certification}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About the course - Collapsible */}
        <Card className="rounded-2xl" style={{backgroundColor: '#FFFFFF'}}>
          <CardContent className="p-0">
            <button 
              onClick={() => toggleSection('about')}
              className="w-full p-4 flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold" style={{color: '#2A2C41'}}>About the course</h3>
              {expandedSections.about ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.about && (
              <div className="px-4 pb-4">
                <p className="text-gray-600 leading-relaxed">{course.aboutText}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills you will gain - Collapsible */}
        <Card className="rounded-2xl" style={{backgroundColor: '#FFFFFF'}}>
          <CardContent className="p-0">
            <button 
              onClick={() => toggleSection('skills')}
              className="w-full p-4 flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold" style={{color: '#2A2C41'}}>Skills you will gain</h3>
              {expandedSections.skills ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.skills && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{backgroundColor: '#F4F4F8', color: '#2A2C41'}}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* What you will learn - Collapsible */}
        <Card className="rounded-2xl" style={{backgroundColor: '#FFFFFF'}}>
          <CardContent className="p-0">
            <button 
              onClick={() => toggleSection('learn')}
              className="w-full p-4 flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold" style={{color: '#2A2C41'}}>What you will learn</h3>
              {expandedSections.learn ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.learn && (
              <div className="px-4 pb-4 space-y-3">
                {course.weeks.map((week, index) => (
                  <div key={index} className="border-l-2 pl-4" style={{borderColor: '#92A87E'}}>
                    <h4 className="font-medium mb-1" style={{color: '#2A2C41'}}>{week.title}</h4>
                    <p className="text-sm text-gray-600">{week.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add to Calendar Button - Fixed at bottom */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4" style={{backgroundColor: '#F4F4F8'}}>
        <Button 
          className="w-full h-12 rounded-full text-base font-semibold text-white"
          style={{backgroundColor: '#FDBF50'}}
        >
          Add to Calendar
        </Button>
      </div>
    </div>
  );
}