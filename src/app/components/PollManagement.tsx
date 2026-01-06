import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Progress } from './ui/progress';
import { Poll } from '../data/mockData';
import { BarChart3, Plus, Calendar } from 'lucide-react';

interface PollManagementProps {
  polls: Poll[];
  onCreatePoll: (poll: Omit<Poll, 'id' | 'totalVotes'>) => void;
}

export function PollManagement({ polls, onCreatePoll }: PollManagementProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', ''],
    targetWard: 'Ward 5',
    duration: '7 days',
    status: 'Active' as Poll['status']
  });

  const handleSubmit = () => {
    onCreatePoll({
      question: formData.question,
      options: formData.options.filter(o => o.trim()).map(text => ({ text, votes: 0 })),
      targetWard: formData.targetWard,
      duration: formData.duration,
      status: formData.status
    });
    setFormData({
      question: '',
      options: ['', ''],
      targetWard: 'Ward 5',
      duration: '7 days',
      status: 'Active'
    });
    setShowCreateDialog(false);
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ''] });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      Active: 'bg-teal-100 text-teal-700 border-teal-300',
      Closed: 'bg-slate-100 text-slate-500 border-slate-300'
    };
    return <Badge className={variants[status] || ''}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Community Poll Management</h1>
          <p className="text-slate-600">Create and manage community polls</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Poll
        </Button>
      </div>

      <div className="grid gap-4">
        {polls.length === 0 ? (
          <Card className="border-slate-300 p-8 text-center">
            <p className="text-slate-500">No polls created</p>
          </Card>
        ) : (
          polls.map((poll) => (
            <Card key={poll.id} className="border-slate-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-teal-600" />
                    <div>
                      <CardTitle className="text-xl text-slate-900">{poll.question}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={poll.status} />
                        <span className="text-sm text-slate-600">Ward: {poll.targetWard}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {poll.options.map((option, index) => {
                    const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-700">{option.text}</span>
                          <span className="text-sm text-slate-600">
                            {option.votes} votes ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Duration: {poll.duration}</span>
                  </div>
                  <span className="text-sm text-slate-600">Total Votes: {poll.totalVotes}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Community Poll</DialogTitle>
            <DialogDescription>Create a new poll to gather community feedback</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Poll Question</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter poll question"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Poll Options</Label>
              <div className="space-y-2 mt-1">
                {formData.options.map((option, index) => (
                  <Input
                    key={index}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ward">Target Ward</Label>
                <Input
                  id="ward"
                  value={formData.targetWard}
                  onChange={(e) => setFormData({ ...formData, targetWard: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="duration">Poll Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 7 days"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              Create Poll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}