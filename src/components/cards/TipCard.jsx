import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function TipCard({ tip }) {
  if (!tip) return null;

  return (
    <Card className="h-full bg-white hover:shadow-md transition-all duration-200 border border-gray-200">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 mb-3">
          <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
            {tip.title}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {tip.content}
          </p>
          <Badge variant="outline" className="text-xs">
            {tip.category}
          </Badge>
        </div>
        <Button size="sm" variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 h-8">
          <BookOpen className="w-3 h-3 mr-1" />
          Read
        </Button>
      </CardContent>
    </Card>
  );
}