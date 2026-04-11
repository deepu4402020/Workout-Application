'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './components/Chatbot';
import {
  Dumbbell,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Heart,
} from 'lucide-react';


/* ─────────────────────────────────────────
   Stats ticker
───────────────────────────────────────── */
const stats = [
  { label: 'Active Users', value: '120K+' },
  { label: 'Workouts Logged', value: '4.2M' },
  { label: 'Exercise Library', value: '800+' },
  { label: 'Diet Plans', value: '200+' },
];

/* ─────────────────────────────────────────
   Feature cards
───────────────────────────────────────── */
const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Smart Workouts',
    desc: 'AI-curated exercise plans that adapt to your level and goals.',
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Goal Tracking',
    desc: 'Visual progress boards so you always know how far youve come.',
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Diet Planning',
    desc: 'Macro-balanced meal plans built around your lifestyle.',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Wellness Score',
    desc: 'A daily health index combining sleep, nutrition, and activity.',
  },
];

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0d0d0f] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-violet-500 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <span
                className="text-white text-xl font-bold tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
              >
                Eleweight
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your all-in-one fitness companion. Train smarter, eat better, live stronger.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-500 hover:text-purple-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              heading: 'Product',
              links: ['Exercises', 'My Plans', 'Diet Plans', 'Find Gyms', 'Food Analyzer'],
            },
            {
              heading: 'Company',
              links: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
            },
            {
              heading: 'Legal',
              links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-purple-400 transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/5 pt-8 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white text-sm font-medium mb-1">Stay in the loop</p>
            <p className="text-xs text-gray-500">Get weekly workout tips and nutrition guides.</p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <div className="flex items-center gap-2 flex-1 sm:w-64 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent text-sm text-white placeholder-gray-600 outline-none w-full"
              />
            </div>
            <button className="px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Eleweight Inc. All rights reserved.</p>
          <p>Built for athletes, by athletes.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>



      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-[#f8f7f4] flex flex-col"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <Navbar />

          <main className="flex-1">
            {/* ── Hero ── */}
            <section className="relative overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
              {/* Background blob */}
              <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-100 blur-[120px] opacity-60 pointer-events-none" />
              <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-violet-100 blur-[100px] opacity-40 pointer-events-none" />

              <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left copy */}
                <div className="space-y-7">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-xs font-semibold text-purple-700 tracking-wide uppercase">
                      Your Fitness Journey Starts Here
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
                  >
                    Your Personal
                    <br />
                    Guide To{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
                      Fitness
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-md"
                  >
                    Explore customized exercises for your fitness level. Track progress, stay
                    motivated, and build a stronger, healthier you.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Link
                      href="/exercises"
                      className="group inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-[0_4px_24px_rgba(139,92,246,0.4)] hover:shadow-[0_4px_32px_rgba(139,92,246,0.6)] text-sm"
                    >
                      Browse Exercises
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 
                  </motion.div>
                  {/* Stats row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2"
                  >
                    {stats.map((s, i) => (
                      <div key={i} className="text-left">
                        <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {s.value}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
                  className="relative"
                >
                  <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="/hero.jpg"
                      alt="Fitness hero"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="absolute -left-6 bottom-12 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Weekly Progress</p>
                      <p className="text-sm font-bold text-gray-900">+18% Strength</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 }}
                    className="absolute -right-4 top-10 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Today's Goal</p>
                      <p className="text-sm font-bold text-gray-900">3 / 5 Done</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* ── Features ── */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">
                    Why Eleweight
                  </p>
                  <h2
                    className="text-4xl sm:text-5xl font-bold text-gray-900"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.03em' }}
                  >
                    Everything You Need to Perform
                  </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="group p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 border border-transparent hover:border-purple-100 transition-all cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100 group-hover:bg-purple-600 text-purple-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                        {f.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── CTA Band ── */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-purple-600 to-violet-700 px-8 sm:px-12 py-14 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
                <div className="relative text-center sm:text-left">
                  <h2
                    className="text-4xl sm:text-5xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Start Training Today
                  </h2>
                  <p className="text-purple-200 text-sm">
                    Join 120,000+ members leveling up their fitness.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="relative flex-shrink-0 inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3.5 rounded-xl hover:bg-purple-50 transition-colors text-sm shadow-lg"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </section>
          </main>

          <Footer />
          <Chatbot />
        </motion.div>
      
    </>
  );
}