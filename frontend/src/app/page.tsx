'use client'

import ProtectedRoute from '../../components/ProtectedRoute'
import ProfileIcon     from '../../components/ProfileIcon'
import GameCard        from '../../components/GameCard'
import CounterButton from "../../components/CounterButton";
import Link from "next/link";

export default function HomePage() {
  const games = [
    { id: 1, title: "Name of game" },
    { id: 2, title: "Name of game" },
    { id: 3, title: "Name of game" },
  ];

  return (
    <ProtectedRoute>
      <main className="relative flex flex-col items-center justify-center min-h-screen">
        <ProfileIcon />

        <div className="flex space-x-8">
          {games.map((g) => (
            <GameCard
              key={g.id}
              title={g.title}
              action={
                <Link
                  href={`/join/${g.id}`}
                  className="inline-block bg-[rgba(180,159,132,1)] text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Join +
                </Link>
              }
            />
          ))}
        </div>

        <Link
          href="/join"
          className="absolute bottom-8 right-8 inline-block bg-[rgba(180,159,132,1)] text-white px-8 py-4 rounded-2xl text-2xl hover:opacity-90"
        >
          Join +
        </Link>
        <CounterButton>counter </CounterButton>
      </main>
    </ProtectedRoute>
  );
}
