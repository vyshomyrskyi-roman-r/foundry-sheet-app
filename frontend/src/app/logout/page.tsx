'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Button from '../../../components/Button';

export default function LogoutConfirm() {
  const router = useRouter();

  const handleYes = useCallback(() => {
    // clear auth
    document.cookie = 'token=; Max-Age=0; path=/';
    localStorage.removeItem('token');
    router.replace('/login');
  }, [router]);

  return (
    <div className="relative min-h-screen">
      {/* back arrow */}
      <div className="absolute top-4 left-4">
        <Link href="/profile">
          <ArrowLeft className="w-8 h-8 text-white hover:opacity-80" />
        </Link>
      </div>

      {/* confirmation dialog */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className="bg-[#b49f84] bg-opacity-90 p-6 rounded-[36px] space-y-4 text-center backdrop-blur"
          style={{ maxWidth: "50%" }}
        >
          <p className="text-white">Are you sure you want to log out?</p>
          <div className="flex gap-4">
            <Button type="button" onClick={handleYes}>
              Yes
            </Button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-lg py-2 rounded-full transition"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}