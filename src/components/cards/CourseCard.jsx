import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, Award } from 'lucide-react';

export default function CourseCard({ course, progress = null }) {
  if (!course) return null;

  return (
    <Card className="h-full bg-white hover:shadow-md transition-all duration-200 border border-gray-200">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 mb-3">
          <div className="flex items-center gap-2 mb-2">
            {course.vendor_logo_url && (
              <img 
                src={course.vendor_logo_url} 
                alt={course.vendor_name}
                className="w-4 h-4 object-contain"
              />
            )}
            <span className="text-xs text-blue-600 font-medium">{course.vendor_name}</span>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
            {course.title}
          </h4>
          {progress !== null && (
            <div className="mb-3">
              <Progress value={progress} className="h-1" />
              <span className="text-xs text-gray-500 mt-1">{progress}% complete</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>{course.credit_value} credits</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{course.estimated_time_minutes}m</span>
            </div>
          </div>
        </div>
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8">
          <Play className="w-3 h-3 mr-1" />
          {progress !== null ? 'Resume' : 'Start Course'}
        </Button>
      </CardContent>
    </Card>
  );
}