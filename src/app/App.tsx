import { useState } from 'react';
import { Login2FA } from './components/Login2FA';
import { OverviewDashboard } from './components/OverviewDashboard';
import { CitizenVerification } from './components/CitizenVerification';
import { SOSManagement } from './components/SOSManagement';
import { NoticeManagement } from './components/NoticeManagement';
import { HelpRequests } from './components/HelpRequests';
import { VolunteerEvents } from './components/VolunteerEvents';
import { SafetyAlerts } from './components/SafetyAlerts';
import { PollManagement } from './components/PollManagement';
import { AdminProfile } from './components/AdminProfile';
import { AuditLogs } from './components/AuditLogs';
import { Button } from './components/ui/button';
import { 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard,
  Users,
  Bell,
  FileText,
  HelpCircle,
  HandHeart,
  AlertTriangle,
  BarChart3,
  Settings,
  FileCheck
} from 'lucide-react';
import {
  mockCitizens,
  mockSOSAlerts,
  mockNotices,
  mockHelpRequests,
  mockVolunteerEvents,
  mockSafetyAlerts,
  mockPolls,
  mockAdminLogs,
  Citizen,
  SOSAlert,
  Notice,
  HelpRequest,
  VolunteerEvent,
  SafetyAlert,
  Poll,
  AdminLog
} from './data/mockData';

type Page = 'dashboard' | 'verification' | 'sos' | 'notices' | 'help-requests' | 'volunteers' | 'safety-alerts' | 'polls' | 'profile' | 'audit';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State for mock data
  const [citizens, setCitizens] = useState<Citizen[]>(mockCitizens);
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>(mockSOSAlerts);
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(mockHelpRequests);
  const [volunteerEvents, setVolunteerEvents] = useState<VolunteerEvent[]>(mockVolunteerEvents);
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>(mockSafetyAlerts);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [adminLogs] = useState<AdminLog[]>(mockAdminLogs);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleUpdateCitizenStatus = (id: string, status: 'Approved' | 'Rejected', reason?: string) => {
    setCitizens(prev => prev.map(c => 
      c.id === id ? { ...c, status, rejectionReason: reason } : c
    ));
  };

  const handleUpdateSOSStatus = (id: string, status: SOSAlert['status']) => {
    setSosAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, status } : alert
    ));
  };

  const handleCreateNotice = (notice: Omit<Notice, 'id'>) => {
    setNotices(prev => [...prev, { ...notice, id: Date.now().toString() }]);
  };

  const handleUpdateNoticeStatus = (id: string, status: Notice['status']) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, status } : n));
  };

  const handleUpdateHelpRequestStatus = (id: string, status: HelpRequest['status']) => {
    setHelpRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleCreateVolunteerEvent = (event: Omit<VolunteerEvent, 'id' | 'registeredVolunteers'>) => {
    setVolunteerEvents(prev => [...prev, { ...event, id: Date.now().toString(), registeredVolunteers: 0 }]);
  };

  const handleCreateSafetyAlert = (alert: Omit<SafetyAlert, 'id'>) => {
    setSafetyAlerts(prev => [...prev, { ...alert, id: Date.now().toString() }]);
  };

  const handleUpdateSafetyAlertStatus = (id: string, status: SafetyAlert['status']) => {
    setSafetyAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleCreatePoll = (poll: Omit<Poll, 'id' | 'totalVotes'>) => {
    setPolls(prev => [...prev, { ...poll, id: Date.now().toString(), totalVotes: 0 }]);
  };

  const stats = {
    totalCitizens: citizens.length,
    pendingVerifications: citizens.filter(c => c.status === 'Pending').length,
    activeAlerts: safetyAlerts.filter(a => a.status === 'Active').length,
    sosAlerts: sosAlerts.filter(a => a.status === 'Active').length
  };

  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'verification' as Page, label: 'Citizen Verification', icon: Users },
    { id: 'notices' as Page, label: 'Notice Management', icon: FileText },
    { id: 'sos' as Page, label: 'SOS Alerts', icon: Bell },
    { id: 'help-requests' as Page, label: 'Help Requests', icon: HelpCircle },
    { id: 'volunteers' as Page, label: 'Volunteer Events', icon: HandHeart },
    { id: 'safety-alerts' as Page, label: 'Safety Alerts', icon: AlertTriangle },
    { id: 'polls' as Page, label: 'Community Polls', icon: BarChart3 },
    { id: 'profile' as Page, label: 'Admin Profile', icon: Settings },
    { id: 'audit' as Page, label: 'Audit Logs', icon: FileCheck }
  ];

  if (!isLoggedIn) {
    return <Login2FA onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-300 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-slate-900">MyArea Municipality</h1>
                <p className="text-xs text-slate-600">Ward 5 Administration</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <div className="text-sm text-slate-900">Admin User</div>
              <div className="text-xs text-slate-600">Ward Administrator</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-slate-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-300 transition-transform duration-200 overflow-y-auto`}
          style={{ top: '61px' }}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                    currentPage === item.id
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
            style={{ top: '61px' }}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {currentPage === 'dashboard' && (
            <OverviewDashboard 
              citizens={citizens}
              sosAlerts={sosAlerts}
              helpRequests={helpRequests}
              notices={notices}
              volunteerEvents={volunteerEvents}
              polls={polls}
              onNavigate={setCurrentPage}
            />
          )}
          {currentPage === 'verification' && (
            <CitizenVerification 
              citizens={citizens}
              onUpdateStatus={handleUpdateCitizenStatus}
            />
          )}
          {currentPage === 'notices' && (
            <NoticeManagement
              notices={notices}
              onCreateNotice={handleCreateNotice}
              onUpdateNotice={handleUpdateNoticeStatus}
            />
          )}
          {currentPage === 'sos' && (
            <SOSManagement 
              alerts={sosAlerts}
              onUpdateStatus={handleUpdateSOSStatus}
            />
          )}
          {currentPage === 'help-requests' && (
            <HelpRequests
              requests={helpRequests}
              onUpdateStatus={handleUpdateHelpRequestStatus}
            />
          )}
          {currentPage === 'volunteers' && (
            <VolunteerEvents
              events={volunteerEvents}
              onCreateEvent={handleCreateVolunteerEvent}
            />
          )}
          {currentPage === 'safety-alerts' && (
            <SafetyAlerts
              alerts={safetyAlerts}
              onCreateAlert={handleCreateSafetyAlert}
              onUpdateStatus={handleUpdateSafetyAlertStatus}
            />
          )}
          {currentPage === 'polls' && (
            <PollManagement
              polls={polls}
              onCreatePoll={handleCreatePoll}
            />
          )}
          {currentPage === 'profile' && <AdminProfile />}
          {currentPage === 'audit' && <AuditLogs logs={adminLogs} />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-300 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-slate-600">
              © 2026 MyArea Municipality Administration System | Government of India
            </p>
            <p className="text-xs text-slate-600">
              Powered by National e-Governance Division
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}