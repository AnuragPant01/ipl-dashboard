import Header from "../components/common/Header";
import PointsTable from "../components/tables/PointsTable";
import { useIPLData } from "../hooks/useIPLData";

export default function PointsTablePage() {
  const { data, loading, error } = useIPLData(null);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="p-8 text-center text-white">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="p-8 text-center text-red-600">Error: {error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Page Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            Points Table
          </h1>
          <p className="text-gray-400">
            Current standings and team performance
          </p>
        </div>

        {/* Points Table Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              IPL 2025 Standings
            </h2>
            <p className="text-gray-600">Top 4 teams qualify for playoffs</p>
          </div>

          {data?.pointsTable && <PointsTable teams={data.pointsTable} />}
        </section>

        {/* Playoff Race & Key Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Playoff Race</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-semibold text-green-800">Qualified</span>
                <span className="text-sm text-green-600">Top 4 teams</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="font-semibold text-yellow-800">In Contention</span>
                <span className="text-sm text-yellow-600">5th-8th position</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="font-semibold text-red-800">Eliminated</span>
                <span className="text-sm text-red-600">Bottom 2 teams</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Stats</h3>
            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span>Total Teams:</span>
                <span className="font-semibold">10</span>
              </div>
              <div className="flex justify-between">
                <span>Matches Played:</span>
                <span className="font-semibold">70</span>
              </div>
              <div className="flex justify-between">
                <span>Playoff Spots:</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex justify-between">
                <span>Season:</span>
                <span className="font-semibold">2025</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
