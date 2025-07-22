'use client';

import { FaUser, FaListOl, FaIdCard } from 'react-icons/fa'; // Icons import করলাম

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search by Name */}
      <div className="relative w-full">
        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search by Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="border border-gray-300 text-gray-800 rounded pl-12 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Search by Serial Number */}
      <div className="relative w-full">
        <FaListOl className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search by Serial No"
          value={filters.serialNumber}
          onChange={(e) => setFilters({ ...filters, serialNumber: e.target.value })}
          className="border border-gray-300 text-gray-800 rounded pl-12 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Search by Elector ID */}
      <div className="relative w-full">
        <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search by Elector ID"
          value={filters.electorId}
          onChange={(e) => setFilters({ ...filters, electorId: e.target.value })}
          className="border border-gray-300 text-gray-800 rounded pl-12 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
