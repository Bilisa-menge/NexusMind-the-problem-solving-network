
import React from 'react';
import { User } from '../types';
import { Link } from 'react-router-dom';

interface LeftSidebarProps {
  user: User;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ user }) => {
  const items = [
    { icon: 'fa-user-group', label: 'Find Solvers', color: 'text-blue-500', path: '/users' },
    { icon: 'fa-puzzle-piece', label: 'My Challenges', color: 'text-purple-500', path: '/challenges' },
    { icon: 'fa-ranking-star', label: 'Expert Rankings', color: 'text-yellow-500', path: '/rankings' },
    { icon: 'fa-layer-group', label: 'Categories', color: 'text-green-500', path: '/categories' },
    { icon: 'fa-handshake', label: 'Collaboration Hub', color: 'text-blue-400', path: '/collaboration' },
    { icon: 'fa-box-archive', label: 'Solved Archive', color: 'text-gray-500', path: '/archive' },
    { icon: 'fa-book-bookmark', label: 'Saved Methods', color: 'text-red-500', path: '/saved' },
    { icon: 'fa-chart-line', label: 'Problem Analytics', color: 'text-blue-600', path: '/analytics' },
    { icon: 'fa-star', label: 'Success Stories', color: 'text-orange-500', path: '/success' },
    { icon: 'fa-coins', label: 'Funding/Grants', color: 'text-yellow-600', path: '/funding' },
    { icon: 'fa-graduation-cap', label: 'Learning Resources', color: 'text-indigo-500', path: '/learning' },
    { icon: 'fa-location-dot', label: 'Local Struggles', color: 'text-red-400', path: '/local' },
    { icon: 'fa-people-arrows', label: 'Mentorship', color: 'text-teal-500', path: '/mentorship' },
    { icon: 'fa-lightbulb', label: 'Idea Incubator', color: 'text-yellow-400', path: '/incubator' },
    { icon: 'fa-circle-info', label: 'Help Center', color: 'text-blue-500', path: '/help' }
  ];

  return (
    <aside className="fixed left-0 top-[56px] bottom-0 w-[280px] overflow-y-auto hidden lg:block p-2">
      <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors mb-2">
        <img src={user.avatar} className="w-9 h-9 rounded-full object-cover" alt="User" />
        <span className="font-semibold text-sm">{user.name}</span>
      </Link>

      {items.map((item, idx) => (
        <Link key={idx} to={item.path} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
          <div className={`w-9 h-9 flex items-center justify-center text-xl ${item.color}`}>
            <i className={`fa-solid ${item.icon}`}></i>
          </div>
          <span className="text-[15px] font-medium">{item.label}</span>
        </Link>
      ))}

      <div className="mt-4 pt-4 border-t border-gray-300 px-2 text-xs text-gray-500 space-y-2">
        <p>Privacy · Terms · Advertising · Cookies · Nexus © 2026</p>
      </div>
    </aside>
  );
};

export default LeftSidebar;
