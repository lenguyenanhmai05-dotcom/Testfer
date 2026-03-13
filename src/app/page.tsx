"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ResourceCard from "@/components/ResourceCard";
import AddResourceDialog from "@/components/AddResourceDialog";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Resource {
  id: string;
  title: string;
  url: string;
  category?: string;
  image_url?: string;
}

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setResources(data || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
        // Fallback to dummy data for styling if table doesn't exist yet
        setResources([
          { id: "1", title: "Next.js Documentation", url: "https://nextjs.org", category: "Next.js", image_url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=400&auto=format&fit=crop" },
          { id: "2", title: "Supabase Docs", url: "https://supabase.com", category: "Database", image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop" },
          { id: "3", title: "Tailwind CSS", url: "https://tailwindcss.com", category: "UI/UX", image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop" },
          { id: "4", title: "Shadcn UI", url: "https://ui.shadcn.com", category: "Components", image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  return (
    <div className="relative min-h-screen bg-mesh overflow-hidden pb-20">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />

      <section className="relative pt-32 pb-12 px-6 sm:pt-40 flex flex-col items-center">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Study <span className="text-gradient">Resources</span>
              </h1>
              <p className="text-text-muted max-w-xl">
                Explore a curated list of study resources shared by the community. 
                Build your knowledge with the best tools in the industry.
              </p>
            </div>
            
            <AddResourceDialog 
              onResourceAdded={() => {
                const fetchResources = async () => {
                  const { data } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
                  if (data) setResources(data);
                };
                fetchResources();
              }} 
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-40">
              <Loader2 className="h-10 w-10 text-brand-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {resources.length > 0 ? (
                resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center glass-card rounded-2xl border-dashed border-white/20">
                  <p className="text-text-muted italic">No resources found. Tap "Add Resource" to contribute.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
