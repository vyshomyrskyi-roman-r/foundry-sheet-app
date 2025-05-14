'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button({ children, type = 'button', onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-2 rounded-full transition"
    >
      {children}
    </button>
  );
}
