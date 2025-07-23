import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Package } from 'lucide-react';
import { mockParcels, type Parcel } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const Parcels = () => {
  const [parcels, setParcels] = useState<Parcel[]>(mockParcels);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const getStatusColor = (status: Parcel['status']) => {
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

  const handleStatusUpdate = (parcelId: string, newStatus: Parcel['status']) => {
    setParcels(prev => 
      prev.map(parcel => 
        parcel.id === parcelId 
          ? { ...parcel, status: newStatus, updatedAt: new Date().toISOString() }
          : parcel
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Parcel ${parcelId} status changed to ${newStatus}`,
    });
  };

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = 
      parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.pickupAgent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parcels Management</h1>
          <p className="text-muted-foreground">Manage and track all parcel deliveries</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, sender, receiver, or agent..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parcels Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Parcels ({filteredParcels.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parcel ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Pickup Agent</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParcels.map((parcel) => (
                    <TableRow key={parcel.id}>
                      <TableCell className="font-medium">{parcel.id}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(parcel.status)}>
                          {parcel.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{parcel.sender}</TableCell>
                      <TableCell>{parcel.receiver}</TableCell>
                      <TableCell>{parcel.pickupAgent}</TableCell>
                      <TableCell>{parcel.destination}</TableCell>
                      <TableCell>
                        {new Date(parcel.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={parcel.status} 
                          onValueChange={(value) => handleStatusUpdate(parcel.id, value as Parcel['status'])}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-transit">In Transit</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
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

export default Parcels;