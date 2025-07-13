import React from 'react';

const SkeletonCard = () => (
    <div className="card animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded-t-xl" />
        <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
            <div className="flex gap-2 mb-4">
                <div className="h-5 w-12 bg-gray-200 rounded-full" />
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-8 bg-gray-200 rounded w-full" />
        </div>
    </div>
);

const SuggestionSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
    </div>
);

export default SuggestionSkeleton; 