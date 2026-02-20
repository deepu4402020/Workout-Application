'use client';
import { useRef } from "react";

import { useState } from 'react';
import Navbar from '../components/Navbar';

const exercises = [
  { id: 1, name: 'Bench Press', muscleGroup: 'Chest', description: 'Lie back on flat bench, hold the barbell with a shoulder-width grip.', targetArea: 'Chest', link: '/Exe_Video/BenchPress.mp4'},
  { id: 2, name: 'Incline Dumbbell Press', muscleGroup: 'Chest', description: 'Sit on an incline bench with dumbbells at shoulder level.', targetArea: 'Upper Chest'  ,link : '/Exe_Video/InclineDumbelPress.mp4'},
  { id: 3, name: 'Push-Up', muscleGroup: 'Chest', description: 'Place hands shoulder-width apart, body straight from head to heels.', targetArea: 'Chest'  ,link :'/Exe_Video/PushUps.mp4'},
  { id: 4, name: 'Chest Fly', muscleGroup: 'Chest', description: 'Lie back on a bench, holding dumbbells above your chest.', targetArea: 'Chest'  ,link :'/Exe_Video/ChestFly.mp4'},
  { id: 5, name: 'Cable Crossover', muscleGroup: 'Chest', description: 'Stand between two cable machines, pull handles together in front of chest.', targetArea: 'Chest' ,link :'/Exe_Video/CableCrossOver.mp4' },
  { id: 6, name: 'Decline Bench Press', muscleGroup: 'Chest', description: 'Lie on a decline bench, grip barbell slightly wider than shoulder-width.', targetArea: 'Chest'  ,link :'/Exe_Video/DeclineBenchPress.mp4'},
  { id: 7, name: 'Chest Press Machine', muscleGroup: 'Chest', description: 'Use chest press machine for controlled movement and stability.', targetArea: 'Chest'  ,link :'/Exe_Video/InclineDumbelPress.mp4'},
  { id: 8, name: 'Dips', muscleGroup: 'Chest', description: 'Lower body between parallel bars, push up to engage chest and triceps.', targetArea: 'Chest' ,link : '/Exe_Video/InclineDumbelPress.mp4'},
];

export default function ExercisesPage() {
  const [selected,setSelected]=useState("")
    const videoRef = useRef<HTMLVideoElement | null>(null);


  const [searchQuery, setSearchQuery] = useState('');

const filteredExercises = exercises.filter((exercise) => {
  if (selected === "") return true;   // Show all if nothing selected
  return exercise.muscleGroup === selected;
});

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // reset to start
    }
  };


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
         <div className="flex gap-4">
  <input
    type="text"
    placeholder="Search exercises..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
  />
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-64 px-4 py-3 border border-gray-300 rounded-lg"
        >
          <option value="">All muscle groups</option>
          <option value="Chest">Chest</option>
          <option value="Leg">Leg</option>
          <option value="Back">Back</option>
          <option value="Biceps">Biceps</option>
        </select>
        </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg cursor-pointer">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
<video
  src={exercise.link}
  muted
  loop
  playsInline
  preload="metadata"
  className="w-full h-full object-contain"
  onMouseEnter={(e) => {
    const video = e.currentTarget;
    video.play();
  }}
  onMouseLeave={(e) => {
    const video = e.currentTarget;
    video.pause();
    video.currentTime = 0;
  }}
/>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
                <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded mb-2">
                  {exercise.muscleGroup}
                </span>
                <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                <p className="text-xs text-gray-500 mb-2">Target: {exercise.targetArea}</p>
                <button className="text-purple-600 text-sm font-medium">View details →</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
