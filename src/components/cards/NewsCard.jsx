import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function NewsCard({ news }) {
  if (!news) return null;

  return (
    <Card className="h-full bg-white hover:shadow-md transition-all duration-200 border border-gray-200">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600">{news.source}</span>
            <span className="text-xs text-gray-400">
              {new Date(news.published_date).toLocaleDateString()}
            </span>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
            {news.headline}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {news.summary}
          </p>
          <Badge variant="outline" className="text-xs">
            {news.category}
          </Badge>
        </div>
        <Button size="sm" variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 h-8">
          <ExternalLink className="w-3 h-3 mr-1" />
          Open
        </Button>
      </CardContent>
    </Card>
  );
}