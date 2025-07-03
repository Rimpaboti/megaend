'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    setError(loginError.message);
    return;
  }

  const user = authData.user;
  if (!user) {
    setError('Login failed: No user returned.');
    return;
  }

  // 1. Fetch is_admin from profiles table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
    console.log(profile)

  if (profileError || profile?.is_admin === undefined) {
    setError('Failed to fetch user profile.');
    return;
  }

  // 2. Update user_metadata with is_admin
  const { error: updateError } = await supabase.auth.updateUser({
    data: { is_admin: profile.is_admin },
  });

  if (updateError) {
    setError('Failed to update user metadata.');
    return;
  }

  // 3. Redirect
  if (profile.is_admin) {
    router.push('/admin');
  } else {
    router.push('/dashboard');
  }
};

  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input input-bordered w-full"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
        <p className="text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
        <p className="text-sm text-right">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
}
