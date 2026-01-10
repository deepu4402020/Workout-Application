import Navbar from '../../components/Navbar';

export default function MyPlansPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Plans</h1>
          <p className="text-gray-600">Your custom workout plans will appear here.</p>
        </div>
      </main>
    </div>
  );
}

