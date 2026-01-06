import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SOSAlert } from '../data/mockData';
import { AlertTriangle, Phone, MapPin, Clock } from 'lucide-react';

interface SOSManagementProps {
  alerts: SOSAlert[];
  onUpdateStatus: (id: string, status: SOSAlert['status']) => void;
}

export function SOSManagement({ alerts, onUpdateStatus }: SOSManagementProps) {
  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      Active: 'bg-red-100 text-red-700 border-red-300',
      Acknowledged: 'bg-amber-100 text-amber-700 border-amber-300',
      Resolved: 'bg-green-100 text-green-700 border-green-300',
      Escalated: 'bg-purple-100 text-purple-700 border-purple-300'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-slate-900">SOS Alert Management</h1>
        <p className="text-slate-600">Monitor and respond to emergency alerts</p>
      </div>

      <div className="grid gap-4">
        {alerts.length === 0 ? (
          <Card className="border-slate-300 p-8 text-center">
            <p className="text-slate-500">No active SOS alerts</p>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card key={alert.id} className="border-red-300 bg-red-50">
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-600 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-slate-900">SOS Alert from {alert.citizenName}</h3>
                      <div className="text-sm text-slate-600">{alert.ward}</div>
                    </div>
                  </div>
                  <StatusBadge status={alert.status} />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{alert.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{alert.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{alert.emergencyContact}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onUpdateStatus(alert.id, 'Acknowledged')}
                    disabled={alert.status !== 'Active'}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Acknowledge
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onUpdateStatus(alert.id, 'Resolved')}
                    disabled={alert.status === 'Resolved'}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Mark Resolved
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onUpdateStatus(alert.id, 'Escalated')}
                    disabled={alert.status === 'Escalated' || alert.status === 'Resolved'}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Escalate
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
