"use client";

import { useState, useEffect } from "react";
import FilterBar from "@/components/FilterBar";
import SummaryCard from "@/components/SummaryCard";
import DetailCard from "@/components/DetailCard";
import electoralData from "@/data/electoral.json";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaHome,
  FaSchool,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShieldAlt,
  FaBuilding,
  FaCity,
} from "react-icons/fa";

const COLORS = ["#3498db", "#e74c3c"]; // Blue for Male, Red for Female

export default function HomePage() {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    serialNumber: "",
    electorId: "",
  });

  const netVoters = voters.length;
  const pollingDetails =
    electoralData["2_Details of part and polling area"] || {};

  useEffect(() => {
    if (electoralData && electoralData["4_NUMBER OF ELECTORS"]) {
      const allVoters = electoralData.electors || [];
      setVoters(allVoters);
      setFilteredVoters(allVoters);
    }
  }, []);

  useEffect(() => {
    const temp = voters.filter((voter) => {
      const nameMatch = (voter.name || "")
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const serialMatch = (voter.serialNumber || "")
        .toString()
        .includes(filters.serialNumber);
      const electorIdMatch = (voter.electorId || "")
        .toLowerCase()
        .includes(filters.electorId.toLowerCase());
      return nameMatch && serialMatch && electorIdMatch;
    });
    setFilteredVoters(temp);
  }, [filters, voters]);

  // Gender Count for Chart
  // No voters array needed now
  const maleCount = Number(
    electoralData["4_NUMBER OF ELECTORS"]["Net Electors"]["Male"] || 0
  );
  const femaleCount = Number(
    electoralData["4_NUMBER OF ELECTORS"]["Net Electors"]["Female"] || 0
  );

  const genderData = [
    { name: "Male", value: maleCount },
    { name: "Female", value: femaleCount },
  ];

  return (
    <div className="flex justify-center bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-8">
      <div className="w-11/12">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Polling Area Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            icon={<FaUsers />}
            title="Total Voters"
            value={netVoters}
            color="blue"
          />
          <SummaryCard
            icon={<FaHome />}
            title="Village"
            value={pollingDetails["Main Town or Village"]}
            color="green"
          />
          <SummaryCard
            icon={<FaSchool />}
            title="Polling Station"
            value={pollingDetails["Polling Station"]}
            color="yellow"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
  <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Voters Gender Distribution</h2>
  <div className="flex justify-center w-full h-60">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={genderData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          label
        >
          {genderData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={['#3498db', '#e74c3c'][index % 2]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={30} />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>


        {/* Extra Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <DetailCard
            icon={<FaEnvelope />}
            title="Post Office"
            value={pollingDetails["Post Office"]}
          />
          <DetailCard
            icon={<FaShieldAlt />}
            title="Police Station"
            value={pollingDetails["Police Station"]}
          />
          <DetailCard
            icon={<FaBuilding />}
            title="Panchayat"
            value={pollingDetails["Panchayat"]}
          />
          <DetailCard
            icon={<FaBuilding />}
            title="Block"
            value={pollingDetails["Block"]}
          />
          <DetailCard
            icon={<FaBuilding />}
            title="Tehsil"
            value={pollingDetails["Tehsil"]}
          />
          <DetailCard
            icon={<FaBuilding />}
            title="Subdivision"
            value={pollingDetails["Subdivision"]}
          />
          <DetailCard
            icon={<FaCity />}
            title="District"
            value={pollingDetails["District"]}
          />
          <DetailCard
            icon={<FaMapMarkerAlt />}
            title="PIN Code"
            value={pollingDetails["Pin code"]}
          />
        </div>

        {/* Filter Inputs */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Voter List Table */}
        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2 border">Sr. No.</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">House No</th>
                <th className="p-2 border">Elector ID</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Age</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredVoters.length > 0 ? (
                filteredVoters.map((voter, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-sky-700 hover:text-white transition"
                  >
                    <td className="p-2 border">{voter.serialNumber}</td>
                    <td className="p-2 border">{voter.name}</td>
                    <td className="p-2 border">{voter.houseNumber}</td>
                    <td className="p-2 border">{voter.electorId}</td>
                    <td className="p-2 border">{voter.gender}</td>
                    <td className="p-2 border">{voter.age}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-600">
                    No voters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
