import Image from "next/image";

export default function Home() {
  return (
   <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        🎰 Multi-Region Number Betting
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
        Bet on numbers from 0–99 across Nagaland, Manipur, and Meghalaya. 3 rounds daily.
        Big payouts. Instant UPI wallet. Admin-controlled results.
      </p>

      <div className="flex gap-6">
        <a
          href="/login"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl text-lg font-semibold transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 border border-yellow-500 hover:bg-yellow-500 hover:text-black text-white rounded-xl text-lg font-semibold transition"
        >
          Register
        </a>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} NumberBet.io | Built with Next.js + Supabase
      </footer>
    </main>
  );
}
