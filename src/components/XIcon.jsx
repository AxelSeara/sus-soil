// XIcon.jsx
import React from 'react';

export function XIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.3,2.3L12,10l7.7-7.7c0.4-0.4,1-0.4,1.4,0l1.3,1.3c0.4,0.4,0.4,1,0,1.4L14,12l7.7,7.7
        c0.4,0.4,0.4,1,0,1.4l-1.3,1.3c-0.4,0.4-1,0.4-1.4,0L12,14l-7.7,7.7c-0.4,0.4-1,0.4-1.4,0L1.6,20.3
        c-0.4-0.4-0.4-1,0-1.4L9.3,12L1.6,4.3c-0.4-0.4-0.4-1,0-1.4l1.3-1.3C3.3,1.9,3.9,1.9,4.3,2.3z" />
    </svg>
  );
}