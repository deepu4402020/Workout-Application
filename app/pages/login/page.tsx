import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 text-white p-12 items-end">
        <div>
          <h1 className="text-5xl font-bold mb-4">Welcome Back to Better Health</h1>
          <p className="text-lg text-gray-300">
            Continue your fitness journey with Eleweight&apos;s personalized tracking and insights.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-xl font-semibold">Elewei</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Sign In to Eleweight</h2>
          <p className="text-gray-600 mb-8">Enter your credentials to continue</p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Sign In →
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-purple-600 font-medium">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

