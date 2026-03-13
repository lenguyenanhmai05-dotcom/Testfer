"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface Resource {
  id: string;
  title: string;
  url: string;
  category?: string;
  image_url?: string;
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="glass-card border-white/10 overflow-hidden hover:scale-[1.02] transition-all group">
      <div className="relative h-40 w-full bg-white/5 overflow-hidden">
        {resource.image_url ? (
          <Image
            src={resource.image_url}
            alt={resource.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
            No Image
          </div>
        )}
        {resource.category && (
          <Badge className="absolute top-3 right-3 glass border-white/20 text-[10px] uppercase tracking-wider">
            {resource.category}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg font-bold line-clamp-1">{resource.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-xs text-text-muted truncate mb-2">{resource.url}</p>
      </CardContent>
      
      <CardFooter className="pt-0 border-t border-white/5 flex justify-end p-4">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary hover:text-brand-secondary transition-colors flex items-center gap-2 text-sm font-semibold"
        >
          Visit <ExternalLink size={14} />
        </a>
      </CardFooter>
    </Card>
  );
}
