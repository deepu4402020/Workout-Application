# Eleweight: AI-Powered Biomechanics & Fitness Platform

An enterprise-grade, full-stack fitness application engineered to serve as a comprehensive virtual personal trainer. The platform leverages advanced in-browser Computer Vision (Google MediaPipe) for real-time postural form validation and repetition tracking. Powered by Next.js and MongoDB, it integrates LLMs (OpenAI/Gemini) to dynamically generate personalized diet routines and workout plans, packaged within a premium, highly responsive user interface built with Tailwind CSS and Framer Motion.

## 🚀 Key Technical Features

- **Real-Time AI Form Validation:** Utilizes Google MediaPipe Pose detection directly in the browser for sub-second, highly privacy-conscious biomechanical feedback and rep counting. No server-side image processing.
- **Generative AI Integration:** Leverages OpenAI and Google Generative AI to dynamically synthesize personalized workout plans and analyze nutritional data.
- **Robust Full-Stack Authentication:** Implements secure JWT/Bcrypt custom authentication tailored via Next.js Server Components.
- **Complex Data Architecture:** Robust MongoDB/Mongoose schemas managing structured workouts, exercises, scheduling, and user progression logs.
- **Fluid & Premium UI/UX:** Built with standard Next.js App Router, Tailwind CSS v4, and Framer Motion for a sleek, dark/light compatible, highly animated user experience.
- **Geolocation Services:** Features a built-in gym finder utilizing location data APIs.

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Directory, Server Actions)
- **Frontend:** [React 19](https://react.dev/), TypeScript, [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Computer Vision:** [MediaPipe Pose](https://developers.google.com/mediapipe) & `react-webcam`
- **AI / LLMs:** `@google/generative-ai`, `openai`
- **Database:** MongoDB, Mongoose
- **Auth:** Custom JWT & bcrypt-based authentication flow

## 🏃‍♂️ Getting Started

First, clone the repository and install dependencies:

```bash
npm install
```

### Environment Variables

Ensure you create a `.env` or `.env.local` file at the root of the project to store your secret keys:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret

# AI Providers
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### Run the Development Server

Start up the local development instance:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the project by modifying `app/page.tsx`.

## 📁 Project Architecture

- `/app` - Next.js App Router pages, layouts, and Server API endpoints (`/app/api`).
- `/components` - Reusable React components (UI forms, navigation, layout wrappers).
- `/models` - Mongoose schemas (Workout Plans, User Profiles, Logs).
- `/app/(protected)` (e.g. `/form-validation`, `/workout-plans`, `/diet-plans`) - Core application features guarded by server-side runtime authentication.

---
*Built as a high-impact technical portfolio project demonstrating systems engineering, applied AI, and modern web optimization.*
