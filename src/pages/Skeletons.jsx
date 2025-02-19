// src/pages/Skeletons.jsx
import React from 'react';

// Skeleton for Post Detail
export const SkeletonPostDetail = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-300 w-3/4 rounded mb-4"></div>
    <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-5/6 rounded mb-4"></div>
  </div>
);

// Skeleton for Recent Post Card
export const SkeletonRecentPostCard = () => (
  <div className="border p-4 rounded-lg shadow-md animate-pulse">
    <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
    <div className="w-full h-48 bg-gray-200 mb-2 rounded"></div>
  </div>
);

// Skeleton for Event Card
export const SkeletonEventCard = () => (
  <div className="border p-4 rounded-lg shadow-md animate-pulse">
    <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
    <div className="w-full h-48 bg-gray-200 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 w-1/2 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 w-2/3 rounded mb-4"></div>
    <div className="h-8 bg-gray-300 w-full rounded"></div>
  </div>
);