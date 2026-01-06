import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { FileText, Plus, Archive, Edit, Trash2 } from 'lucide-react';
import { Notice } from '../data/mockData';

interface NoticeManagementProps {
  notices: Notice[];
  onCreateNotice: (notice: Omit<Notice, 'id'>) => void;
  onUpdateNotice: (id: string, status: Notice['status']) => void;
}

export function NoticeManagement({ notices, onCreateNotice, onUpdateNotice }: NoticeManagementProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Community' as Notice['category'],
    description: '',
    targetWard: 'Ward 5',
    status: 'Draft' as Notice['status']
  });

  const handleSubmit = (publish: boolean) => {
    onCreateNotice({
      ...formData,
      status: publish ? 'Published' : 'Draft',
      publishedDate: new Date().toISOString().split('T')[0]
    });
    setFormData({
      title: '',
      category: 'Community',
      description: '',
      targetWard: 'Ward 5',
      status: 'Draft'
    });
    setShowCreateDialog(false);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      Published: 'bg-teal-100 text-teal-700 border-teal-300',
      Draft: 'bg-slate-100 text-slate-700 border-slate-300',
      Archived: 'bg-slate-100 text-slate-500 border-slate-300'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const variants: Record<string, string> = {
      Health: 'bg-red-100 text-red-700',
      Water: 'bg-blue-100 text-blue-700',
      Electricity: 'bg-amber-100 text-amber-700',
      Community: 'bg-teal-100 text-teal-700',
      Emergency: 'bg-red-100 text-red-700'
    };
    return <Badge className={variants[category] || ''}>{category}</Badge>;
  };

  const publishedNotices = notices.filter(n => n.status === 'Published');
  const draftNotices = notices.filter(n => n.status === 'Draft');
  const archivedNotices = notices.filter(n => n.status === 'Archived');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Notice Management</h1>
          <p className="text-slate-600">Create and manage public notices</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Notice
        </Button>
      </div>

      <Tabs defaultValue="published" className="w-full">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="published">Published ({publishedNotices.length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({draftNotices.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archivedNotices.length})</TabsTrigger>
        </TabsList>

        {[
          { value: 'published', data: publishedNotices },
          { value: 'draft', data: draftNotices },
          { value: 'archived', data: archivedNotices }
        ].map(({ value, data }) => (
          <TabsContent key={value} value={value} className="mt-4">
            <div className="grid gap-4">
              {data.length === 0 ? (
                <Card className="border-slate-300 p-8 text-center">
                  <p className="text-slate-500">No {value} notices</p>
                </Card>
              ) : (
                data.map((notice) => (
                  <Card key={notice.id} className="border-slate-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5 text-teal-600" />
                            <CardTitle className="text-xl text-slate-900">{notice.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <CategoryBadge category={notice.category} />
                            <StatusBadge status={notice.status} />
                            <span className="text-sm text-slate-600">Ward: {notice.targetWard}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {notice.status === 'Draft' && (
                            <Button size="sm" onClick={() => onUpdateNotice(notice.id, 'Published')} className="bg-teal-600 hover:bg-teal-700">
                              Publish
                            </Button>
                          )}
                          {notice.status === 'Published' && (
                            <Button size="sm" variant="outline" onClick={() => onUpdateNotice(notice.id, 'Archived')}>
                              <Archive className="h-4 w-4 mr-1" />
                              Archive
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 mb-3">{notice.description}</p>
                      <p className="text-sm text-slate-500">Published on: {notice.publishedDate}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Notice</DialogTitle>
            <DialogDescription>Fill in the details to create a new public notice</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Notice Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter notice title"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value: Notice['category']) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Water">Water</SelectItem>
                    <SelectItem value="Electricity">Electricity</SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ward">Target Ward</Label>
                <Input
                  id="ward"
                  value={formData.targetWard}
                  onChange={(e) => setFormData({ ...formData, targetWard: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter notice description"
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => handleSubmit(false)}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit(true)} className="bg-teal-600 hover:bg-teal-700">
              Publish Notice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}