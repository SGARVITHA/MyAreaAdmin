import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Building2, MapPin, Key } from 'lucide-react';

export function AdminProfile() {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handlePasswordChange = () => {
    // Mock password change
    alert('Password changed successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
    setIsEditingPassword(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-slate-900">Admin Profile & Settings</h1>
        <p className="text-slate-600">Manage your account settings</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-slate-300">
          <CardHeader>
            <CardTitle className="text-slate-900">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <User className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm text-slate-600">Admin Name</p>
                <p className="text-slate-900">Admin User</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Mail className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="text-slate-900">admin@municipality.gov.in</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Building2 className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm text-slate-600">Role</p>
                <p className="text-slate-900">Ward Administrator</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <MapPin className="h-5 w-5 text-teal-600" />
              <div>
                <p className="text-sm text-slate-600">Assigned Ward</p>
                <p className="text-slate-900">Ward 5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-300">
          <CardHeader>
            <CardTitle className="text-slate-900">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEditingPassword ? (
              <div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg mb-4">
                  <Key className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-slate-600">Password</p>
                    <p className="text-slate-900">••••••••</p>
                  </div>
                </div>
                <Button onClick={() => setIsEditingPassword(true)} className="w-full bg-teal-600 hover:bg-teal-700">
                  Change Password
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditingPassword(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handlePasswordChange} className="flex-1 bg-teal-600 hover:bg-teal-700">
                    Update Password
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-300">
        <CardHeader>
          <CardTitle className="text-slate-900">System Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Input id="language" value="English" disabled className="mt-1 bg-slate-50" />
            </div>
            <div>
              <Label htmlFor="timezone">Time Zone</Label>
              <Input id="timezone" value="IST (GMT+5:30)" disabled className="mt-1 bg-slate-50" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
