"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Check, Minus } from "lucide-react";

const plans = [
  {
    badge: "Starter",
    name: "Essentials",
    desc: "Perfect for solo trainers getting started with AI tools.",
    monthly: 19,
    annual: 14,
    features: [
      { text: "1 AI trainer profile", included: true },
      { text: "Up to 10 clients", included: true },
      { text: "Smart workout builder", included: true },
      { text: "Progress analytics", included: true },
      { text: "Custom branding", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get started free",
    featured: false,
  },
  {
    badge: "Pro",
    name: "Studio",
    desc: "Built for growing coaching businesses and small studios.",
    monthly: 49,
    annual: 37,
    features: [
      { text: "3 AI trainer profiles", included: true },
      { text: "Unlimited clients", included: true },
      { text: "Smart workout builder", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: false },
    ],
    cta: "Start 14-day free trial",
    featured: true,
    popular: true,
  },
  {
    badge: "Elite",
    name: "Scale",
    desc: "For established platforms and multi-location gyms.",
    monthly: 99,
    annual: 74,
    features: [
      { text: "10 AI trainer profiles", included: true },
      { text: "Unlimited clients", included: true },
      { text: "Smart workout builder", included: true },
      { text: "Full analytics suite", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
    ],
    cta: "Get started free",
    featured: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');`}</style>
      <div
        className="min-h-screen bg-[#f8f7f4] flex flex-col"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Navbar />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-700 tracking-wide uppercase mb-4">
              Pricing
            </span>
            <h1
              className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.05] mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              Train smarter,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-violet-500">
                grow faster
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Simple, transparent pricing for every stage of your fitness journey.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-10">
            <span
              className={`text-sm font-medium ${annual ? "text-gray-400" : "text-gray-900"}`}
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnual((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                annual ? "bg-purple-600" : "bg-gray-200"
              }`}
              aria-label="Toggle billing period"
              aria-pressed={annual}
            >
              <span
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200"
                style={{ left: annual ? "22px" : "4px" }}
              />
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-2 ${annual ? "text-gray-900" : "text-gray-400"}`}
            >
              Annual
              <span className="text-[10px] font-semibold uppercase tracking-wide text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
                Save 25%
              </span>
            </span>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 flex flex-col border transition-shadow ${
                  plan.featured
                    ? "border-purple-200 bg-linear-to-b from-purple-50/80 to-white shadow-[0_4px_24px_rgba(139,92,246,0.15)] sm:scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-purple-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-600 text-white whitespace-nowrap shadow-md">
                    Most popular
                  </div>
                )}

                <span className="inline-flex w-fit text-[10px] font-semibold uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full mb-3">
                  {plan.badge}
                </span>

                <p
                  className="text-2xl font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
                >
                  {plan.name}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{plan.desc}</p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-sm text-gray-500 self-start mt-1">$</span>
                  <span
                    className="text-4xl font-bold text-gray-900 tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-sm text-gray-500">/mo</span>
                </div>
                <p className="text-xs text-gray-400 mb-5">
                  {annual ? `$${plan.annual * 12} billed annually` : "Billed monthly"}
                </p>

                <hr className="border-gray-100 mb-5" />

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.included ? (
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-purple-600" strokeWidth={2.5} />
                        </span>
                      ) : (
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <Minus className="w-3 h-3 text-gray-400" strokeWidth={2} />
                        </span>
                      )}
                      <span
                        className={`text-sm leading-snug ${f.included ? "text-gray-700" : "text-gray-400"}`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.featured
                      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_4px_24px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_32px_rgba(139,92,246,0.45)]"
                      : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:border-purple-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Enterprise
              </p>
              <p
                className="text-xl font-bold text-gray-900 mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
              >
                Custom plan
              </p>
              <p className="text-sm text-gray-500">
                Unlimited profiles, white-label, SLA &amp; dedicated support.
              </p>
            </div>
            <Link
              href="/register"
              className="shrink-0 inline-flex justify-center text-sm font-semibold px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:border-purple-200 transition-colors"
            >
              Talk to sales
            </Link>
          </div>

          <div className="text-center mt-10 space-y-2 max-w-lg mx-auto">
            <p className="text-sm text-gray-500">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="text-sm text-gray-500">
              Questions?{" "}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Read our FAQ
              </a>{" "}
              or{" "}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                chat with us
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
