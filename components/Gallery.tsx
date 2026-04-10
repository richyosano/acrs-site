import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface GalleryProps {
  onBack: () => void;
}

const YEARS = [2026, 2025];

type GalleryItem = { src: string };
type GalleryCategory = { name: string; items: GalleryItem[] };
type GalleryYearData = GalleryCategory[];

const getThumbnailUrl = (originalUrl: string) => {
  return originalUrl.replace('https://africacarbonremovalsummit.com/', 'https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=low,height=500/');
};

const getFullscreenUrl = (originalUrl: string) => {
  return originalUrl.replace('https://africacarbonremovalsummit.com/', 'https://images.africacarbonremovalsummit.com/cdn-cgi/image/format=auto,quality=medium/');
};

const GALLERY_DATA: Record<number, GalleryYearData> = {
  2026: [],
  2025: [
    {
      name: "Keynotes",
      items: [
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Keynotes/CC-03-2.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Keynotes/CC-33.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Keynotes/CC-46.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Keynotes/CC-56.jpg" }
      ]
    },
    {
      name: "Panel Discussions",
      items: [
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Panel%20Discussions/HL-06.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Panel%20Discussions/Help-106.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Panel%20Discussions/Help-113.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Panel%20Discussions/Help-122.jpg" }
      ]
    },
    {
      name: "Networking & Workshop",
      items: [
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Networking%20%26%20Workshop/ACR-107.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Networking%20%26%20Workshop/ACR-174.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Networking%20%26%20Workshop/CC-099.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Networking%20%26%20Workshop/Help-129.jpg" }
      ]
    },
    {
      name: "ACRA Cohort 1",
      items: [
        { src: "https://africacarbonremovalsummit.com/2025%20Images/ACRA%20Cohort%201%20Announcement/Help-045.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/ACRA%20Cohort%201%20Announcement/Help-056.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/ACRA%20Cohort%201%20Announcement/Help-066.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/ACRA%20Cohort%201%20Announcement/Help-075.jpg" }
      ]
    },
    {
      name: "Legion 44 Movie Premier",
      items: [
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Legion%2044%20Movie%20Premier/Help-159.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Legion%2044%20Movie%20Premier/Help-171.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Legion%2044%20Movie%20Premier/Help-198.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Legion%2044%20Movie%20Premier/Help-216.jpg" }
      ]
    },
    {
      name: "Addresses",
      items: [
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Addresses/ACR-037.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Addresses/CC-113.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Addresses/Help-022.jpg" },
        { src: "https://africacarbonremovalsummit.com/2025%20Images/Addresses/Help-028.jpg" }
      ]
    }
  ]
};

export const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const allImages = GALLERY_DATA[selectedYear].flatMap(cat => cat.items);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setLightboxIndex(null);
  };

  const openLightbox = (index: number) => {
    setIsImageLoading(true);
    setLightboxIndex(index);
  };

  const navigateLightbox = (direction: 1 | -1) => {
    if (lightboxIndex === null) return;
    const newIndex = lightboxIndex + direction;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setIsImageLoading(true);
      setLightboxIndex(newIndex);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft' && lightboxIndex > 0) navigateLightbox(-1);
      if (e.key === 'ArrowRight' && lightboxIndex < allImages.length - 1) navigateLightbox(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allImages.length]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative">
      {/* Gallery Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-stone-600 hover:text-brand-600 font-medium transition-colors"
           >
             <ArrowLeft size={20} />
             Back to Home
           </button>
           <h1 className="text-lg font-bold text-stone-900 hidden md:block">Past Events Gallery</h1>
           <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex-grow">
        
        <div className="mb-12 text-center">
           <h2 className="text-4xl font-bold text-stone-900 mb-6">Summit Highlights</h2>
           
           {/* Year Toggles */}
           <div className="inline-flex bg-stone-200/50 p-1.5 rounded-full">
             {YEARS.map(year => (
               <button
                 key={year}
                 onClick={() => handleYearChange(year)}
                 className={`px-8 py-2 rounded-full font-bold transition-all ${
                   selectedYear === year 
                     ? 'bg-brand-500 text-white shadow-md' 
                     : 'text-stone-500 hover:text-brand-700'
                 }`}
               >
                 {year}
               </button>
             ))}
           </div>
        </div>

        {/* Image Grid */}
        <motion.div 
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {GALLERY_DATA[selectedYear].map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-2xl font-bold text-stone-800 mb-6 border-b border-stone-200 pb-2">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, index) => {
                  const globalIndex = allImages.findIndex(img => img.src === item.src);
                  return (
                    <div 
                      key={index} 
                      className="group cursor-pointer"
                      onClick={() => openLightbox(globalIndex)}
                    >
                       <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 relative shadow-sm hover:shadow-xl transition-all duration-300">
                         <img 
                           src={getThumbnailUrl(item.src)} 
                           alt={`${category.name} image ${index + 1}`} 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                           referrerPolicy="no-referrer"
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-stone-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
                             View Fullscreen
                           </div>
                         </div>
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {GALLERY_DATA[selectedYear].length === 0 && (
           <div className="text-center py-20 text-stone-500 max-w-md mx-auto">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
               <h3 className="text-xl font-bold text-stone-800 mb-2">Images Upcoming</h3>
               <p>Photos from the {selectedYear} summit will be uploaded and available here after the event concludes.</p>
             </div>
           </div>
        )}
      </div>

      <div className="bg-stone-900 text-stone-400 py-8 text-center text-sm">
        &copy; ACRS {selectedYear} Archive. All rights reserved.
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/20 p-2 rounded-full"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              className={`absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full ${lightboxIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/40 hover:scale-110'}`}
              disabled={lightboxIndex === 0}
            >
              <ChevronLeft size={40} />
            </button>

            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center min-w-[300px] min-h-[300px]" onClick={(e) => e.stopPropagation()}>
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Loader2 className="w-12 h-12 text-white animate-spin opacity-70" />
                </div>
              )}
              <img
                key={allImages[lightboxIndex].src}
                src={getFullscreenUrl(allImages[lightboxIndex].src)}
                alt="Fullscreen view"
                className={`max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                referrerPolicy="no-referrer"
                onLoad={() => setIsImageLoading(false)}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              className={`absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full ${lightboxIndex === allImages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/40 hover:scale-110'}`}
              disabled={lightboxIndex === allImages.length - 1}
            >
              <ChevronRight size={40} />
            </button>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm pointer-events-none">
              {lightboxIndex + 1} of {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};