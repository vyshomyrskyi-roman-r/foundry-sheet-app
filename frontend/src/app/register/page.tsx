'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Registration failed');
        return;
      }
      setSuccess('Registration successful!');
      setForm({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      setError('Unexpected error');
    }
  };

  return (

    <div>
      <div className="absolute top-4 left-4">
        <Link href="/login">
          <ArrowLeft className="w-8 h-8 text-white hover:opacity-80" />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="relative mx-auto mt-24 w-full max-w-sm bg-[#b49f84] bg-opacity-90 p-8 rounded-[36px] space-y-4 backdrop-blur" style={{ marginTop: '300px' }}>
        <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <Input name="email" placeholder="E-mail" type="email" value={form.email} onChange={handleChange} />
        <Input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
        <Input name="confirmPassword" placeholder="Repeat password" type="password" value={form.confirmPassword} onChange={handleChange} />

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-200 text-center">{success}</p>}

        <Button type="submit">Register</Button>

        <p className="text-center text-white">
          <Link href="/login" className="underline hover:text-gray-200">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}
