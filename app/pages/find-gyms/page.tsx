'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function FindGymsPage() {
  const [radius, setRadius] = useState(1500);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Gyms Near You</h1>
          <p className="text-lg">
            Discover fitness centers in your area to kickstart your fitness journey.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Find Nearby Gyms</h2>
          <p className="text-gray-600">We use your location to find the closest gyms.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <label className="block text-sm font-medium mb-4">
            Search Radius: {radius} meters
          </label>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>500m</span>
            <span>5000m</span>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">
            Unable to get your location. Please enable location services and try again.
          </p>
        </div>
      </main>
    </div>
  );
}

