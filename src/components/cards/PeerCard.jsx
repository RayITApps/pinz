import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export default function PeerCard({ peer }) {
  if (!peer) return null;

  return (
    <Card className="h-full bg-white hover:shadow-md transition-all duration-200 border border-gray-200">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={peer.profile_photo_url} />
              <AvatarFallback className="text-xs bg-gray-100">
                {peer.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-gray-900">{peer.name}</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            earned <span className="font-medium">{peer.achievement}</span>
          </p>
          <span className="text-xs text-gray-400">{peer.time_ago}</span>
        </div>
        <Button size="sm" variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 h-8">
          <User className="w-3 h-3 mr-1" />
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}