import React from 'react';
import { Facebook, Twitter, Linkedin, Copy } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function SocialShareButtons({ title, url, description }: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 mt-10 pt-8 border-t border-slate-200 flex-wrap">
      <span className="text-sm font-semibold text-slate-600">Chia sẻ:</span>
      
      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all hover:scale-110"
        title="Chia sẻ trên Facebook"
      >
        <Facebook size={18} />
      </a>

      {/* Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 transition-all hover:scale-110"
        title="Chia sẻ trên Twitter"
      >
        <Twitter size={18} />
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all hover:scale-110"
        title="Chia sẻ trên LinkedIn"
      >
        <Linkedin size={18} />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:scale-110"
        title="Sao chép link"
      >
        <Copy size={18} />
      </button>
      {copied && <span className="text-xs text-green-600 font-medium">Đã sao chép!</span>}
    </div>
  );
}
