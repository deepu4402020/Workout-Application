import Navbar from '../components/Navbar';

export default function FoodAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Food Analysis with AI</h1>
          <p className="text-lg text-gray-600">
            Take a picture of your food or upload an image to get instant nutritional information
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-purple-400">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📷</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Take a Photo</h3>
                <p className="text-gray-600">Use your camera to capture food</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-purple-400">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📤</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Upload Image</h3>
                <p className="text-gray-600">Select a photo from your device</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="bg-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-purple-600 font-bold text-xs">E</span>
              </div>
              <span className="font-semibold">AI Gym Trainer</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700 mb-4">
              Welcome to your AI Gym Trainer! Ask me anything about workouts or exercise technique.
            </p>
            <div className="space-y-2 mb-4">
              <button className="w-full text-left bg-purple-50 text-purple-700 text-sm px-4 py-2 rounded-lg">
                How do I perform a proper squat?
              </button>
              <button className="w-full text-left bg-purple-50 text-purple-700 text-sm px-4 py-2 rounded-lg">
                What&apos;s a good beginner workout routine?
              </button>
            </div>
            <input
              type="text"
              placeholder="Ask about fitness..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

