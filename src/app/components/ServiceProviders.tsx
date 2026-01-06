import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ServiceProvider } from '../data/mockData';
import { Wrench, Phone, MapPin, Check, X } from 'lucide-react';

interface ServiceProvidersProps {
  providers: ServiceProvider[];
  onUpdateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
}

export function ServiceProviders({ providers, onUpdateStatus }: ServiceProvidersProps) {
  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      Pending: 'bg-amber-100 text-amber-700 border-amber-300',
      Approved: 'bg-teal-100 text-teal-700 border-teal-300',
      Rejected: 'bg-red-100 text-red-700 border-red-300'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const variants: Record<string, string> = {
      Plumber: 'bg-blue-100 text-blue-700',
      Electrician: 'bg-amber-100 text-amber-700',
      Medical: 'bg-red-100 text-red-700',
      Others: 'bg-slate-100 text-slate-700'
    };
    return <Badge className={variants[category] || ''}>{category}</Badge>;
  };

  const pendingProviders = providers.filter(p => p.status === 'Pending');
  const approvedProviders = providers.filter(p => p.status === 'Approved');
  const rejectedProviders = providers.filter(p => p.status === 'Rejected');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-slate-900">Service Provider Management</h1>
        <p className="text-slate-600">Review and approve service provider registrations</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="pending">Pending ({pendingProviders.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedProviders.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedProviders.length})</TabsTrigger>
        </TabsList>

        {[
          { value: 'pending', data: pendingProviders, showActions: true },
          { value: 'approved', data: approvedProviders, showActions: false },
          { value: 'rejected', data: rejectedProviders, showActions: false }
        ].map(({ value, data, showActions }) => (
          <TabsContent key={value} value={value} className="mt-4">
            <div className="grid gap-4">
              {data.length === 0 ? (
                <Card className="border-slate-300 p-8 text-center">
                  <p className="text-slate-500">No {value} service providers</p>
                </Card>
              ) : (
                data.map((provider) => (
                  <Card key={provider.id} className="border-slate-300">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-teal-100 rounded-lg">
                            <Wrench className="h-6 w-6 text-teal-600" />
                          </div>
                          <div>
                            <h3 className="text-lg text-slate-900">{provider.businessName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <CategoryBadge category={provider.category} />
                              <StatusBadge status={provider.status} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="h-4 w-4 text-teal-600" />
                          <span className="text-sm">{provider.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <MapPin className="h-4 w-4 text-teal-600" />
                          <span className="text-sm">{provider.location}</span>
                        </div>
                      </div>

                      {showActions && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => onUpdateStatus(provider.id, 'Approved')}
                            className="bg-teal-600 hover:bg-teal-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onUpdateStatus(provider.id, 'Rejected')}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
