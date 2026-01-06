import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { HelpRequest } from '../data/mockData';
import { HelpCircle, MapPin, User, Calendar, CheckCircle, Clock } from 'lucide-react';

interface HelpRequestsProps {
  requests: HelpRequest[];
  onUpdateStatus: (id: string, status: HelpRequest['status']) => void;
}

export function HelpRequests({ requests, onUpdateStatus }: HelpRequestsProps) {
  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      Open: 'bg-amber-100 text-amber-700 border-amber-300',
      'In Progress': 'bg-blue-100 text-blue-700 border-blue-300',
      Closed: 'bg-teal-100 text-teal-700 border-teal-300'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-slate-900">Help Requests</h1>
        <p className="text-slate-600">Manage citizen help and service requests</p>
      </div>

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card className="border-slate-300 p-8 text-center">
            <p className="text-slate-500">No help requests</p>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="border-slate-300">
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <HelpCircle className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-slate-900">{request.type}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={request.status} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-slate-700">{request.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{request.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{request.citizenName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{request.submittedDate}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {request.status === 'Open' && (
                    <Button
                      size="sm"
                      onClick={() => onUpdateStatus(request.id, 'In Progress')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Start Processing
                    </Button>
                  )}
                  {request.status === 'In Progress' && (
                    <Button
                      size="sm"
                      onClick={() => onUpdateStatus(request.id, 'Closed')}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark as Closed
                    </Button>
                  )}
                  {request.status === 'Closed' && (
                    <Badge className="bg-teal-100 text-teal-700">Request Completed</Badge>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
