import React from 'react';

// Generic card skeleton: title, media, text, CTA
export function CardSkeleton({ minHeight = 'min-h-[24rem]' }) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-md animate-pulse flex flex-col space-y-4 ${minHeight} border border-gray-100`}
      aria-hidden="true"
    >
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-40 bg-gray-100 rounded" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
    </div>
  );
}

// Media-first card skeleton (e.g. materials, videos, newsletter items)
export function MediaCardSkeleton({ aspectClass = 'aspect-[16/9]' }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow animate-pulse" aria-hidden="true">
      <div className="w-full rounded mb-4 overflow-hidden">
        <div className={`${aspectClass} w-full bg-gray-200 rounded`} />
      </div>
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}

// Simple hero skeleton (big banner + title lines)
export function HeroSectionSkeleton() {
  return (
    <div className="container mx-auto px-6 py-16 animate-pulse" aria-hidden="true">
      <div className="h-8 w-1/3 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-8" />

      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="h-64 w-full bg-gray-200 rounded-2xl mb-6" />
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  );
}

