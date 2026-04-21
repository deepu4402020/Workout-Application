'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Counter from './components/Counter';
import Ticker from './components/Ticker';
import SectionLabel from './components/SectionLabel';
import Footer from './components/Footer';
import ExerciseCard from './components/ExerciseCard';
import TeaserCard from './components/TeaserCard';
import {
  ArrowRight,
  Dumbbell,
  Utensils,
  MapPin,
  TrendingUp,
  Zap,
} from 'lucide-react';

/* ══════════════════════════════════════════
   Feature Cards Data
══════════════════════════════════════════ */
const features = [
  {
    icon: Dumbbell,
    title: 'Movement Library',
    desc: '20+ expert-curated movements across every muscle group — with step-by-step guides, pro tips, and video demonstrations.',
    tag: 'Movements',
    link: '/exercises',
  },
  {
    icon: Utensils,
    title: 'Nutrition',
    desc: 'Macro-aligned meal strategies tailored to your goals. Customised programmes from our top-tier trainers.',
    tag: 'Nutrition',
    link: '/diet-plans',
  },
  {
    icon: MapPin,
    title: 'Gym Finder',
    desc: 'Discover aligned gym facilities and wellness sanctuaries near you. Filter by distance and equipment.',
    tag: 'Locations',
    link: '/find-gyms',
  },
  {
    icon: TrendingUp,
    title: 'Analytics',
    desc: 'Posture-aligned form linkage based on advanced algorithms, biomechanics, and kinetic awareness.',
    tag: 'Insights',
    link: '/form-validation',
  },
];

/* ══════════════════════════════════════════
   Exercise Preview Data
══════════════════════════════════════════ */
const exercises = [
  { name: 'Bench Press', muscle: 'Chest', level: 'Standard', img: 'https://images.unsplash.com/photo-1652363722856-214ce6a06a44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Incline Dumbbell Press', muscle: 'Chest', level: 'Standard', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80&auto=format&fit=crop&grayscale' },
  { name: 'Push-Up', muscle: 'Chest', level: 'Base', img: 'https://images.unsplash.com/photo-1603503364272-6e28e046b37a?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Chest Fly', muscle: 'Chest', level: 'Standard', img: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col"
    >
      <Navbar />

      <main className="flex-1">

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section className="relative min-h-[90vh] bg-background overflow-hidden flex flex-col justify-center border-b border-border">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left column: Content */}
              <div className="space-y-10 animate-fade-in-up">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-[1px] w-12 bg-foreground" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                      EST. 2026 — ELEWEIGHT ARCHIVES
                    </span>
                  </motion.div>

                  <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-display text-foreground leading-[0.95] tracking-tight">
                    Beyond<br />
                    Resistance.<br />
                    <span className="font-light italic text-muted">Aesthetes.</span>
                  </h1>
                </div>

                <p className="font-sans text-lg text-muted leading-relaxed max-w-md">
                  A high-fidelity workspace for physical refinement. Precision protocols meet ultra-minimalist architecture for the modern athlete.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/exercises"
                    className="group relative inline-flex items-center justify-center gap-2 bg-foreground text-background font-sans font-bold text-sm px-10 py-5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    START TRAINING
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border border-border hover:border-foreground text-foreground font-sans font-bold text-sm px-10 py-5 transition-all"
                  >
                    VIEW TIERS
                  </Link>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="space-y-1">
                    <p className="text-2xl font-mono font-bold text-foreground">120K+</p>
                    <p className="text-[9px] font-bold text-muted-light uppercase tracking-widest">Global Athletes</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="space-y-1">
                    <p className="text-2xl font-mono font-bold text-foreground">800+</p>
                    <p className="text-[9px] font-bold text-muted-light uppercase tracking-widest">Expert Protocols</p>
                  </div>
                </div>
              </div>

              {/* Right column: Image Container */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-border group">
                  <img
                    src="image.png"
                    alt="Athlete in motion"
                    className="absolute inset-0 w-full h-full object-cover bw-image scale-105 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

                  {/* Floating Elements */}
                  <div className="absolute bottom-8 left-8 right-8 mix-blend-difference">
                    <p className="text-[10px] font-mono tracking-[0.2em] text-white/50">DRIVEN BY PERFORMANCE</p>
                    <div className="h-px w-full bg-white/20 mt-2" />
                  </div>
                </div>

                {/* Aesthetic Detail Dots */}
                <div className="absolute -top-4 -right-4 w-24 h-24 grid grid-cols-4 gap-4 opacity-20 invisible lg:grid">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-foreground rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════
                STATS BAR (Integrated)
            ══════════════════════════════════════ */}
            <div className="mt-32 pt-16 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { value: 120, suffix: 'K+', label: 'Active Members' },
                { value: 4200, suffix: 'K', label: 'Sessions Logged' },
                { value: 800, suffix: '+', label: 'Curated Exercises' },
                { value: 200, suffix: '+', label: 'Memberships' },
              ].map((s, i) => (
                <div key={i} className="space-y-3">
                  <p className="text-5xl font-mono font-bold text-foreground tracking-tighter">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Ticker />

        {/* ══════════════════════════════════════
            2. PHILOSOPHY
        ══════════════════════════════════════ */}
        <section className="px-6 lg:px-8 py-28 bg-[var(--surface)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-6 mb-14">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <SectionLabel>Our Philosophy</SectionLabel>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <blockquote className="text-center">
              <p className="text-[clamp(1.75rem,4vw,3.5rem)] font-display text-[var(--foreground)] leading-[1.12] tracking-tight">
                &ldquo;True strength is not measured by resistance alone, but by the{' '}
                <em className="not-italic font-light text-[var(--muted)]">
                  thoughtful intention
                </em>{' '}
                behind every movement.&rdquo;
              </p>
            </blockquote>

            <p className="text-center mt-10 text-[10px] font-sans text-[var(--muted)] uppercase tracking-[0.28em]">
              — Eleweight Core Principle
            </p>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            3. FEATURE OVERVIEW
        ══════════════════════════════════════ */}
        <section className="px-6 lg:px-8 py-24 bg-[var(--surface-2)]" id="features">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="mb-14"
            >
              <SectionLabel>The Platform</SectionLabel>
              <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-display text-[var(--foreground)] leading-tight max-w-xl">
                Everything your training demands.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 flex flex-col gap-5 hover:border-[var(--border-dark)] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors duration-300">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold font-sans uppercase tracking-[0.2em] text-[var(--muted)] mb-2">{f.tag}</p>
                    <h3 className="font-display text-lg text-[var(--foreground)] mb-2 leading-tight">{f.title}</h3>
                    <p className="text-sm text-[var(--muted)] font-sans leading-relaxed">{f.desc}</p>
                  </div>
                  <Link
                    href={f.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold font-sans text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. MOVEMENT LIBRARY TEASER
        ══════════════════════════════════════ */}
        <section className="px-6 lg:px-8 py-24 bg-[var(--surface)]" id="movements">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
            >
              <div>
                <SectionLabel>Movement Library</SectionLabel>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display text-[var(--foreground)] leading-tight">
                  Every Exercise.<br />
                  <span className="text-[var(--muted)] font-light">Mastered.</span>
                </h2>
              </div>

              <div className="flex gap-4 lg:pb-2">
                {[
                  { value: '25+', label: 'Muscle Groups' },
                  { value: '7', label: 'Difficulty Tiers' },
                  { value: '100%', label: 'All Levels' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-mono font-bold text-[var(--foreground)] leading-none">{s.value}</p>
                    <p className="text-[10px] text-[var(--muted)] font-sans mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {exercises.map((ex, i) => (
                <ExerciseCard
                  key={ex.name}
                  name={ex.name}
                  muscle={ex.muscle}
                  level={ex.level}
                  img={ex.img}
                  delay={i * 0.08}
                />
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link
                href="/exercises"
                className="inline-flex items-center gap-3 bg-[var(--foreground)] text-[var(--background)] font-sans font-semibold text-sm px-8 py-4 rounded-xl hover:translate-y-[-2px] transition-all shadow-xl"
              >
                View Full Movement Library
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. THE ECOSYSTEM (TEASERS)
        ══════════════════════════════════════ */}
        <section className="px-6 lg:px-8 py-24 bg-[var(--surface-2)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="mb-14"
            >
              <SectionLabel>The Ecosystem</SectionLabel>
              <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-display text-[var(--foreground)] leading-tight">
                Precision protocols for the driven.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <TeaserCard
                title="Bespoke Nutrition"
                description="Macro-aligned meal strategies tailored to your metabolic profile and training intensity. No guesswork, just performance."
                label="Fuel Protocol"
                link="/diet-plans"
                icon={Utensils}
                image="https://plus.unsplash.com/premium_photo-1664476002571-ead0cbfc6d74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                delay={0.1}
              />
              <TeaserCard
                title="Sanctuary Locator"
                description="Find the perfect environment for your discipline. Discover premium facilities curated for athletes, not tourists."
                label="Gym Finder"
                link="/find-gyms"
                icon={MapPin}
                image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&grayscale"
                delay={0.2}
                highlight={true}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. PRICING SECTION
        ══════════════════════════════════════ */}
        <section className="px-6 lg:px-8 py-24 bg-background" id="pricing">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <SectionLabel>Membership</SectionLabel>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-display text-foreground leading-tight mt-4">
                Choose your discipline.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Base',
                  price: '0',
                  desc: 'Essential protocols for the dedicated beginner.',
                  features: ['Movement Library Access', 'Basic Form Analysis', 'Standard Meal Plans'],
                  cta: 'Start for Free',
                  highlight: false
                },
                {
                  name: 'Athlete',
                  price: '29',
                  desc: 'Advanced tools for the serious physical pursuit.',
                  features: ['Unlimited Form Analysis', 'Bespoke Nutrition Sync', 'Expert Video Guides', 'Priority Support'],
                  cta: 'Join Athlete Tier',
                  highlight: true
                },
                {
                  name: 'Elite',
                  price: '79',
                  desc: 'The ultimate sanctuary for peak performance.',
                  features: ['1-on-1 Virtual Coaching', 'Metabolic Profile Sync', 'Elite Movement Archives', 'Concierge Sanctuary Access'],
                  cta: 'Go Elite',
                  highlight: false
                }
              ].map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col p-8 lg:p-10 border ${plan.highlight
                    ? 'bg-foreground text-background border-foreground shadow-[0_24px_48px_rgba(0,0,0,0.1)] z-10 scale-[1.02]'
                    : 'bg-background text-foreground border-border hover:border-foreground'
                    } transition-all duration-500`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground border border-background text-background text-[10px] font-bold px-4 py-1 uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] opacity-60 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-mono font-bold">$</span>
                      <span className="text-6xl font-mono font-bold tracking-tighter">{plan.price}</span>
                      <span className="text-sm font-medium opacity-60">/mo</span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-8 opacity-80">{plan.desc}</p>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Zap className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-background' : 'text-foreground'}`} />
                        <span className="opacity-90">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/register"
                    className={`block w-full text-center py-4 font-sans font-bold text-xs uppercase tracking-widest transition-all ${plan.highlight
                      ? 'bg-background text-foreground hover:bg-neutral-200'
                      : 'bg-foreground text-background hover:bg-neutral-800'
                      }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. CTA SECTION
        ══════════════════════════════════════ */}
        <section className="px-6 lg:px-8 py-32 bg-[#0A0A0A] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] blur-[120px] rounded-full" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <SectionLabel>
              <span className="text-white/40">Ready to begin?</span>
            </SectionLabel>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display text-white leading-tight mb-8">
              Your strongest self<br />is waiting.
            </h2>
            <Link
              href="/register"
              className="inline-flex items-center gap-3 bg-white text-black font-sans font-bold text-lg px-10 py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
            >
              Join the Sanctuary
              <Zap className="w-5 h-5 fill-black" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
      <Chatbot />
    </motion.div>
  );
}