import { useState, useEffect } from 'react';

function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://clever-frogs-f2483126a1.strapiapp.com/admin/';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Preparing Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Getting everything ready for you...
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <div className="h-5 w-full bg-gray-200 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500">Loading admin interface</p>
        </div>
        <div className="mt-6 text-sm text-center text-gray-500">
          <p>Just a moment while we prepare your admin dashboard</p>
          <p className="mt-2">This might take a few seconds...</p>
        </div>
        <div className="mt-6 text-sm text-center text-gray-500">
          <p>Fun fact: Did you know?</p>
          <p className="mt-1" id="funFact">
            A group of frogs is called an army!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
