import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Clock } from 'lucide-react';

export default function PinzCard({ pinz }) {
  if (!pinz) return null;

  return (
    <Card className="h-full bg-white hover:shadow-md transition-all duration-200 border border-gray-200">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 mb-3">
          <div className="flex items-center gap-2 mb-2">
            {pinz.vendor_logo_url && (
              <img 
                src={pinz.vendor_logo_url} 
                alt={pinz.vendor_name}
                className="w-4 h-4 object-contain"
              />
            )}
            <span className="text-xs text-blue-600 font-medium">{pinz.vendor_name}</span>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">
            {pinz.name}
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3 text-blue-500" />
              <span className="font-medium text-blue-600">{pinz.credit_value} credits</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{pinz.estimated_time}m</span>
            </div>
          </div>
        </div>
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8">
          Start Course
        </Button>
      </CardContent>
    </Card>
  );
}