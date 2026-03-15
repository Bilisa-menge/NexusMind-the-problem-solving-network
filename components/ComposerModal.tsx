import React, { useState } from 'react';
import { User, Post } from '../types';

interface ComposerModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (post: Post) => void;
}

const ComposerModal: React.FC<ComposerModalProps> = ({ user, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [privacy, setPrivacy] = useState('Public');

  const categories = ['General', 'Technology', 'Business', 'Creative', 'Personal', 'Science', 'Social'];

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 11),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      title,
      content,
      category,
      timestamp: Date.now(),
      votes: 0,
      solutions: [],
      isSolved: false
    };

    onSubmit(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[500px] rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="w-8"></div>
          <h2 className="text-xl font-bold">Create Problem Post</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 flex items-center gap-3">
          <img src={user.avatar} className="w-10 h-10 rounded-full" alt="Avatar" />
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">{user.name}</h4>
            <div className="flex gap-2">
              <div className="bg-gray-200 px-2 py-0.5 rounded flex items-center gap-1 text-[11px] font-bold cursor-pointer">
                <i className="fa-solid fa-users text-xs"></i> {privacy} <i className="fa-solid fa-caret-down"></i>
              </div>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-200 px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="p-4 flex-1 space-y-3">
          <input 
            type="text" 
            placeholder="Problem Title (optional)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-semibold focus:outline-none placeholder-gray-400"
          />
          <textarea 
            placeholder={`What problem are you facing, ${user.name.split(' ')[0]}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[150px] text-xl focus:outline-none resize-none placeholder-gray-400"
          ></textarea>
        </div>

        {/* Add to Post */}
        <div className="mx-4 mb-4 p-3 border border-gray-300 rounded-lg flex items-center justify-between">
          <span className="font-semibold text-sm">Add to your post</span>
          <div className="flex gap-3 text-2xl">
            <i className="fa-solid fa-images text-[#45BD62] cursor-pointer"></i>
            <i className="fa-solid fa-user-tag text-[#1877F2] cursor-pointer"></i>
            <i className="fa-regular fa-face-smile text-[#F7B928] cursor-pointer"></i>
            <i className="fa-solid fa-location-dot text-[#F3425E] cursor-pointer"></i>
            <i className="fa-solid fa-ellipsis text-gray-400 cursor-pointer"></i>
          </div>
        </div>

        {/* Submit */}
        <div className="p-4">
          <button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="w-full bg-[#1877F2] disabled:bg-gray-300 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Post Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposerModal;
