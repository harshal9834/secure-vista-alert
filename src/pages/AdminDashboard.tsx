import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  AlertTriangle,
  MapPin,
  Activity,
  ArrowLeft,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      label: "Active Tourists",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "primary",
    },
    {
      label: "Active Alerts",
      value: "8",
      change: "-3",
      icon: AlertTriangle,
      color: "warning",
    },
    {
      label: "Safe Zones",
      value: "156",
      change: "+5",
      icon: MapPin,
      color: "success",
    },
    {
      label: "Avg Safety Score",
      value: "84",
      change: "+2",
      icon: Activity,
      color: "primary",
    },
  ];

  const mockTourists = [
    {
      id: "TIN-2025-87432",
      name: "Rajesh Kumar",
      location: "Connaught Place, Delhi",
      safetyScore: 87,
      status: "active",
      lastUpdate: "2 min ago",
    },
    {
      id: "TIN-2025-87433",
      name: "Sarah Johnson",
      location: "Red Fort, Delhi",
      safetyScore: 92,
      status: "active",
      lastUpdate: "5 min ago",
    },
    {
      id: "TIN-2025-87434",
      name: "Priya Sharma",
      location: "Agra Fort, Agra",
      safetyScore: 78,
      status: "warning",
      lastUpdate: "10 min ago",
    },
    {
      id: "TIN-2025-87435",
      name: "Michael Chen",
      location: "Taj Mahal, Agra",
      safetyScore: 95,
      status: "active",
      lastUpdate: "15 min ago",
    },
  ];

  const mockAlerts = [
    {
      id: "ALT-001",
      type: "Geo-fence Breach",
      tourist: "Priya Sharma",
      location: "Restricted Archaeological Zone",
      severity: "high",
      time: "10 min ago",
    },
    {
      id: "ALT-002",
      type: "Inactivity Alert",
      tourist: "David Miller",
      location: "Remote Area, Rajasthan",
      severity: "medium",
      time: "25 min ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-[var(--shadow-medium)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit
              </Button>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="font-semibold text-lg">Admin Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                Live Monitoring
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`rounded-lg p-2 ${
                      stat.color === "primary"
                        ? "bg-primary/10"
                        : stat.color === "warning"
                        ? "bg-warning/10"
                        : "bg-success/10"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        stat.color === "primary"
                          ? "text-primary"
                          : stat.color === "warning"
                          ? "text-warning"
                          : "text-success"
                      }`}
                    />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      stat.change.startsWith("+")
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Active Alerts */}
        <Card className="p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Active Alerts
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.severity === "high"
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-warning/5 border-warning/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        variant="outline"
                        className={
                          alert.severity === "high"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="font-mono text-sm text-muted-foreground">
                        {alert.id}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {alert.type}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tourist: <span className="font-medium">{alert.tourist}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Location: {alert.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="destructive" size="sm">
                      Respond
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tourist List */}
        <Card className="p-6 shadow-[var(--shadow-medium)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Tourist Monitoring
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tourists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Tourist ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Safety Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTourists.map((tourist) => (
                  <TableRow key={tourist.id}>
                    <TableCell className="font-mono text-sm">
                      {tourist.id}
                    </TableCell>
                    <TableCell className="font-medium">{tourist.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tourist.location}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold">{tourist.safetyScore}</div>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              tourist.safetyScore >= 85
                                ? "bg-success"
                                : tourist.safetyScore >= 70
                                ? "bg-warning"
                                : "bg-destructive"
                            }`}
                            style={{ width: `${tourist.safetyScore}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          tourist.status === "active"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {tourist.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tourist.lastUpdate}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
