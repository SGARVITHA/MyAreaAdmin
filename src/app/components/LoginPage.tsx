import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login - in real app would validate credentials
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-slate-300">
        <CardHeader className="space-y-1 text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl">MyArea Admin Portal</CardTitle>
          <CardDescription className="text-base">
            Municipality Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Official Email ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@municipality.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-slate-300"
              />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Login
            </Button>
            <p className="text-xs text-center text-slate-600 mt-4">
              ⚠️ Authorized Municipality Officials Only
            </p>
          </form>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-center w-full">
        <p className="text-xs text-slate-500">
          © 2026 Municipality Administration System | Government of India
        </p>
        <p className="text-xs text-slate-500 mt-1">
          For official use only. Unauthorized access is prohibited.
        </p>
      </footer>
    </div>
  );
}