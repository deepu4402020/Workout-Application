'use client';

import { useCallback, useState } from 'react';
import Navbar from '../components/Navbar';
import { usePoseDetection } from '@/app/hooks/usePoseDetection';
import type { ExerciseFormId, FormFeedback } from '@/app/utlis/formValidation';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Dumbbell,
  ScanLine,
} from 'lucide-react';

const exercises: { id: ExerciseFormId; label: string; hint: string }[] = [
  {
    id: 'bench-press',
    label: 'Bench press',
    hint: 'Face the camera; keep shoulders, elbows, and wrists visible.',
  },
  {
    id: 'dumbbell-curl',
    label: 'Dumbbell curl',
    hint: 'Show your left side; keep elbow and wrist in frame.',
  },
  {
    id: 'squat',
    label: 'Squat',
    hint: 'Full body visible — hips, knees, and ankles in frame.',
  },
];

const initialFeedback: FormFeedback = {
  isCorrect: false,
  errors: [],
  score: 0,
};

export default function FormValidationPage() {
  const [exercise, setExercise] = useState<ExerciseFormId>('bench-press');
  const [feedback, setFeedback] = useState<FormFeedback>(initialFeedback);

  const onFeedback = useCallback((f: FormFeedback) => {
    setFeedback(f);
  }, []);

  const { videoRef, canvasRef, isLoading, error } = usePoseDetection({
    exercise,
    onFeedback,
  });

  const activeHint = exercises.find((e) => e.id === exercise)?.hint ?? '';

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>

      <div
        className="min-h-screen bg-[#f8f7f4] flex flex-col"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Navbar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 mb-4">
                <ScanLine className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-purple-700 tracking-wide uppercase">
                  Live form check
                </span>
              </div>
              <h1
                className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                Real-time{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-violet-500">
                  exercise form
                </span>
              </h1>
              <p className="mt-3 text-gray-500 max-w-2xl text-base leading-relaxed">
                MediaPipe tracks your pose in the browser. We score alignment
                against simple rules for each lift — use it as a coach, not a
                medical device.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.35 }}
                className="lg:col-span-3 space-y-5"
              >
                <div className="flex flex-wrap gap-2">
                  {exercises.map((ex) => (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => setExercise(ex.id)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                        exercise === ex.id
                          ? 'bg-purple-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)]'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
                      }`}
                    >
                      <Dumbbell className="w-4 h-4 opacity-80" />
                      {ex.label}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">{activeHint}</p>

                <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 bg-gray-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]">
                  <video
                    ref={videoRef}
                    className="hidden"
                    autoPlay
                    playsInline
                    muted
                  />
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto max-h-[min(70vh,520px)] object-contain bg-black"
                  />

                  {isLoading && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 gap-3">
                      <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-white text-sm font-medium">
                        Starting camera & pose model…
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6">
                      <div className="rounded-xl bg-white max-w-md p-5 text-center shadow-xl">
                        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                        <p className="text-gray-900 font-semibold mb-1">
                          Camera unavailable
                        </p>
                        <p className="text-sm text-gray-500">{error}</p>
                        <p className="text-xs text-gray-400 mt-3">
                          Allow camera access and use HTTPS or localhost.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="lg:col-span-2 space-y-5"
              >
                <div className="rounded-2xl bg-white border border-gray-200/80 p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-600" />
                      Form score
                    </h2>
                    <span
                      className={`text-2xl font-bold tabular-nums ${
                        feedback.score >= 80
                          ? 'text-emerald-600'
                          : feedback.score >= 50
                            ? 'text-amber-600'
                            : 'text-red-600'
                      }`}
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {feedback.score}
                    </span>
                  </div>

                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mb-6">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        feedback.score >= 80
                          ? 'bg-emerald-500'
                          : feedback.score >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${feedback.score}%` }}
                    />
                  </div>

                  <div
                    className={`flex items-start gap-3 rounded-xl p-4 mb-5 ${
                      feedback.isCorrect
                        ? 'bg-emerald-50 border border-emerald-100'
                        : 'bg-amber-50/80 border border-amber-100'
                    }`}
                  >
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {feedback.isCorrect
                          ? 'Looking solid'
                          : 'Adjust your form'}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {feedback.isCorrect
                          ? 'No rule violations detected for this frame.'
                          : 'Fix the issues below and recheck in real time.'}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Issues
                  </h3>
                  <ul className="space-y-2.5 min-h-[120px]">
                    {feedback.errors.length === 0 ? (
                      <li className="text-sm text-gray-400 italic">
                        No active warnings.
                      </li>
                    ) : (
                      feedback.errors.map((msg, i) => (
                        <li
                          key={`${msg}-${i}`}
                          className="flex gap-2 text-sm text-gray-700 leading-snug"
                        >
                          <span className="text-purple-500 font-bold shrink-0">
                            •
                          </span>
                          {msg}
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl bg-purple-50/60 border border-purple-100 p-5 text-sm text-purple-900/80 leading-relaxed">
                  <strong className="text-purple-900">Tip:</strong> Good
                  lighting and a clear side or front view improve landmark
                  accuracy. Rules are simplified — always prioritize safe,
                  comfortable movement.
                </div>
              </motion.aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
