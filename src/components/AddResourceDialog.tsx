"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AddResourceDialog({ onResourceAdded }: { onResourceAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!title || !url) return;
    setLoading(true);

    try {
      let image_url = "";

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `resource-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('resources')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('resources')
          .getPublicUrl(filePath);
        
        image_url = publicUrl;
      }

      const { error } = await supabase.from("resources").insert([
        { title, url, category, image_url }
      ]);

      if (error) throw error;

      onResourceAdded();
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding resource:", error);
      alert("Error adding resource. Make sure the 'resources' table and storage bucket exist.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setCategory("");
    setImageFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button className="glass-card hover:bg-white/10 border-white/10 font-bold px-6 py-6 h-auto transition-all cursor-pointer">
            <Plus className="mr-2 h-5 w-5" /> Add Resource
          </Button>
        }
      />
      <DialogContent className="glass-card border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">Add New Resource</DialogTitle>
          <DialogDescription className="text-text-muted">
            Share a helpful study resource with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Next.js Mastery"
              className="bg-white/5 border-white/10 focus:ring-brand-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-semibold">Link / URL</Label>
            <Input
              id="url"
              placeholder="https://..."
              className="bg-white/5 border-white/10 focus:ring-brand-primary"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
            <Input
              id="category"
              placeholder="e.g. Next.js, AI, UI/UX"
              className="bg-white/5 border-white/10 focus:ring-brand-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-semibold">Image Thumbnail</Label>
            <div className="flex items-center gap-4">
              <label 
                htmlFor="image" 
                className="flex items-center justify-center gap-2 flex-1 p-3 rounded-md bg-white/5 border border-dashed border-white/20 hover:bg-white/10 cursor-pointer transition-all"
              >
                <Upload size={16} />
                <span className="text-xs">{imageFile ? imageFile.name : "Select Image"}</span>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleUpload} 
            disabled={loading || !title || !url}
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-6 h-auto"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
            Confirm Contribution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
