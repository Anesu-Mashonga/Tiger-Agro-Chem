function AdminPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center bg-white rounded-3xl shadow-xl p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Panel</h1>
        <p className="text-lg text-gray-600 mb-8">
          This area is reserved for administrators. The React application is
          ready and the UI has been preserved.
        </p>
        <div className="inline-flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 px-6 py-3 font-semibold">
          Under development
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
