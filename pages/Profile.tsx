
import React from 'react';
import { User, Post } from '../types';
import PostCard from '../components/PostCard';

interface ProfileProps {
  user: User;
  posts: Post[];
  onVote?: (postId: string, delta: number) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, posts, onVote }) => {
  const myPosts = posts.filter(p => p.userId === user.id);

  return (
    <div className="bg-[#F0F2F5] min-h-screen">
      {/* Header Area */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-[1100px] mx-auto">
          {/* Cover */}
          <div className="h-[350px] bg-gradient-to-b from-gray-300 to-gray-500 rounded-b-xl relative group">
             <button className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg font-bold text-sm shadow flex items-center gap-2">
                <i className="fa-solid fa-camera"></i> Edit cover photo
             </button>
          </div>
          
          {/* Profile Info Row */}
          <div className="px-10 pb-4 relative">
             <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-10 md:-mt-20">
                <div className="relative group">
                  <img src={user.avatar} className="w-[168px] h-[168px] rounded-full border-4 border-white shadow" alt="Avatar" />
                  <button className="absolute bottom-4 right-2 bg-gray-200 hover:bg-gray-300 w-9 h-9 rounded-full border-4 border-white flex items-center justify-center">
                    <i className="fa-solid fa-camera"></i>
                  </button>
                </div>
                <div className="flex-1 mb-4 text-center md:text-left">
                  <h1 className="text-4xl font-bold">{user.name}</h1>
                  <p className="text-gray-500 font-semibold">{user.reputation} Reputation Points</p>
                  <p className="text-gray-600 mt-2">{user.bio}</p>
                </div>
                <div className="flex gap-2 mb-4">
                  <button className="bg-[#1877F2] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <i className="fa-solid fa-plus"></i> Add to story
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <i className="fa-solid fa-pen"></i> Edit profile
                  </button>
                </div>
             </div>
             
             {/* Tabs */}
             <div className="mt-8 flex border-t border-gray-200 pt-1">
                {['Challenges', 'About', 'Expertise', 'Solutions', 'Photos', 'More'].map((tab, idx) => (
                   <button 
                     key={tab} 
                     className={`px-4 py-4 font-bold text-gray-600 border-b-4 ${idx === 0 ? 'border-blue-500 text-blue-500' : 'border-transparent hover:bg-gray-100'}`}
                   >
                     {tab}
                   </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1100px] mx-auto px-4 py-4 flex flex-col lg:flex-row gap-4">
        {/* Left Side (Intro/Photos) */}
        <div className="w-full lg:w-[400px] space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
             <h2 className="text-xl font-bold mb-4">Intro</h2>
             <div className="space-y-4 text-sm text-gray-700">
                <p className="text-center italic">{user.bio}</p>
                <div className="flex items-center gap-3">
                   <i className="fa-solid fa-briefcase text-gray-500 text-lg"></i>
                   <span>Top Solver at <b>Technology Sector</b></span>
                </div>
                <div className="flex items-center gap-3">
                   <i className="fa-solid fa-graduation-cap text-gray-500 text-lg"></i>
                   <span>Went to <b>Stanford University</b></span>
                </div>
                <div className="flex items-center gap-3">
                   <i className="fa-solid fa-location-dot text-gray-500 text-lg"></i>
                   <span>From <b>San Francisco, CA</b></span>
                </div>
                <button className="w-full bg-gray-200 hover:bg-gray-300 font-bold py-2 rounded-lg transition-colors">Edit Details</button>
             </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold">Photos</h2>
               <button className="text-blue-500 hover:bg-blue-50 p-2 rounded text-sm font-semibold">See all photos</button>
             </div>
             <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map(i => <img key={i} src={`https://picsum.photos/seed/p${i}/200/200`} className="rounded-lg aspect-square object-cover" alt="Gallery" />)}
             </div>
          </div>
        </div>

        {/* Right Side (Posts) */}
        <div className="flex-1 space-y-4">
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
            <h2 className="font-bold text-xl">Challenges Posted</h2>
            <div className="flex gap-2">
              <button className="bg-gray-200 px-3 py-1.5 rounded font-bold text-sm flex items-center gap-2">
                 <i className="fa-solid fa-sliders"></i> Filters
              </button>
              <button className="bg-gray-200 px-3 py-1.5 rounded font-bold text-sm flex items-center gap-2">
                 <i className="fa-solid fa-gear"></i> Manage Posts
              </button>
            </div>
          </div>
          
          {myPosts.length > 0 ? (
            myPosts.map(post => (
              <PostCard key={post.id} post={post} onVote={onVote || (() => {})} currentUser={user} />
            ))
          ) : (
            <div className="bg-white p-10 text-center rounded-lg shadow-sm text-gray-500 italic">
              No problems posted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
