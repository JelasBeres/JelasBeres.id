"use client";

import React, { useState } from "react";
import { Link2, Twitter, Facebook, Linkedin, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://jelasberes.id";
  const articleUrl = `${baseUrl}/blog/${slug}`;

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(articleUrl);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-8 border-t border-b border-border mt-16 mb-8">
      <span className="font-mono text-xs uppercase tracking-widest text-muted font-medium">Bagikan Artikel:</span>
      <div className="flex items-center gap-3">
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-border text-foreground hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors rounded-sm group"
          title="Share to WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-border text-foreground hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-colors rounded-sm"
          title="Share to X (Twitter)"
        >
          <Twitter size={18} />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-border text-foreground hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors rounded-sm"
          title="Share to LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-border text-foreground hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors rounded-sm"
          title="Share to Facebook"
        >
          <Facebook size={18} />
        </a>
        <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 border border-border text-foreground hover:bg-surface-hover transition-colors rounded-sm font-mono text-[11px] uppercase tracking-wider"
          title="Copy Link"
        >
          <Link2 size={16} />
          {copied ? <span className="text-green">Tersalin!</span> : <span>Salin Link</span>}
        </button>
      </div>
    </div>
  );
}
