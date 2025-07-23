import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Clock, Users, DollarSign } from 'lucide-react';
import { mockStats } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '@/components/layout/Layout';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Parcels Today',
      value: mockStats.totalParcelsToday,
      icon: Package,
      color: 'text-primary'
    },
    {
      title: 'Pending Deliveries',
      value: mockStats.pendingDeliveries,
      icon: Clock,
      color: 'text-warning'
    },
    {
      title: 'Active Agents',
      value: mockStats.activeAgents,
      icon: Users,
      color: 'text-success'
    },
    {
      title: 'Revenue ($)',
      value: mockStats.totalRevenue.toLocaleString(),
      icon: DollarSign,
      color: 'text-primary'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of parcel operations and key metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Pickups This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockStats.dailyPickups}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="day" 
                  className="text-muted-foreground"
                />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="pickups" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;