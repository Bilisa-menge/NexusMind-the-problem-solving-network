
import React, { useRef } from 'react';
import { STORIES } from '../constants';

const StoryCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto no-scrollbar py-2"
      >
        {/* Create Story */}
        <div className="min-w-[112px] h-[190px] rounded-xl overflow-hidden shadow bg-white flex flex-col cursor-pointer hover:bg-gray-50 group">
           <div className="flex-1 overflow-hidden">
             <img src="https://picsum.photos/seed/me/200/300" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Create" />
           </div>
           <div className="h-[48px] relative flex items-end justify-center pb-2">
             <div className="absolute -top-4 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-white">
               <i className="fa-solid fa-plus"></i>
             </div>
             <span className="text-xs font-semibold">Post problem</span>
           </div>
        </div>

        {/* Stories List */}
        {STORIES.map(story => (
          <div key={story.id} className="min-w-[112px] h-[190px] rounded-xl overflow-hidden shadow relative cursor-pointer group">
             <img src={story.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={story.userName} />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
             
             {/* Avatar Ring */}
             <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-[#1877F2] overflow-hidden">
                <img src={story.userAvatar} className="w-full h-full object-cover" alt="Avatar" />
             </div>
             
             <span className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow-md">
               {story.userName}
             </span>
          </div>
        ))}
      </div>

      {/* Nav Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default StoryCarousel;
