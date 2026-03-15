
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, User } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onVote?: (postId: string, delta: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onVote }) => {
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false);

  const handleVoteClick = () => {
    if (onVote) {
      onVote(post.id, hasVoted ? -1 : 1);
    }
    setHasVoted(!hasVoted);
  };

  const handleSuggestSolution = () => {
    navigate(`/solutions/${post.id}`);
  };

  const formatDate = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff/3600000)}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
             <img src={post.userAvatar} className="w-10 h-10 rounded-full object-cover" alt={post.userName} />
             {post.isSolved && (
               <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-0.5 rounded-full border-2 border-white text-[8px]">
                 <i className="fa-solid fa-check"></i>
               </div>
             )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-semibold text-[15px] leading-tight cursor-pointer hover:underline">{post.userName}</h4>
              <span className="text-gray-500 text-xs">•</span>
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">{post.category}</span>
            </div>
            <p className="text-gray-500 text-[13px]">{formatDate(post.timestamp)} · <i className="fa-solid fa-earth-americas"></i></p>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 w-8 h-8 rounded-full transition-colors">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      {/* Content */}
      <div className="px-3 pb-2 space-y-2">
        {post.title && <h3 className="font-bold text-[17px]">{post.title}</h3>}
        <p className="text-[15px] whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="w-full h-auto border-y border-gray-100">
          <img src={post.imageUrl} className="w-full object-cover max-h-[500px]" alt="Post Content" />
        </div>
      )}

      {/* Stats */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1.5 cursor-pointer hover:underline group">
          <div className="flex -space-x-1">
             <div className="bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white">
               <i className="fa-solid fa-thumbs-up"></i>
             </div>
             <div className="bg-yellow-500 w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white">
               <i className="fa-solid fa-lightbulb"></i>
             </div>
          </div>
          <span className="text-gray-500 text-[14px]">{post.votes} helpful votes</span>
        </div>
        <div className="flex gap-3 text-[14px] text-gray-500">
           <span className="hover:underline cursor-pointer">{post.solutions.length} solutions</span>
           <span className="hover:underline cursor-pointer">12 shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 py-1 flex items-center justify-around">
        <button 
          onClick={handleVoteClick}
          className={`flex items-center gap-2 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg font-semibold text-sm transition-colors ${hasVoted ? 'text-blue-500' : 'text-[#65676B]'}`}
        >
          <i className={`fa-regular fa-thumbs-up ${hasVoted ? 'fa-solid' : ''}`}></i> Helpful
        </button>
        <button 
          onClick={handleSuggestSolution}
          className="flex items-center gap-2 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg text-[#65676B] font-semibold text-sm transition-colors"
        >
          <i className="fa-regular fa-comment"></i> Suggest Solution
        </button>
        <button className="flex items-center gap-2 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg text-[#65676B] font-semibold text-sm transition-colors">
          <i className="fa-solid fa-share"></i> Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;
