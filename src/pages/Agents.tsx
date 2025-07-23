import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Users, Star, Phone, MapPin } from 'lucide-react';
import { mockAgents, type Agent } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleStatusToggle = (agentId: string) => {
    setAgents(prev => 
      prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' }
          : agent
      )
    );
    
    const agent = agents.find(a => a.id === agentId);
    const newStatus = agent?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "Agent Status Updated",
      description: `${agent?.name} is now ${newStatus}`,
    });
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.phone.includes(searchTerm)
  );

  const getStatusColor = (status: Agent['status']) => {
    return status === 'active' 
      ? 'bg-success text-success-foreground' 
      : 'bg-secondary text-secondary-foreground';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agents Management</h1>
          <p className="text-muted-foreground">Manage delivery agents and their performance</p>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Agents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or phone number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{agent.rating}/5.0</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{agent.totalDeliveries}</span> total deliveries
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={agent.status === 'active' ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleStatusToggle(agent.id)}
                    className="flex-1"
                  >
                    {agent.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View History
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agent Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Agent Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deliveries</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.id}</TableCell>
                      <TableCell>{agent.name}</TableCell>
                      <TableCell>{agent.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{agent.totalDeliveries}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span>{agent.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusToggle(agent.id)}
                        >
                          Toggle Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Agents;