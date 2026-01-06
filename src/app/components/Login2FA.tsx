import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, Mail, Smartphone, ArrowLeft } from 'lucide-react';

interface Login2FAProps {
  onLogin: () => void;
}

type Stage = 'credentials' | 'otp' | 'verified';

export function Login2FA({ onLogin }: Login2FAProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState<Stage>('credentials');
  const [otpMethod, setOtpMethod] = useState<'email' | 'sms'>('email');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock credential validation
    if (email && password) {
      setStage('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP validation
    if (otp === '123456') {
      setStage('verified');
      setTimeout(() => {
        onLogin();
      }, 1500);
    } else {
      alert('Invalid OTP. Use 123456 for demo.');
    }
  };

  const handleResendOTP = () => {
    alert(`OTP resent to your ${otpMethod === 'email' ? 'email' : 'mobile'}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md border-2 border-slate-300 shadow-xl">
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
            Ward 5, Thiruvottiyur - Municipality Administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stage === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
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
                Continue to 2FA
              </Button>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-amber-800 text-center">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Two-Factor Authentication Required
                </p>
              </div>
            </form>
          )}

          {stage === 'otp' && (
            <div className="space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStage('credentials')}
                className="mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  <p className="text-sm text-teal-900">Two-Factor Authentication</p>
                </div>
                <p className="text-xs text-teal-700">
                  We've sent a 6-digit OTP to your registered {otpMethod === 'email' ? 'email' : 'mobile number'}
                </p>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant={otpMethod === 'email' ? 'default' : 'outline'}
                  className={`flex-1 ${otpMethod === 'email' ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                  onClick={() => setOtpMethod('email')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant={otpMethod === 'sms' ? 'default' : 'outline'}
                  className={`flex-1 ${otpMethod === 'sms' ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                  onClick={() => setOtpMethod('sms')}
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  SMS
                </Button>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    className="border-slate-300 text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-slate-500 text-center">Demo OTP: 123456</p>
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                  Verify OTP
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </Button>
              </form>
            </div>
          )}

          {stage === 'verified' && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg text-slate-900 mb-2">Authentication Successful</h3>
              <p className="text-slate-600">Logging you in...</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-center text-slate-600">
              Authorized Municipality Officials Only
            </p>
          </div>
        </CardContent>
      </Card>

      <footer className="absolute bottom-4 text-center w-full">
        <p className="text-xs text-slate-600">
          © 2026 Municipality Administration System | Government of India
        </p>
        <p className="text-xs text-slate-500 mt-1">
          For official use only. Unauthorized access is prohibited.
        </p>
      </footer>
    </div>
  );
}
