import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createPageUrl } from '@/utils';
import { Star, Clock } from 'lucide-react';

export default function CourseCard({ course, company }) {
  if (!course) return null;

  return (
    <Link to={createPageUrl(`Course/${course.id}`)} className="block group">
      <Card className="rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border bg-card">
        <div className="aspect-video overflow-hidden">
          <img 
            src={course.cover_image_url || `https://source.unsplash.com/random/400x225?kitchen,tech,${course.id}`} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary mb-1">{company?.name || 'Pinz Academy'}</p>
            <h3 className="font-bold text-base text-foreground mb-2 line-clamp-2">{course.title}</h3>
          </div>
          <div className="flex items-center justify-between text-xs text-secondary mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-foreground">{course.rating || 'New'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration_minutes} min</span>
            </div>
            <Badge variant="secondary" className="capitalize">{course.difficulty}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}