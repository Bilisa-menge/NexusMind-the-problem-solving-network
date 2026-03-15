
import React, { useState } from 'react';
import { User } from '../types';

interface MessagesProps {
  user: User;
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageText, setMessageText] = useState('');

  const chats = [
    { name: 'Sarah Chen', last: 'That virtual list worked!', time: '12m', avatar: 'https://picsum.photos/seed/sarah/100/100' },
    { name: 'John Doe', last: 'Looking for a business mentor.', time: '1h', avatar: 'https://picsum.photos/seed/john/100/100' },
    { name: 'Alex River', last: 'Thanks for the feedback on the logo.', time: '2d', avatar: 'https://picsum.photos/seed/alex/100/100' }
  ];

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessageText('');
    alert('Message sent! (Mock implementation)');
  };

  return (
    <div className="flex h-[calc(100vh-56px)] bg-white">
      {/* Sidebar */}
      <div className="w-[360px] border-r border-gray-200 flex flex-col">
        <div className="p-4 flex items-center justify-between">
           <h1 className="text-2xl font-bold">Chats</h1>
           <div className="flex gap-2">
             <button className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
               <i className="fa-solid fa-ellipsis"></i>
             </button>
             <button className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
               <i className="fa-solid fa-pen-to-square"></i>
             </button>
           </div>
        </div>
        <div className="px-4 mb-4">
           <div className="relative">
             <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
             <input 
               type="text" 
               placeholder="Search Messenger" 
               className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full outline-none"
             />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedChat(idx)}
              className={`flex items-center gap-3 p-2 mx-2 rounded-lg cursor-pointer transition-colors ${selectedChat === idx ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
            >
              <img src={chat.avatar} className="w-14 h-14 rounded-full" alt="Chat" />
              <div className="flex-1">
                 <p className="font-semibold">{chat.name}</p>
                 <p className="text-sm text-gray-500 truncate w-[180px]">{chat.last} · {chat.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between shadow-sm">
           <div className="flex items-center gap-3">
             <img src={chats[selectedChat].avatar} className="w-10 h-10 rounded-full" alt="Avatar" />
             <div>
               <p className="font-bold">{chats[selectedChat].name}</p>
               <p className="text-xs text-gray-500">Active 12m ago</p>
             </div>
           </div>
           <div className="flex gap-5 text-[#1877F2] text-xl">
             <i className="fa-solid fa-phone cursor-pointer"></i>
             <i className="fa-solid fa-video cursor-pointer"></i>
             <i className="fa-solid fa-circle-info cursor-pointer"></i>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-white p-4 overflow-y-auto flex flex-col gap-2">
           <div className="self-start bg-gray-200 p-3 rounded-2xl max-w-[60%]">
             Hello! I saw your post about the virtual list problem.
           </div>
           <div className="self-end bg-[#1877F2] text-white p-3 rounded-2xl max-w-[60%]">
             Hey Sarah! Yeah, it's been a nightmare for performance.
           </div>
           <div className="self-start bg-gray-200 p-3 rounded-2xl max-w-[60%]">
             Check out React Window or TanStack Virtual. They are lifesavers.
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center gap-3">
          <div className="flex gap-4 text-[#1877F2] text-xl">
            <i className="fa-solid fa-circle-plus"></i>
            <i className="fa-solid fa-image"></i>
            <i className="fa-solid fa-note-sticky"></i>
            <i className="fa-solid fa-gift"></i>
          </div>
          <div className="flex-1 relative">
             <input 
                type="text" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Aa" 
                className="w-full bg-gray-100 px-4 py-2 rounded-full outline-none"
             />
             <i className="fa-regular fa-face-smile absolute right-3 top-1/2 -translate-y-1/2 text-[#1877F2]"></i>
          </div>
          <i onClick={handleSend} className="fa-solid fa-paper-plane text-[#1877F2] text-xl cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
};

export default Messages;
