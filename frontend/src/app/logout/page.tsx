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

  const handleNo = useCallback(() => {
    router.push("/profile");
  }, [router]);

  return (
    <div className="relative min-h-screen">
      {/* confirmation dialog */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {/* back arrow */}
        <div className="absolute top-4 left-4">
          <Link href="/profile">
            <ArrowLeft className="w-8 h-8 text-white hover:opacity-80" />
          </Link>
        </div>
        <div className="bg-[#b49f84] bg-opacity-90 p-6 rounded-[36px] space-y-4 text-center backdrop-blur">
          <p className="text-white">Are you sure you want to log out?</p>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-evenly",
              gap: "5px",
            }}
          >
            <Button type="button" onClick={handleYes}>
              Yes
            </Button>
            <Button type="button" agre={false} onClick={handleNo}>
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}