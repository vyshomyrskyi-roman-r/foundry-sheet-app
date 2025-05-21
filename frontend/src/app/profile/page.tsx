'use client';

import Link from 'next/link';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    fetch('/api/profile', {
      headers: {
        Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
      }
    })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => setUser(null));
  }, []);

  if (!user) return <p className="text-center p-8">Loading…</p>;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="nav_blok">
          <div>
            <Link href="/">
              <ArrowLeft className="w-8 h-8 text-white hover:opacity-80" />
            </Link>
          </div>

          <div>
            <Link href="/logout">
              <LogOut className="w-8 h-8 text-white hover:opacity-80" />
            </Link>
          </div>
        </div>
        <div className="bg-[#b49f84] p-8 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-32 h-32 rounded-full border-4 border-white" />
            <div className="text-white">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>E-mail:</strong> {user.email}
              </p>
              <Link href="/profile/edit">
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full">
                  Edit info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
