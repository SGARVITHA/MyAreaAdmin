import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Users, AlertTriangle, Bell, FileText } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalCitizens: number;
    pendingVerifications: number;
    activeAlerts: number;
    sosAlerts: number;
  };
  onNavigate: (page: string) => void;
}

export function Dashboard({ stats, onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome to MyArea Municipality Administration</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">Total Registered Citizens</CardTitle>
            <Users className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-slate-900">{stats.totalCitizens}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">Pending Verifications</CardTitle>
            <FileText className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-amber-600">{stats.pendingVerifications}</div>
          </CardContent>
        </Card>

        <Card className="border-slate-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-teal-600">{stats.activeAlerts}</div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-red-700">SOS Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-red-600">{stats.sosAlerts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-slate-300">
        <CardHeader>
          <CardTitle className="text-slate-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button 
              onClick={() => onNavigate('verification')}
              className="bg-teal-600 hover:bg-teal-700 h-auto py-4"
            >
              <div className="text-center">
                <Users className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Verify Citizens</div>
              </div>
            </Button>
            <Button 
              onClick={() => onNavigate('notices')}
              className="bg-teal-600 hover:bg-teal-700 h-auto py-4"
            >
              <div className="text-center">
                <FileText className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Post Notice</div>
              </div>
            </Button>
            <Button 
              onClick={() => onNavigate('safety-alerts')}
              className="bg-amber-600 hover:bg-amber-700 h-auto py-4"
            >
              <div className="text-center">
                <Bell className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">Create Alert</div>
              </div>
            </Button>
            <Button 
              onClick={() => onNavigate('sos')}
              className="bg-red-600 hover:bg-red-700 h-auto py-4"
            >
              <div className="text-center">
                <AlertTriangle className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm">View SOS</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}