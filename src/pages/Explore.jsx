import React, { useState, useEffect, useCallback } from 'react';
import { Course } from '@/api/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Flame, Award, ChefHat, Coffee, GlassWater, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categories = [
  { id: "all", name: "All", icon: Award },
  { id: "popular", name: "Popular", icon: Flame },
  { id: "top_rated", name: "Top Rated", icon: Star },
  { id: "cooktech", name: "CookTech", icon: ChefHat },
  { id: "baristatech", name: "BaristaTech", icon: Coffee },
  { id: "bartendtech", name: "BartendTech", icon: GlassWater },
];

export default function ExplorePage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const coursesData = await Course.filter({ status: 'active' });
      setCourses(coursesData);
      setFilteredCourses(coursesData); 
    } catch (error) {
      console.error("Error loading courses:", error);
    }
    setLoading(false);
  }, []);

  const filterAndSortCourses = useCallback(() => {
    let processedCourses = [...courses];

    if (searchTerm) {
      processedCourses = processedCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.equipment_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (selectedCategory) {
      case "popular":
        processedCourses.sort((a, b) => (b.credit_value || 0) - (a.credit_value || 0));
        break;
      case "top_rated":
        processedCourses.sort((a, b) => (b.credit_value || 0) - (a.credit_value || 0));
        break;
      case "cooktech":
        processedCourses = processedCourses.filter(course => 
          course.title.toLowerCase().includes('cook') || 
          course.title.toLowerCase().includes('oven') ||
          course.title.toLowerCase().includes('grill')
        );
        break;
      case "baristatech":
        processedCourses = processedCourses.filter(course => 
          course.title.toLowerCase().includes('espresso') || 
          course.title.toLowerCase().includes('coffee') ||
          course.title.toLowerCase().includes('barista')
        );
        break;
      case "bartendtech":
        processedCourses = processedCourses.filter(course => 
          course.title.toLowerCase().includes('blend') || 
          course.title.toLowerCase().includes('cocktail') ||
          course.title.toLowerCase().includes('bar')
        );
        break;
      default:
        break;
    }
    
    setFilteredCourses(processedCourses);
  }, [courses, searchTerm, selectedCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  
  useEffect(() => {
    filterAndSortCourses();
  }, [searchTerm, selectedCategory, courses, filterAndSortCourses]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Explore Courses</h1>
        <p className="text-gray-600 mt-1">Discover new skills and earn Pinz</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search courses, vendors, or equipment..."
            className="pl-12 h-12 rounded-xl shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={`flex-shrink-0 rounded-full px-4 h-9 flex items-center gap-2 text-sm ${
                selectedCategory === cat.id ? 'bg-blue-600 text-white' : ''
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 space-y-3">
                  <div className="aspect-video bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-5 w-full bg-gray-200 rounded"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCourses.map(course => (
              <Link key={course.id} to={createPageUrl('DemoCourse')} className="block group">
                <Card className="h-full shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={course.cover_image_url || `https://source.unsplash.com/400x225?kitchen,equipment,${course.id}`} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-2">
                      {course.vendor_logo_url && (
                        <img 
                          src={course.vendor_logo_url} 
                          alt={course.vendor_name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span className="text-xs font-medium text-blue-600">{course.vendor_name}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">{course.title}</h3>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-600">{course.credit_value} credits</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.estimated_time_minutes}m</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="mt-2 capitalize self-start text-xs">
                      {course.difficulty}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">No courses found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}