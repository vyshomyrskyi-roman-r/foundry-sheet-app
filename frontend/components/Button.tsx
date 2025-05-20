'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  agre?: boolean;
  onClick?: () => void;
}



export default function Button({
  children,
  type = "button",
  agre = true,
  onClick,
}: ButtonProps) {
  if (agre) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="bg-green-600 hover:bg-green-700 text-white text-lg py-2 rounded-full"
        style={{ width: "-webkit-fill-available" }}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        onClick={onClick}
        className="bg-red-600 hover:bg-red-700 text-white text-lg py-2 rounded-full"
        style={{ width: "-webkit-fill-available" }}
      >
        {children}
      </button>
    );
  }
}
