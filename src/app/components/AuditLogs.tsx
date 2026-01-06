import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AdminLog } from '../data/mockData';
import { FileText, Clock, User } from 'lucide-react';

interface AuditLogsProps {
  logs: AdminLog[];
}

export function AuditLogs({ logs }: AuditLogsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-slate-900">Audit & Activity Logs</h1>
        <p className="text-slate-600">Track all administrative actions and changes</p>
      </div>

      <Card className="border-slate-300">
        <div className="p-4">
          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3 text-slate-700">Action</th>
                  <th className="text-left p-3 text-slate-700">Admin</th>
                  <th className="text-left p-3 text-slate-700">Details</th>
                  <th className="text-left p-3 text-slate-700">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-6 text-slate-500">
                      No activity logs found
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="border-t border-slate-200">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-teal-600" />
                          <span className="text-slate-900">{log.action}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 text-slate-700">
                          <User className="h-4 w-4 text-slate-500" />
                          <span>{log.admin}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600">{log.details}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">{log.timestamp}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <p className="text-sm text-teal-800">
          <strong>Note:</strong> All administrative actions are logged for transparency and accountability. 
          Logs are retained for 90 days as per government data retention policy.
        </p>
      </div>
    </div>
  );
}
