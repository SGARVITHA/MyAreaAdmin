import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Progress } from './ui/progress';
import { VolunteerEvent } from '../data/mockData';
import { Users, Calendar, Clock, MapPin, Plus } from 'lucide-react';

interface VolunteerEventsProps {
  events: VolunteerEvent[];
  onCreateEvent: (event: Omit<VolunteerEvent, 'id' | 'registeredVolunteers'>) => void;
}

export function VolunteerEvents({ events, onCreateEvent }: VolunteerEventsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    requiredVolunteers: 0
  });

  const handleSubmit = () => {
    onCreateEvent(formData);
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      requiredVolunteers: 0
    });
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Volunteer Events</h1>
          <p className="text-slate-600">Organize and manage community volunteer activities</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid gap-4">
        {events.length === 0 ? (
          <Card className="border-slate-300 p-8 text-center">
            <p className="text-slate-500">No volunteer events scheduled</p>
          </Card>
        ) : (
          events.map((event) => {
            const progress = (event.registeredVolunteers / event.requiredVolunteers) * 100;
            return (
              <Card key={event.id} className="border-slate-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-900">{event.name}</CardTitle>
                      <p className="text-slate-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-teal-600" />
                        <span className="text-sm text-slate-700">
                          Volunteers: {event.registeredVolunteers} / {event.requiredVolunteers}
                        </span>
                      </div>
                      <span className="text-sm text-slate-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Volunteer Event</DialogTitle>
            <DialogDescription>Organize a new community volunteer activity</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter event name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter event description"
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="volunteers">Required Volunteers</Label>
              <Input
                id="volunteers"
                type="number"
                value={formData.requiredVolunteers}
                onChange={(e) => setFormData({ ...formData, requiredVolunteers: parseInt(e.target.value) || 0 })}
                placeholder="Number of volunteers needed"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}