'use client';

export default function DetailCard({ icon, title, value }) {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 flex items-center hover:shadow-md transition">
      <div className="text-blue-600 text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-md font-semibold text-gray-600">{title}</h3>
        <p className="text-lg font-bold text-gray-800">{value || 'N/A'}</p>
      </div>
    </div>
  );
}
