
import React from 'react';

interface NexusMindLogoProps {
  size?: number;
  className?: string;
}

/** Brain logo - white stylized brain on blue square background */
const NexusMindLogo: React.FC<NexusMindLogoProps> = ({ size = 64, className = '' }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size, backgroundColor: '#1877F2' }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 928 1120"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M408 1 0 2v1116h920l1-559-1-557zm-8 308c18 7 27 14 35 30 9 17 8-2 8 234l-1 209-2 6q-7 22-22 34-21 14-43 11-17-2-26-8c-14-9-19-17-24-32l-3-8-13-1a67 67 0 0 1-66-82v-4l-9-6c-7-3-10-5-18-12a62 62 0 0 1-20-31q-6-16-5-33 1-26 19-47c8-10 7-10 17-16l9-5-4-9c-6-9-8-16-9-30q0-16 7-32 6-11 20-23c5-4 16-10 19-10l3-2q3 0 1-10-4-30 18-54 9-10 23-16c7-3 8-4 10-13 1-5 6-16 9-19l18-17c14-7 36-9 49-5m149-1c12 4 17 7 26 16q12 13 14 27c2 7 0 6 16 14q6 2 14 10 26 25 21 57v10l8 4 11 6c8 5 20 18 23 25 11 20 10 45-1 64l-3 6 6 5c9 5 12 8 18 16q12 14 17 30c2 8 2 10 2 23 0 15 0 16-3 25-4 12-6 16-12 23q-15 18-29 25-9 2-5 9a69 69 0 0 1-19 61c-6 6-9 9-17 12-13 7-19 8-33 8h-12l-3 8q-4 14-14 25l-13 9a65 65 0 0 1-70-8c-7-6-15-19-19-31l-2-211 1-215q1-16 12-31 6-10 16-16 25-12 50-6"/>
      </svg>
    </div>
  );
};

export default NexusMindLogo;
