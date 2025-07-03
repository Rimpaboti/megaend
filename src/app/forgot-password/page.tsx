'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClientComponentClient()

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`,
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Check your email for reset link.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Send Reset Link
        </button>
        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  )
}
