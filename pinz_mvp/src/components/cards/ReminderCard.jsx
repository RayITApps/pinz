import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Clock } from 'lucide-react';

export default function ReminderCard({ reminder }) {
  if (!reminder) return null;

  return (
    <Card className="h-full bg-white hover:shadow-md transition-all duration-200 border border-gray-200">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 mb-3">
          <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
            {reminder.title}
          </h4>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{reminder.due_date}</span>
          </div>
          {reminder.progress !== undefined && (
            <div className="mb-3">
              <Progress value={reminder.progress} className="h-1" />
              <span className="text-xs text-gray-500 mt-1">{reminder.progress}% complete</span>
            </div>
          )}
        </div>
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8">
          <Play className="w-3 h-3 mr-1" />
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}