import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Package, Users } from 'lucide-react';
import { mockParcels, mockAgents, mockStats } from '@/lib/mock-data';

const Reports = () => {
  // Calculate some basic statistics
  const totalParcels = mockParcels.length;
  const deliveredParcels = mockParcels.filter(p => p.status === 'delivered').length;
  const deliveryRate = ((deliveredParcels / totalParcels) * 100).toFixed(1);
  
  const activeAgents = mockAgents.filter(a => a.status === 'active').length;
  const topAgent = mockAgents.reduce((prev, current) => 
    prev.totalDeliveries > current.totalDeliveries ? prev : current
  );

  const statusCounts = mockParcels.reduce((acc, parcel) => {
    acc[parcel.status] = (acc[parcel.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const agentPerformance = mockAgents.map(agent => {
    const agentParcels = mockParcels.filter(p => p.pickupAgent === agent.name);
    return {
      ...agent,
      assignedParcels: agentParcels.length,
      completedParcels: agentParcels.filter(p => p.status === 'delivered').length
    };
  }).sort((a, b) => b.totalDeliveries - a.totalDeliveries);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Key performance indicators and business insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delivery Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{deliveryRate}%</div>
              <p className="text-xs text-muted-foreground">
                {deliveredParcels} of {totalParcels} parcels delivered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Parcels
              </CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalParcels}</div>
              <p className="text-xs text-muted-foreground">
                All-time total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Agents
              </CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{activeAgents}</div>
              <p className="text-xs text-muted-foreground">
                Out of {mockAgents.length} total agents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Performer
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{topAgent.name}</div>
              <p className="text-xs text-muted-foreground">
                {topAgent.totalDeliveries} deliveries
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Parcel Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => {
                const percentage = ((count / totalParcels) * 100).toFixed(1);
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'delivered':
                      return 'bg-success text-success-foreground';
                    case 'in-transit':
                      return 'bg-primary text-primary-foreground';
                    case 'pending':
                      return 'bg-warning text-warning-foreground';
                    case 'failed':
                      return 'bg-destructive text-destructive-foreground';
                    default:
                      return 'bg-secondary text-secondary-foreground';
                  }
                };

                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                      <span className="text-sm">{count} parcels</span>
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Agent Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformance.slice(0, 5).map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{agent.totalDeliveries}</p>
                      <p className="text-xs text-muted-foreground">deliveries</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Detailed Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Agent</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Deliveries</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Rating</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Assigned</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {agentPerformance.map((agent) => (
                    <tr key={agent.id} className="border-b border-border">
                      <td className="py-3 px-4 font-medium">{agent.name}</td>
                      <td className="py-3 px-4">{agent.location}</td>
                      <td className="py-3 px-4">
                        <Badge className={agent.status === 'active' 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                        }>
                          {agent.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">{agent.totalDeliveries}</td>
                      <td className="py-3 px-4 text-right">{agent.rating}/5.0</td>
                      <td className="py-3 px-4 text-right">{agent.assignedParcels}</td>
                      <td className="py-3 px-4 text-right">{agent.completedParcels}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;