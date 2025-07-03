'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ResetPassword() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Password reset successfully!')
      setTimeout(() => router.push('/login'), 1500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Update Password
        </button>
        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  )
}
