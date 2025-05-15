'use client';
import React, { useState, ReactNode } from 'react';
import Button from './Button';

interface CounterButtonProps {
  children: ReactNode;
}

export default function CounterButton({ children }: CounterButtonProps) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div style={{width: '200px', margin: '10px'}}>
        <Button type="button" onClick={handleClick}>
            Count: {count} — {children}
        </Button>
    </div>
  );
}
