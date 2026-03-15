
import React from 'react';
import { NOTIFICATIONS } from '../constants';

const Notifications: React.FC = () => {
  return (
    <div className="max-w-[800px] mx-auto p-4 bg-white min-h-screen shadow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full font-semibold">Mark all as read</button>
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-[17px] py-2 px-2">New</h3>
        {NOTIFICATIONS.map(notif => (
          <div 
            key={notif.id}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${!notif.read ? 'bg-blue-50' : ''}`}
          >
            <div className="relative">
              <img src={notif.avatar} className="w-14 h-14 rounded-full" alt="Notif" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 border-4 border-white rounded-full flex items-center justify-center text-white text-[10px]">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
            </div>
            <div className="flex-1">
              <p className={`text-[15px] ${!notif.read ? 'font-bold' : ''}`}>{notif.text}</p>
              <p className="text-xs text-blue-500 font-semibold">{notif.time}</p>
            </div>
            {!notif.read && (
               <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            )}
            <div className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-full">
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
        ))}
        
        <h3 className="font-bold text-[17px] py-2 px-2 mt-4 border-t border-gray-200">Earlier</h3>
        <p className="text-center text-gray-500 py-4 italic">No more older notifications.</p>
      </div>
    </div>
  );
};

export default Notifications;
