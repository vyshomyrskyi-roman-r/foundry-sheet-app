'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function JoinPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!code) return setError('Please enter a code');
    //TODO: Implement join logic
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Enter code</h2>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Join code" className="w-full border p-2 mb-4"/>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button onClick={handleJoin} className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
        Join
      </button>
      <p className="mt-4 text-center">
        Back to{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}