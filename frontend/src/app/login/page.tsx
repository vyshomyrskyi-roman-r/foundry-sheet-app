'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface LoginForm {
  usernameOrEmail: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      console.log('login status:', res.status);
      const data = await res.json();
      console.log('login body:', data);

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      Cookies.set('token', data.token, { expires: 1, path: '/' });
      console.log("token set, navigating…");
      await router.push('/');
    } catch (err) {
      console.error('unexpected error:', err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="relative log_in">
      <div className="bak_arrow">
        <Link href="/register">
          <ArrowLeft className="w-8 h-8 text-white hover:opacity-80" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="main_blok"
        style={{ marginTop: "300px" }}
      >
        <Input
          name="usernameOrEmail"
          placeholder="Login or email"
          value={form.usernameOrEmail}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Button type="submit">Log in</Button>

        <p className="text-center text-white" style={{ marginTop: "-20px" }}>
          or you can{" "}
          <Link href="/register" className="underline hover:text-gray-200">
            register
          </Link>
        </p>
      </form>
    </div>
  );
}
