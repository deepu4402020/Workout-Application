'use client';

import { useCallback, useState } from 'react';
import { usePoseDetection } from '@/app/hooks/usePoseDetection';
import type { ExerciseFormId, FormFeedback } from '@/app/utlis/formValidation';

export default function ExerciseFormChecker() {
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseFormId>('bench-press');
  const [feedback, setFeedback] = useState<FormFeedback>({
    isCorrect: false,
    errors: [],
    score: 0,
  });

  const onFeedback = useCallback((f: FormFeedback) => setFeedback(f), []);

  const { videoRef, canvasRef, isLoading, error } = usePoseDetection({
    exercise: selectedExercise,
    onFeedback,
  });

  return (
    <div
      className="flex flex-col items-center gap-6 p-6 max-w-3xl mx-auto"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700&display=swap');`}</style>

      <h1
        className="text-3xl font-bold text-gray-900"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
      >
        Exercise form checker
      </h1>

      <div className="flex flex-wrap justify-center gap-2">
        {(
          [
            ['bench-press', 'Bench press'],
            ['dumbbell-curl', 'Dumbbell curl'],
            ['squat', 'Squat'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelectedExercise(id)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
              selectedExercise === id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-[640px]">
        <video
          ref={videoRef}
          className="hidden"
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="w-full rounded-2xl border border-gray-200 shadow-lg bg-black"
        />

        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
            <p className="text-white text-sm font-medium">Loading camera…</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl p-4">
            <p className="text-white text-sm text-center">{error}</p>
          </div>
        )}
      </div>

      <div className="w-full rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-lg font-bold text-gray-900">Form feedback</h3>
          <span
            className={`text-2xl font-bold ${
              feedback.score >= 80
                ? 'text-emerald-600'
                : feedback.score >= 50
                  ? 'text-amber-600'
                  : 'text-red-600'
            }`}
          >
            {feedback.score}
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 mb-4 overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all"
            style={{ width: `${feedback.score}%` }}
          />
        </div>
        <ul className="space-y-2">
          {feedback.errors.length === 0 ? (
            <li className="text-sm text-gray-500">No issues reported.</li>
          ) : (
            feedback.errors.map((e, i) => (
              <li key={i} className="text-sm text-gray-800 flex gap-2">
                <span className="text-purple-500">•</span>
                {e}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
