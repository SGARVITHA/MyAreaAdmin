import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { SafetyAlert } from '../data/mockData';
import { AlertTriangle, Plus, MapPin, Calendar } from 'lucide-react';

interface SafetyAlertsProps {
  alerts: SafetyAlert[];
  onCreateAlert: (alert: Omit<SafetyAlert, 'id'>) => void;
  onUpdateStatus: (id: string, status: SafetyAlert['status']) => void;
}

export function SafetyAlerts({ alerts, onCreateAlert, onUpdateStatus }: SafetyAlertsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Road Closure' as SafetyAlert['type'],
    message: '',
    affectedArea: '',
    priority: 'Medium' as SafetyAlert['priority'],
    status: 'Active' as SafetyAlert['status']
  });

  const handleSubmit = () => {
    onCreateAlert({
      ...formData,
      createdDate: new Date().toISOString().split('T')[0]
    });
    setFormData({
      type: 'Road Closure',
      message: '',
      affectedArea: '',
      priority: 'Medium',
      status: 'Active'
    });
    setShowCreateDialog(false);
  };

  const PriorityBadge = ({ priority }: { priority: string }) => {
    const variants: Record<string, string> = {
      Low: 'bg-blue-100 text-blue-700 border-blue-300',
      Medium: 'bg-amber-100 text-amber-700 border-amber-300',
      High: 'bg-red-100 text-red-700 border-red-300'
    };
    return <Badge className={variants[priority] || ''}>{priority} Priority</Badge>;
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      Active: 'bg-teal-100 text-teal-700 border-teal-300',
      Expired: 'bg-slate-100 text-slate-500 border-slate-300'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  const activeAlerts = alerts.filter(a => a.status === 'Active');
  const expiredAlerts = alerts.filter(a => a.status === 'Expired');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Safety & Infrastructure Alerts</h1>
          <p className="text-slate-600">Create and manage public safety notifications</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg mb-3 text-slate-900">Active Alerts ({activeAlerts.length})</h2>
          <div className="grid gap-4">
            {activeAlerts.length === 0 ? (
              <Card className="border-slate-300 p-8 text-center">
                <p className="text-slate-500">No active safety alerts</p>
              </Card>
            ) : (
              activeAlerts.map((alert) => (
                <Card key={alert.id} className={`border-2 ${alert.priority === 'High' ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className={`h-6 w-6 ${alert.priority === 'High' ? 'text-red-600' : 'text-teal-600'}`} />
                        <div>
                          <CardTitle className="text-xl text-slate-900">{alert.type}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <PriorityBadge priority={alert.priority} />
                            <StatusBadge status={alert.status} />
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateStatus(alert.id, 'Expired')}
                      >
                        Mark as Expired
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-slate-700">{alert.message}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{alert.affectedArea}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Created: {alert.createdDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {expiredAlerts.length > 0 && (
          <div>
            <h2 className="text-lg mb-3 text-slate-900">Expired Alerts ({expiredAlerts.length})</h2>
            <div className="grid gap-4">
              {expiredAlerts.map((alert) => (
                <Card key={alert.id} className="border-slate-300 bg-slate-50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-slate-400" />
                        <div>
                          <CardTitle className="text-xl text-slate-600">{alert.type}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <StatusBadge status={alert.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{alert.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Safety Alert</DialogTitle>
            <DialogDescription>Issue a new safety or infrastructure notification</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Alert Type</Label>
                <Select value={formData.type} onValueChange={(value: SafetyAlert['type']) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Road Closure">Road Closure</SelectItem>
                    <SelectItem value="Power Outage">Power Outage</SelectItem>
                    <SelectItem value="Water Supply">Water Supply</SelectItem>
                    <SelectItem value="Weather Warning">Weather Warning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value: SafetyAlert['priority']) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="message">Alert Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter alert message"
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="area">Affected Area</Label>
              <Input
                id="area"
                value={formData.affectedArea}
                onChange={(e) => setFormData({ ...formData, affectedArea: e.target.value })}
                placeholder="Enter affected area"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              Create Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}