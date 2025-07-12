'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import {
  Heart,
  GraduationCap,
  BookOpen,
  PlusCircle,
  MessageSquare,
  TrendingUp,
  Users,
  Star,
  DollarSign,
  Award,
  UserPlus,
  School,
} from 'lucide-react';

interface TutorRequest {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade_level: string;
  budget_per_session: number;
  created_at: string;
  status: 'open' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
}

export default function Dashboard() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  const [tutorRequests] = useState<TutorRequest[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
      return;
    }

    if (user) {
      // TODO: Load from Supabase
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setStatsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const userTypeConfig = {
    parent: {
      icon: Heart,
      color: 'bg-blue-100 text-blue-800',
      actions: [
        {
          label: 'Manage My Children',
          action: () => router.push('/dashboard/children'),
          icon: UserPlus,
        },
        {
          label: 'Find a Tutor',
          action: () => router.push('/post-skill-request'),
          icon: PlusCircle,
        },
        {
          label: 'Browse Tutors',
          action: () => router.push('/browse-tutors'),
          icon: Users,
        },
        {
          label: 'Messages',
          action: () => router.push('/messages'),
          icon: MessageSquare,
        },
      ],
    },
    student: {
      icon: GraduationCap,
      color: 'bg-green-100 text-green-800',
      actions: [
        {
          label: 'Find a Tutor',
          action: () => router.push('/post-skill-request'),
          icon: PlusCircle,
        },
        {
          label: 'My Sessions',
          action: () => router.push('/my-sessions'),
          icon: BookOpen,
        },
        {
          label: 'My Progress',
          action: () => router.push('/my-progress'),
          icon: TrendingUp,
        },
        {
          label: 'Messages',
          action: () => router.push('/messages'),
          icon: MessageSquare,
        },
      ],
    },
    tutor: {
      icon: BookOpen,
      color: 'bg-amber-100 text-amber-800',
      actions: [
        {
          label: 'Browse Requests',
          action: () => router.push('/browse-requests'),
          icon: School,
        },
        {
          label: 'My Students',
          action: () => router.push('/my-students'),
          icon: Users,
        },
        {
          label: 'Earnings & Analytics',
          action: () => router.push('/analytics'),
          icon: DollarSign,
        },
        {
          label: 'Messages',
          action: () => router.push('/messages'),
          icon: MessageSquare,
        },
      ],
    },
  };

  const config =
    userTypeConfig[profile.user_type as keyof typeof userTypeConfig];
  const IconComponent = config?.icon || Heart;

  // Mock stats for demonstration
  const stats = {
    parent: [
      { label: 'Children Registered', value: 2, icon: UserPlus },
      { label: 'Active Sessions', value: 3, icon: BookOpen },
      { label: 'This Month Spent', value: '2,400 ETB', icon: DollarSign },
      { label: 'Tutors Worked With', value: 2, icon: Users },
    ],
    student: [
      { label: 'Active Sessions', value: tutorRequests.length, icon: BookOpen },
      { label: 'Subjects Learning', value: 3, icon: Award },
      { label: 'Hours This Month', value: 16, icon: TrendingUp },
      { label: 'Tutors', value: 2, icon: Users },
    ],
    tutor: [
      { label: 'Active Students', value: 8, icon: Users },
      {
        label: 'This Month Earnings',
        value: `${profile.total_earnings || 0} ETB`,
        icon: DollarSign,
      },
      { label: 'Rating', value: `${profile.rating || 4.8}/5`, icon: Star },
      { label: 'Sessions This Month', value: 24, icon: BookOpen },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-amber-500">
                  <span className="text-sm font-bold text-white">🦅</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Eagle Tutorials
                </h1>
              </div>
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700"
              >
                Addis Ababa
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {profile.full_name}
                </div>
                <div className="text-sm capitalize text-gray-500">
                  {profile.user_type}
                </div>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h2 className="mb-2 text-2xl font-bold">
              🎉 Welcome to Eagle Tutorials!
            </h2>
            <p className="mb-4 text-blue-100">
              You&apos;re logged in as a{' '}
              <span className="font-medium capitalize">
                {profile.user_type}
              </span>
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}
              >
                <IconComponent className="mr-1 h-3 w-3" />
                {profile.user_type.charAt(0).toUpperCase() +
                  profile.user_type.slice(1)}
              </div>
              <span className="text-blue-200">•</span>
              <span className="text-blue-200">
                {profile.user_type === 'parent' &&
                  'Find the perfect tutor for your child&apos;s educational journey! 📚'}
                {profile.user_type === 'student' &&
                  'Start learning with expert tutors today! 🎓'}
                {profile.user_type === 'tutor' &&
                  'Share your expertise and earn while teaching! 🦅'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats[profile.user_type].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <div className="text-2xl font-bold text-gray-900">
                      {statsLoading ? (
                        <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
                      ) : (
                        stat.value
                      )}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  {profile.user_type === 'parent' &&
                    'Manage your children and find the best tutors'}
                  {profile.user_type === 'student' &&
                    'Get started with these common tasks'}
                  {profile.user_type === 'tutor' &&
                    'Manage your teaching and connect with students'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {config.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto justify-start p-4 hover:bg-blue-50"
                      onClick={action.action}
                    >
                      <action.icon className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="text-left">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Parent-specific Recent Activity */}
            {profile.user_type === 'parent' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates on your children's tutoring sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 rounded-lg bg-blue-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Mathematics session completed
                        </p>
                        <p className="text-xs text-gray-500">
                          Meron had a great session with Tutor Sarah - 2 hours
                          ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-lg bg-green-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Star className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New tutor proposal received
                        </p>
                        <p className="text-xs text-gray-500">
                          Physics tutor interested in teaching Meron - 1 day ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-amber-500">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{profile.full_name}</h3>
                  <p className="text-sm capitalize text-gray-600">
                    {profile.user_type}
                  </p>
                  {profile.user_type === 'tutor' &&
                    profile.verification_status && (
                      <Badge
                        variant={
                          profile.verification_status === 'verified'
                            ? 'default'
                            : 'secondary'
                        }
                        className="mt-2"
                      >
                        {profile.verification_status === 'verified'
                          ? '✓ Verified Tutor'
                          : 'Pending Verification'}
                      </Badge>
                    )}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{profile.email}</span>
                  </div>
                  {profile.user_type === 'parent' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Children:</span>
                      <span className="font-medium">
                        {profile.children_count || 0}
                      </span>
                    </div>
                  )}
                  {profile.user_type === 'tutor' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">
                          {profile.rating || 0}/5 ⭐
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sessions:</span>
                        <span className="font-medium">
                          {profile.total_sessions || 0}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">💡 Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-gray-600">
                  {profile.user_type === 'parent' && (
                    <>
                      <p>
                        • Add your children's profiles for better tutor matching
                      </p>
                      <p>• Check tutor reviews before booking sessions</p>
                      <p>• Set clear learning goals for each subject</p>
                    </>
                  )}
                  {profile.user_type === 'student' && (
                    <>
                      <p>• Be specific about what you want to learn</p>
                      <p>• Prepare questions before each session</p>
                      <p>• Practice regularly between sessions</p>
                    </>
                  )}
                  {profile.user_type === 'tutor' && (
                    <>
                      <p>• Complete your profile verification</p>
                      <p>• Respond to requests within 24 hours</p>
                      <p>• Upload teaching certificates</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
