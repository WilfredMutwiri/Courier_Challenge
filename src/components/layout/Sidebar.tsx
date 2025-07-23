import { Home, Package, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Parcels', path: '/parcels' },
    { icon: Users, label: 'Agents', path: '/agents' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Navigation</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start space-x-3",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
                onClick={() => navigate(item.path)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;