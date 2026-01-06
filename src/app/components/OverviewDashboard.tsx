import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Users, 
  UserCheck, 
  Bell, 
  HelpCircle, 
  FileText, 
  HandHeart, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Citizen, SOSAlert, HelpRequest } from '../data/mockData';

interface OverviewDashboardProps {
  citizens: Citizen[];
  sosAlerts: SOSAlert[];
  helpRequests: HelpRequest[];
  notices: any[];
  volunteerEvents: any[];
  polls: any[];
  onNavigate: (page: any) => void;
}

export function OverviewDashboard({
  citizens,
  sosAlerts,
  helpRequests,
  notices,
  volunteerEvents,
  polls,
  onNavigate
}: OverviewDashboardProps) {
  // Statistics
  const stats = {
    totalCitizens: citizens.length,
    pendingVerifications: citizens.filter(c => c.status === 'Pending').length,
    approvedCitizens: citizens.filter(c => c.status === 'Approved').length,
    activeSOS: sosAlerts.filter(a => a.status === 'Active').length,
    openHelpRequests: helpRequests.filter(r => r.status === 'Open').length,
    inProgressHelpRequests: helpRequests.filter(r => r.status === 'In Progress').length,
    publishedNotices: notices.filter(n => n.status === 'Published').length,
    activeVolunteerEvents: volunteerEvents.length,
    activePolls: polls.filter(p => p.status === 'Active').length
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    color,
    bgColor,
    onClick 
  }: any) => (
    <Card 
      className={`border-2 ${color} ${bgColor} cursor-pointer hover:shadow-lg transition-shadow`}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-1">{title}</p>
            <p className="text-4xl text-slate-900 mb-2">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 text-sm text-teal-700">
                <TrendingUp className="h-3 w-3" />
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-lg ${bgColor}`}>
            <Icon className="h-8 w-8 text-teal-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Ward 5 Overview</h1>
            <p className="text-teal-100 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Thiruvottiyur, Chennai - Municipality Administration
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-teal-100">Last Updated</p>
            <p className="text-lg">January 5, 2026 - 2:30 PM</p>
          </div>
        </div>
      </div>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Citizens"
          value={stats.totalCitizens}
          icon={Users}
          color="border-teal-300"
          bgColor="bg-teal-50"
          onClick={() => onNavigate('verification')}
        />
        <StatCard
          title="Pending Verifications"
          value={stats.pendingVerifications}
          icon={UserCheck}
          color="border-amber-300"
          bgColor="bg-amber-50"
          onClick={() => onNavigate('verification')}
        />
        <StatCard
          title="Active SOS Alerts"
          value={stats.activeSOS}
          icon={Bell}
          color="border-red-300"
          bgColor="bg-red-50"
          onClick={() => onNavigate('sos')}
        />
        <StatCard
          title="Help Requests"
          value={stats.openHelpRequests + stats.inProgressHelpRequests}
          icon={HelpCircle}
          color="border-blue-300"
          bgColor="bg-blue-50"
          onClick={() => onNavigate('help-requests')}
        />
      </div>

      {/* Secondary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-600" />
              Notices Published
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl text-slate-900">{stats.publishedNotices}</p>
              <Button size="sm" variant="outline" onClick={() => onNavigate('notices')}>
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HandHeart className="h-5 w-5 text-teal-600" />
              Volunteer Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl text-slate-900">{stats.activeVolunteerEvents}</p>
              <Button size="sm" variant="outline" onClick={() => onNavigate('volunteers')}>
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-teal-600" />
              Active Polls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl text-slate-900">{stats.activePolls}</p>
              <Button size="sm" variant="outline" onClick={() => onNavigate('polls')}>
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-slate-300">
          <CardHeader>
            <CardTitle className="text-slate-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.activeSOS > 0 && (
              <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{stats.activeSOS} Active SOS Alert(s)</p>
                  <p className="text-xs text-slate-600">Immediate attention required</p>
                </div>
                <Button size="sm" onClick={() => onNavigate('sos')} className="bg-red-600 hover:bg-red-700">
                  View
                </Button>
              </div>
            )}
            {stats.pendingVerifications > 0 && (
              <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{stats.pendingVerifications} Pending Verification(s)</p>
                  <p className="text-xs text-slate-600">Citizen registrations awaiting approval</p>
                </div>
                <Button size="sm" onClick={() => onNavigate('verification')} className="bg-amber-600 hover:bg-amber-700">
                  Review
                </Button>
              </div>
            )}
            {stats.openHelpRequests > 0 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{stats.openHelpRequests} Open Help Request(s)</p>
                  <p className="text-xs text-slate-600">Community issues reported</p>
                </div>
                <Button size="sm" onClick={() => onNavigate('help-requests')} className="bg-blue-600 hover:bg-blue-700">
                  Assign
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-slate-300">
          <CardHeader>
            <CardTitle className="text-slate-900">Ward 5 Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Citizen Approval Rate</span>
                <span className="text-sm text-teal-700">
                  {stats.totalCitizens > 0 
                    ? Math.round((stats.approvedCitizens / stats.totalCitizens) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-teal-600 h-2 rounded-full"
                  style={{ 
                    width: `${stats.totalCitizens > 0 
                      ? (stats.approvedCitizens / stats.totalCitizens) * 100
                      : 0}%` 
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Help Requests Resolution</span>
                <span className="text-sm text-teal-700">
                  {helpRequests.length > 0
                    ? Math.round((helpRequests.filter(r => r.status === 'Closed').length / helpRequests.length) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-teal-600 h-2 rounded-full"
                  style={{ 
                    width: `${helpRequests.length > 0
                      ? (helpRequests.filter(r => r.status === 'Closed').length / helpRequests.length) * 100
                      : 0}%` 
                  }}
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2 text-teal-700">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm">Ward 5 performing above average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ward Map Placeholder */}
      <Card className="border-slate-300">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-teal-600" />
            Ward 5 Map Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 rounded-lg p-12 text-center border-2 border-dashed border-slate-300">
            <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">Ward 5 Map - Thiruvottiyur</p>
            <p className="text-sm text-slate-500 mt-1">Interactive map showing key locations, SOS alerts, and service areas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}