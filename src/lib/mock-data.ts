// Mock data for the admin portal

export interface Parcel {
  id: string;
  status: 'in-transit' | 'delivered' | 'failed' | 'pending';
  sender: string;
  receiver: string;
  pickupAgent: string;
  createdAt: string;
  updatedAt: string;
  destination: string;
}

export interface Agent {
  id: string;
  name: string;
  location: string;
  phone: string;
  status: 'active' | 'inactive';
  totalDeliveries: number;
  rating: number;
}

export const mockParcels: Parcel[] = [
  {
    id: 'P001',
    status: 'in-transit',
    sender: 'John Doe',
    receiver: 'Jane Smith',
    pickupAgent: 'Michael Johnson',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T14:15:00Z',
    destination: 'Nairobi,Kenya'
  },
  {
    id: 'P002',
    status: 'delivered',
    sender: 'Alice Brown',
    receiver: 'Bob Wilson',
    pickupAgent: 'Sarah Davis',
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-01-20T16:30:00Z',
    destination: 'Kisumu,Kenya'
  },
  {
    id: 'P003',
    status: 'pending',
    sender: 'Emma Taylor',
    receiver: 'David Lee',
    pickupAgent: 'Not Assigned',
    createdAt: '2024-01-20T15:45:00Z',
    updatedAt: '2024-01-20T15:45:00Z',
    destination: 'Eldoret, Kenya'
  },
  {
    id: 'P004',
    status: 'failed',
    sender: 'Grace Miller',
    receiver: 'Tom Anderson',
    pickupAgent: 'James Rodriguez',
    createdAt: '2024-01-19T12:20:00Z',
    updatedAt: '2024-01-20T09:10:00Z',
    destination: 'Dar-es-salaam, Tanzania'
  },
  {
    id: 'P005',
    status: 'in-transit',
    sender: 'Peter Clark',
    receiver: 'Lisa Johnson',
    pickupAgent: 'Michael Johnson',
    createdAt: '2024-01-20T11:15:00Z',
    updatedAt: '2024-01-20T13:20:00Z',
    destination: 'Ibadan, Nigeria'
  }
];

export const mockAgents: Agent[] = [
  {
    id: 'A001',
    name: 'Michael Johnson',
    location: 'Nairobi',
    phone: '+234-801-234-5678',
    status: 'active',
    totalDeliveries: 156,
    rating: 4.8
  },
  {
    id: 'A002',
    name: 'Sarah Davis',
    location: 'Kisumu',
    phone: '+234-802-345-6789',
    status: 'active',
    totalDeliveries: 203,
    rating: 4.9
  },
  {
    id: 'A003',
    name: 'James Rodriguez',
    location: 'Nakuru',
    phone: '+234-803-456-7890',
    status: 'inactive',
    totalDeliveries: 89,
    rating: 4.2
  },
  {
    id: 'A004',
    name: 'Emily Chen',
    location: 'Dar-es-salaam',
    phone: '+234-804-567-8901',
    status: 'active',
    totalDeliveries: 134,
    rating: 4.7
  },
  {
    id: 'A005',
    name: 'Robert Kim',
    location: 'Ibadan',
    phone: '+234-805-678-9012',
    status: 'active',
    totalDeliveries: 178,
    rating: 4.6
  }
];

export const mockStats = {
  totalParcelsToday: 23,
  pendingDeliveries: 8,
  activeAgents: 12,
  totalRevenue: 125000,
  dailyPickups: [
    { day: 'Mon', pickups: 45 },
    { day: 'Tue', pickups: 52 },
    { day: 'Wed', pickups: 38 },
    { day: 'Thu', pickups: 61 },
    { day: 'Fri', pickups: 49 },
    { day: 'Sat', pickups: 35 },
    { day: 'Sun', pickups: 28 }
  ]
};