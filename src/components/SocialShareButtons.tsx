import React from 'react';
import { Copy } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function SocialShareButtons({ title, url, description }: SocialShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 mt-10 pt-8 border-t border-slate-200 flex-wrap">
      <span className="text-sm font-semibold text-slate-600">Chia sẻ:</span>
      
      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:scale-105 text-sm font-medium"
        title="Sao chép link"
        aria-label="Sao chép link"
      >
        <Copy size={18} strokeWidth={2} />
        {copied ? <span className="text-green-600">Đã sao chép!</span> : <span>Sao chép link</span>}
      </button>
    </div>
  );
}
