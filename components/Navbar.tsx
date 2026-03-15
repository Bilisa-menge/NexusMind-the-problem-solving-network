
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import FeedbackForm from './FeedbackForm';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const navItems = [
    { icon: 'fa-house', path: '/', label: 'Home' },
    { icon: 'fa-video', path: '/solutions', label: 'Watch' },
    { icon: 'fa-store', path: '/marketplace', label: 'Marketplace' },
    { icon: 'fa-users-viewfinder', path: '/groups', label: 'Groups' },
    { icon: 'fa-puzzle-piece', path: '/challenges', label: 'Challenges' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[56px] bg-white border-b border-gray-300 shadow-sm z-50 px-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center justify-center w-10 h-10">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-brain text-white text-xl"></i>
            </div>
        </Link>
        <div className="relative group hidden sm:block">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
          <input 
            type="text" 
            placeholder="Search NexusMind..." 
            className="bg-[#F0F2F5] pl-10 pr-4 py-2 rounded-full w-[240px] focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-sm"
          />
        </div>
      </div>

      {/* Center - Icons Only */}
      <div className="hidden md:flex items-center h-full gap-2">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex items-center justify-center w-[110px] h-full border-b-4 transition-all ${
              location.pathname === item.path ? 'border-[#1877F2] text-[#1877F2]' : 'border-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-xl`}></i>
          </Link>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Feedback Button */}
        <button
          onClick={() => setShowFeedbackForm(true)}
          className="hidden lg:flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-sm font-medium"
        >
          <i className="fa-solid fa-comment-dots mr-2"></i>
          Feedback
        </button>
        
        {/* Admin Link - Only visible to admins */}
        {user.isAdmin && (
          <Link 
            to="/admin"
            className="hidden lg:flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-full text-sm font-medium"
          >
            <i className="fa-solid fa-shield-halved mr-2"></i>
            Admin
          </Link>
        )}
        <div className="hidden lg:flex items-center hover:bg-gray-100 p-1.5 rounded-full cursor-pointer">
            <img src={user.avatar} className="w-7 h-7 rounded-full object-cover mr-2" alt="Avatar" />
            <span className="font-semibold text-sm">{user.name.split(' ')[0]}</span>
        </div>
        <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-bars"></i>
        </button>
        <Link to="/messages" className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
          <i className="fa-brands fa-facebook-messenger"></i>
        </Link>
        <Link to="/notifications" className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-bell"></i>
        </Link>
        <button 
          onClick={onLogout}
          className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
        >
          <i className="fa-solid fa-caret-down"></i>
        </button>
      </div>
      
      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <FeedbackForm
          user={user}
          onClose={() => setShowFeedbackForm(false)}
          onSubmit={(feedback) => {
            console.log('Feedback submitted:', feedback);
            setShowFeedbackForm(false);
          }}
        />
      )}
    </header>
  );
};

export default Navbar;
