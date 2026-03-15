
import React from 'react';
import NexusMindLogo from '../components/NexusMindLogo';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center animate-pulse">
        <NexusMindLogo size={80} className="mb-6" />
        <h2 className="text-[#1877F2] text-3xl font-bold">NexusMind</h2>
      </div>
      
      <div className="fixed bottom-10 flex flex-col items-center text-gray-500">
        <span className="text-sm font-medium">connect.solve.grow</span>
      </div>
    </div>
  );
};

export default Loading;
