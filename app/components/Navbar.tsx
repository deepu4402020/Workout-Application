import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-semibold">Eleweight</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-purple-600">Home</Link>
            <Link href="/exercises" className="text-sm font-medium text-gray-700 hover:text-purple-600">Exercises</Link>
            <Link href="/my-plans" className="text-sm font-medium text-gray-700 hover:text-purple-600">My Plans</Link>
            <Link href="/diet-plans" className="text-sm font-medium text-gray-700 hover:text-purple-600">Diet Plans</Link>
            <Link href="/find-gyms" className="text-sm font-medium text-gray-700 hover:text-purple-600">Find Gyms</Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Deepesh Yadav</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

