import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';

const VALID_REGIONS = ['nagaland', 'manipur', 'meghalaya'];

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = params.region.toLowerCase();

  if (!VALID_REGIONS.includes(region)) {
    notFound(); // show 404
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen  py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center capitalize mb-8">
            {region} Betting Rounds
          </h1>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((round) => (
              <div
                key={round}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">Round {round}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Place your bets at least 15 minutes before the result time.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
                  Bet Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
