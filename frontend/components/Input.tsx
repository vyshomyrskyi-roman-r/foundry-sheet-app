'use client';
import React from 'react';

interface InputProps {
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ name, placeholder, type = 'text', value, onChange }: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 bg-[#f1ece1] rounded-full placeholder-gray-600 focus:outline-none text-black"
    />
  );
}
