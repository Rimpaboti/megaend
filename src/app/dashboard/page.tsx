'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error.message);
      router.push('/login'); // Redirect if not authenticated
      return;
    }
    if (user) setUserEmail(user.email ?? '');
  };
  getUser();
}, []);

  const handleRegionClick = (region: string) => {
    router.push(`/dashboard/${region}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const regions = ['nagaland', 'manipur', 'meghalaya'];

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {userEmail}</h2>
        <h2 className="text-lg font-semibold mb-2">Select a Region to Bet:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionClick(region)}
              className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition"
            >
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={handleLogout} className="mt-6 btn btn-error">
          Logout
        </button>
      </div>
    </>
  );
}
