'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  TrendingUp,
  Award,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Gift,
  Share2,
  Copy,
  Filter,
  Search,
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Baby,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

// Referral type definitions
interface Referral {
  id: string;
  referralCode: string;
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  referrerType: 'current_parent' | 'past_parent' | 'staff' | 'community_member' | 'other';
  referredFamilyName: string;
  referredParentName: string;
  referredEmail: string;
  referredPhone: string;
  referredChildrenCount: number;
  referredChildrenAges: string[];
  status: 'pending' | 'contacted' | 'touring' | 'enrolled' | 'declined' | 'expired';
  contactDate?: string;
  tourDate?: string;
  enrollmentDate?: string;
  declineReason?: string;
  incentiveEligible: boolean;
  incentiveType?: string;
  incentiveAmount?: number;
  incentiveIssued: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

interface ReferralMetrics {
  totalReferrals: number;
  successfulEnrollments: number;
  conversionRate: number;
  averageDaysToEnrollment: number;
  totalIncentivesIssued: number;
  pendingReferrals: number;
  activeReferrals: number;
}

// Mock data for demonstration
const mockReferrals: Referral[] = [
  {
    id: '1',
    referralCode: 'REF-2024-001',
    referrerName: 'Jennifer Smith',
    referrerEmail: 'jennifer@example.com',
    referrerPhone: '(630) 555-0123',
    referrerType: 'current_parent',
    referredFamilyName: 'Johnson',
    referredParentName: 'Emily Johnson',
    referredEmail: 'emily.j@example.com',
    referredPhone: '(630) 555-0456',
    referredChildrenCount: 2,
    referredChildrenAges: ['2 years', '4 years'],
    status: 'touring',
    contactDate: '2024-01-10',
    tourDate: '2024-01-20',
    incentiveEligible: true,
    incentiveType: 'credit',
    incentiveAmount: 100,
    incentiveIssued: false,
    notes: 'Family is interested in full-time enrollment for both children.',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15',
    expiresAt: '2024-04-08',
  },
  {
    id: '2',
    referralCode: 'REF-2024-002',
    referrerName: 'Michael Chen',
    referrerEmail: 'michael.c@example.com',
    referrerPhone: '(630) 555-0789',
    referrerType: 'current_parent',
    referredFamilyName: 'Williams',
    referredParentName: 'Sarah Williams',
    referredEmail: 'sarah.w@example.com',
    referredPhone: '(630) 555-0321',
    referredChildrenCount: 1,
    referredChildrenAges: ['6 months'],
    status: 'enrolled',
    contactDate: '2024-01-05',
    tourDate: '2024-01-12',
    enrollmentDate: '2024-01-18',
    incentiveEligible: true,
    incentiveType: 'credit',
    incentiveAmount: 100,
    incentiveIssued: true,
    notes: 'Enrolled in infant program.',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-18',
    expiresAt: '2024-04-03',
  },
  {
    id: '3',
    referralCode: 'REF-2024-003',
    referrerName: 'Community Event',
    referrerEmail: '',
    referrerPhone: '',
    referrerType: 'other',
    referredFamilyName: 'Davis',
    referredParentName: 'Robert Davis',
    referredEmail: 'robert.d@example.com',
    referredPhone: '(630) 555-0654',
    referredChildrenCount: 1,
    referredChildrenAges: ['3 years'],
    status: 'pending',
    incentiveEligible: false,
    notes: 'Met at Roselle Community Fair. Interested in part-time preschool.',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    expiresAt: '2024-04-15',
  },
];

const mockMetrics: ReferralMetrics = {
  totalReferrals: 45,
  successfulEnrollments: 12,
  conversionRate: 26.7,
  averageDaysToEnrollment: 14,
  totalIncentivesIssued: 1200,
  pendingReferrals: 8,
  activeReferrals: 15,
};

// Status colors and icons
const statusConfig = {
  pending: { color: 'bg-yellow-500', icon: Clock, label: 'Pending' },
  contacted: { color: 'bg-blue-500', icon: Phone, label: 'Contacted' },
  touring: { color: 'bg-purple-500', icon: Calendar, label: 'Touring' },
  enrolled: { color: 'bg-green-500', icon: CheckCircle, label: 'Enrolled' },
  declined: { color: 'bg-red-500', icon: XCircle, label: 'Declined' },
  expired: { color: 'bg-gray-500', icon: Clock, label: 'Expired' },
};

export default function ReferralTracker() {
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [filteredReferrals, setFilteredReferrals] = useState<Referral[]>(mockReferrals);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'status' | 'name'>('recent');
  const [showNewReferralDialog, setShowNewReferralDialog] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const { toast } = useToast();

  // Filter referrals
  useEffect(() => {
    let filtered = [...referrals];

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(r => r.status === selectedStatus);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.referrerName.toLowerCase().includes(query) ||
          r.referredFamilyName.toLowerCase().includes(query) ||
          r.referredParentName.toLowerCase().includes(query) ||
          r.referralCode.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'name':
        filtered.sort((a, b) => a.referredFamilyName.localeCompare(b.referredFamilyName));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredReferrals(filtered);
  }, [selectedStatus, searchQuery, sortBy, referrals]);

  const handleStatusUpdate = (referralId: string, newStatus: Referral['status']) => {
    setReferrals(prev =>
      prev.map(r =>
        r.id === referralId
          ? { ...r, status: newStatus, updatedAt: new Date().toISOString() }
          : r
      )
    );

    toast({
      title: 'Status updated',
      description: `Referral status changed to ${newStatus}`,
    });
  };

  const handleCopyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied!',
      description: 'Referral code copied to clipboard',
    });
  };

  const generateShareLink = (referralCode: string) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/enroll?ref=${referralCode}`;
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Referral Tracker
        </h1>
        <p className="text-lg text-muted-foreground">
          Track and manage client referrals and incentive programs
        </p>
      </motion.div>

      {/* Metrics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Enrollments</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.successfulEnrollments}</div>
            <p className="text-xs text-muted-foreground">
              {mockMetrics.conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.activeReferrals}</div>
            <p className="text-xs text-muted-foreground">
              {mockMetrics.pendingReferrals} pending contact
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incentives Issued</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockMetrics.totalIncentivesIssued}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search referrals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="touring">Touring</SelectItem>
              <SelectItem value="enrolled">Enrolled</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="name">Family Name</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowNewReferralDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            New Referral
          </Button>
        </div>
      </motion.div>

      {/* Referrals List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredReferrals.map((referral, index) => {
          const StatusIcon = statusConfig[referral.status].icon;

          return (
            <motion.div
              key={referral.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          {referral.referredFamilyName} Family
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={`${statusConfig[referral.status].color} text-white border-0`}
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[referral.status].label}
                        </Badge>
                        {referral.incentiveEligible && (
                          <Badge variant="secondary">
                            <Gift className="mr-1 h-3 w-3" />
                            Incentive Eligible
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        Referred by {referral.referrerName} • {referral.referralCode}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedReferral(referral)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyReferralCode(referral.referralCode)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          const link = generateShareLink(referral.referralCode);
                          navigator.clipboard.writeText(link);
                          toast({ title: 'Link copied!', description: 'Share link copied to clipboard' });
                        }}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Copy Share Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(referral.id, 'contacted')}
                          disabled={referral.status !== 'pending'}
                        >
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(referral.id, 'touring')}
                          disabled={referral.status === 'enrolled' || referral.status === 'declined'}
                        >
                          Schedule Tour
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(referral.id, 'enrolled')}
                          disabled={referral.status === 'enrolled'}
                        >
                          Mark as Enrolled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Referred Family Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{referral.referredParentName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{referral.referredEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{referral.referredPhone}</span>
                      </div>
                    </div>

                    {/* Children Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Baby className="h-4 w-4 text-muted-foreground" />
                        <span>{referral.referredChildrenCount} child(ren)</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Ages: {referral.referredChildrenAges.join(', ')}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Created: {format(new Date(referral.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      {referral.contactDate && (
                        <div className="text-sm text-muted-foreground">
                          Contacted: {format(new Date(referral.contactDate), 'MMM d')}
                        </div>
                      )}
                      {referral.tourDate && (
                        <div className="text-sm text-muted-foreground">
                          Tour: {format(new Date(referral.tourDate), 'MMM d')}
                        </div>
                      )}
                    </div>

                    {/* Incentive Status */}
                    {referral.incentiveEligible && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${referral.incentiveAmount} {referral.incentiveType}</span>
                        </div>
                        <Badge variant={referral.incentiveIssued ? 'default' : 'outline'}>
                          {referral.incentiveIssued ? 'Issued' : 'Pending'}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {referral.notes && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm">{referral.notes}</p>
                    </div>
                  )}

                  {/* Progress Indicator */}
                  <div className="mt-4">
                    <Progress
                      value={
                        referral.status === 'pending' ? 20 :
                        referral.status === 'contacted' ? 40 :
                        referral.status === 'touring' ? 60 :
                        referral.status === 'enrolled' ? 100 :
                        referral.status === 'declined' ? 0 : 0
                      }
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredReferrals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No referrals found matching your criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setShowNewReferralDialog(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add First Referral
          </Button>
        </motion.div>
      )}

      {/* New Referral Dialog */}
      <Dialog open={showNewReferralDialog} onOpenChange={setShowNewReferralDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Referral</DialogTitle>
            <DialogDescription>
              Enter the details of the new referral. The system will generate a unique referral code.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referrer-name">Referrer Name</Label>
                <Input id="referrer-name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referrer-type">Referrer Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current_parent">Current Parent</SelectItem>
                    <SelectItem value="past_parent">Past Parent</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="community_member">Community Member</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="family-name">Family Name</Label>
                <Input id="family-name" placeholder="Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-name">Parent Name</Label>
                <Input id="parent-name" placeholder="Jane Smith" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="(630) 555-0123" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about this referral..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewReferralDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowNewReferralDialog(false);
              toast({
                title: 'Referral added',
                description: 'New referral has been added successfully.',
              });
            }}>
              Add Referral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}