import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Citizen } from '../data/mockData';
import { Check, X, Eye, Wrench, User } from 'lucide-react';

interface CitizenVerificationProps {
  citizens: Citizen[];
  onUpdateStatus: (id: string, status: 'Approved' | 'Rejected', reason?: string) => void;
}

export function CitizenVerification({ citizens, onUpdateStatus }: CitizenVerificationProps) {
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const pendingCitizens = citizens.filter(c => c.status === 'Pending');
  const approvedCitizens = citizens.filter(c => c.status === 'Approved');
  const rejectedCitizens = citizens.filter(c => c.status === 'Rejected');

  const handleApprove = (id: string) => {
    onUpdateStatus(id, 'Approved');
    setSelectedCitizen(null);
  };

  const handleRejectClick = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = () => {
    if (selectedCitizen && rejectionReason) {
      onUpdateStatus(selectedCitizen.id, 'Rejected', rejectionReason);
      setShowRejectDialog(false);
      setSelectedCitizen(null);
      setRejectionReason('');
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      Pending: 'bg-amber-100 text-amber-700 border-amber-300',
      Approved: 'bg-green-100 text-green-700 border-green-300',
      Rejected: 'bg-red-100 text-red-700 border-red-300'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  const CitizenTable = ({ citizens, showActions = true }: { citizens: Citizen[]; showActions?: boolean }) => (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-3 text-slate-700">Citizen Name</th>
            <th className="text-left p-3 text-slate-700">Address</th>
            <th className="text-left p-3 text-slate-700">Phone</th>
            <th className="text-left p-3 text-slate-700">Email</th>
            <th className="text-left p-3 text-slate-700">Registration Date</th>
            <th className="text-left p-3 text-slate-700">Service Provider</th>
            <th className="text-left p-3 text-slate-700">Status</th>
            {showActions && <th className="text-left p-3 text-slate-700">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {citizens.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 8 : 7} className="text-center p-6 text-slate-500">
                No citizens found
              </td>
            </tr>
          ) : (
            citizens.map((citizen) => (
              <tr key={citizen.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {citizen.serviceProvided ? (
                      <Wrench className="h-4 w-4 text-teal-600" />
                    ) : (
                      <User className="h-4 w-4 text-slate-400" />
                    )}
                    <span className="text-slate-900">{citizen.name}</span>
                  </div>
                </td>
                <td className="p-3 text-slate-600">{citizen.address}</td>
                <td className="p-3 text-slate-600">{citizen.phone}</td>
                <td className="p-3 text-slate-600">{citizen.email}</td>
                <td className="p-3 text-slate-600">{citizen.registrationDate}</td>
                <td className="p-3">
                  {citizen.serviceProvided ? (
                    <div>
                      <div className="text-slate-900">{citizen.serviceType}</div>
                      <div className="text-sm text-slate-500">{citizen.businessName}</div>
                    </div>
                  ) : (
                    <span className="text-slate-400">No</span>
                  )}
                </td>
                <td className="p-3">
                  <StatusBadge status={citizen.status} />
                </td>
                {showActions && (
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedCitizen(citizen)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {citizen.status === 'Pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(citizen.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRejectClick(citizen)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-2">Citizen Verification</h1>
        <p className="text-teal-100">Review and approve citizen registrations and service provider applications</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-amber-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-700">Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-slate-900">{pendingCitizens.length}</p>
          </CardContent>
        </Card>
        <Card className="border-green-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-700">Approved Citizens</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-slate-900">{approvedCitizens.length}</p>
          </CardContent>
        </Card>
        <Card className="border-teal-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-slate-700">Service Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-slate-900">
              {citizens.filter(c => c.serviceProvided && c.status === 'Approved').length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="pending">
            Pending ({pendingCitizens.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedCitizens.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedCitizens.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <CitizenTable citizens={pendingCitizens} />
        </TabsContent>
        <TabsContent value="approved" className="mt-4">
          <CitizenTable citizens={approvedCitizens} showActions={false} />
        </TabsContent>
        <TabsContent value="rejected" className="mt-4">
          <CitizenTable citizens={rejectedCitizens} showActions={false} />
        </TabsContent>
      </Tabs>

      {/* View Profile Dialog */}
      {selectedCitizen && !showRejectDialog && (
        <Dialog open={!!selectedCitizen} onOpenChange={() => setSelectedCitizen(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Citizen Profile</DialogTitle>
              <DialogDescription>Review citizen details and verification documents</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Profile Photo Placeholder */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                  {selectedCitizen.serviceProvided ? (
                    <Wrench className="h-12 w-12 text-slate-400" />
                  ) : (
                    <User className="h-12 w-12 text-slate-400" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-600">Name</Label>
                  <p className="text-slate-900">{selectedCitizen.name}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Ward</Label>
                  <p className="text-slate-900">{selectedCitizen.ward}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Phone</Label>
                  <p className="text-slate-900">{selectedCitizen.phone}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Email</Label>
                  <p className="text-slate-900">{selectedCitizen.email}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-600">Address</Label>
                  <p className="text-slate-900">{selectedCitizen.address}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Registration Date</Label>
                  <p className="text-slate-900">{selectedCitizen.registrationDate}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Status</Label>
                  <div className="mt-1">
                    <StatusBadge status={selectedCitizen.status} />
                  </div>
                </div>
              </div>

              {/* Service Provider Information */}
              {selectedCitizen.serviceProvided && (
                <div className="border-t border-slate-200 pt-4">
                  <h3 className="text-lg text-slate-900 mb-3 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-teal-600" />
                    Service Provider Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-600">Service Type</Label>
                      <p className="text-slate-900">{selectedCitizen.serviceType}</p>
                    </div>
                    <div>
                      <Label className="text-slate-600">Business Name</Label>
                      <p className="text-slate-900">{selectedCitizen.businessName}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Usage Stats */}
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-lg text-slate-900 mb-3">Service Usage</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600">Past Requests</Label>
                    <p className="text-slate-900">{selectedCitizen.pastRequests || 0}</p>
                  </div>
                </div>
              </div>

              {/* Rejection Reason if applicable */}
              {selectedCitizen.status === 'Rejected' && selectedCitizen.rejectionReason && (
                <div className="border-t border-red-200 pt-4 bg-red-50 p-4 rounded-lg">
                  <Label className="text-red-700">Rejection Reason</Label>
                  <p className="text-red-900 mt-1">{selectedCitizen.rejectionReason}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCitizen(null)}>
                Close
              </Button>
              {selectedCitizen.status === 'Pending' && (
                <>
                  <Button
                    onClick={() => handleApprove(selectedCitizen.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      setShowRejectDialog(true);
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Citizen Registration</DialogTitle>
            <DialogDescription>Please provide a reason for rejection</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRejectConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={!rejectionReason}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
