'use client';

export default function SummaryCard({ icon, title, value, color }) {
  const colorClass = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    yellow: 'text-yellow-600',
  }[color];

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center min-h-[120px]">
      <div className={`text-3xl ${colorClass} mb-1`}>{icon}</div>
      <h2 className="text-sm font-semibold text-gray-600 mb-1">{title}</h2>
      <p className={`text-xl font-bold ${colorClass}`}>{value || 'N/A'}</p>
    </div>
  );
}
