import React from 'react';
import { Copy } from 'lucide-react';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export default function SocialShareButtons({ title, url, description }: SocialShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);
  
  // Encode URL and text separately for different platforms
  const encodedUrl = encodeURIComponent(url);
  const shareText = description || title;
  const encodedText = encodeURIComponent(shareText);
  const hashtags = encodeURIComponent('FamCare,sức khỏe,y tế');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Optimized share URLs for better compatibility
  const shareUrls = {
    facebook: `https://www.facebook.com/dialog/share?app_id=&redirect_uri=${encodedUrl}&display=popup&href=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${hashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  };

  return (
    <div className="flex items-center gap-3 mt-10 pt-8 border-t border-slate-200 flex-wrap">
      <span className="text-sm font-semibold text-slate-600">Chia sẻ:</span>
      
      {/* Facebook Share */}
      <a
        href={shareUrls.facebook}
        onClick={(e) => {
          e.preventDefault();
          window.open(shareUrls.facebook, 'facebook-share', 'width=600,height=400');
        }}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all hover:scale-110"
        title="Chia sẻ trên Facebook"
        aria-label="Chia sẻ trên Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* Twitter/X Share */}
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-600 transition-all hover:scale-110"
        title="Chia sẻ trên Twitter/X"
        aria-label="Chia sẻ trên Twitter/X"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.688-5.888 6.688H2.88l7.644-8.74-8.179-10.76h6.51l4.764 6.312 5.385-6.312zM16.725 19.85h1.828L5.283 4.05H3.39l13.335 15.8z"/>
        </svg>
      </a>

      {/* LinkedIn Share */}
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all hover:scale-110"
        title="Chia sẻ trên LinkedIn"
        aria-label="Chia sẻ trên LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
      </a>

      {/* WhatsApp Share */}
      <a
        href={shareUrls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 text-green-600 transition-all hover:scale-110"
        title="Chia sẻ trên WhatsApp"
        aria-label="Chia sẻ trên WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.929 1.23l-.344.205-3.57-.934.951 3.462.203.323a9.876 9.876 0 001.516 4.844l.24.36 3.909.002c-.003 0 .001 0 .001 0a9.864 9.864 0 009.865-9.865 9.857 9.857 0 00-2.909-7.036 9.855 9.855 0 00-6.98-2.887zm0-1.8C12.888 2.197 19.4 8.71 19.4 16.565c0 3.993-1.606 7.616-4.214 10.225-2.608 2.609-6.233 4.215-10.225 4.215-1.93 0-3.78-.378-5.475-1.063L2.5 21.5l1.272-4.637C2.38 14.88 1.8 13.46 1.8 11.865 1.8 5.055 7.314 0.541 14.124 0.541z"/>
        </svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:scale-110"
        title="Sao chép link"
        aria-label="Sao chép link"
      >
        <Copy size={18} strokeWidth={2} />
      </button>
      {copied && <span className="text-xs text-green-600 font-medium animate-pulse">Đã sao chép!</span>}
    </div>
  );
}
