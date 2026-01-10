import Navbar from './components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
              <div className="w-5 h-5 bg-purple-600 rounded"></div>
              <span className="text-sm text-gray-600 font-medium">Your Fitness Journey Starts Here</span>
            </div>

            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Your Personal Guide To <span className="text-purple-600">Fitness</span>
              </h1>
              <p className="text-lg text-gray-600">
                Explore customized exercises for your fitness level. Track progress, stay motivated, and build a stronger, healthier you.
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/exercises"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Browse Exercises →
              </Link>
              <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3 rounded-lg border-2 border-gray-300">
                Create Workout +
              </button>
            </div>
          </div>

          <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">💪</div>
              <p className="text-gray-500">Fitness Illustration</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
