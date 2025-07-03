'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { User, GraduationCap, Building, PlusCircle, MessageSquare, TrendingUp, Users, Star, DollarSign, Award, BookOpen, Target } from 'lucide-react'

interface SkillRequest {
  id: string
  title: string
  description: string
  skill_category: string
  budget_min: number
  budget_max: number
  created_at: string
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
}

export default function Dashboard() {
  const router = useRouter()
  const { user, profile, loading, signOut } = useAuth()
  const [skillRequests] = useState<SkillRequest[]>([])
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
      return
    }

    if (user) {
      // TODO: Load from Supabase
    }
  }, [user, loading, router])

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setStatsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  const userTypeConfig = {
    learner: {
      icon: User,
      color: 'bg-blue-100 text-blue-800',
      actions: [
        { label: 'Post a Skill Request', action: () => router.push('/post-skill-request'), icon: PlusCircle },
        { label: 'Browse Instructors', action: () => router.push('/browse-instructors'), icon: Users },
        { label: 'My Learning Progress', action: () => router.push('/my-progress'), icon: TrendingUp },
        { label: 'Messages', action: () => router.push('/messages'), icon: MessageSquare },
      ]
    },
    instructor: {
      icon: GraduationCap,
      color: 'bg-green-100 text-green-800',
      actions: [
        { label: 'Browse Skill Requests', action: () => router.push('/browse-requests'), icon: BookOpen },
        { label: 'My Proposals', action: () => router.push('/my-proposals'), icon: Target },
        { label: 'Teaching Analytics', action: () => router.push('/analytics'), icon: TrendingUp },
        { label: 'Messages', action: () => router.push('/messages'), icon: MessageSquare },
      ]
    },
    company: {
      icon: Building,
      color: 'bg-purple-100 text-purple-800',
      actions: [
        { label: 'Manage Training Programs', action: () => router.push('/training-programs'), icon: BookOpen },
        { label: 'Find Instructors', action: () => router.push('/find-instructors'), icon: Users },
        { label: 'Employee Progress', action: () => router.push('/employee-progress'), icon: TrendingUp },
        { label: 'Messages', action: () => router.push('/messages'), icon: MessageSquare },
      ]
    }
  }

  const config = userTypeConfig[profile.user_type]
  const IconComponent = config.icon

  // Mock stats for demonstration
  const stats = {
    learner: [
      { label: 'Active Requests', value: skillRequests.length, icon: BookOpen },
      { label: 'Completed Skills', value: 3, icon: Award },
      { label: 'Hours Learned', value: 24, icon: TrendingUp },
      { label: 'Instructors Worked With', value: 2, icon: Users },
    ],
    instructor: [
      { label: 'Active Students', value: 12, icon: Users },
      { label: 'Total Earnings', value: `${profile.total_earnings || 0} ETB`, icon: DollarSign },
      { label: 'Success Rate', value: `${profile.success_rate || 0}%`, icon: TrendingUp },
      { label: 'Rating', value: `${profile.rating || 0}/5`, icon: Star },
    ],
    company: [
      { label: 'Active Programs', value: 5, icon: BookOpen },
      { label: 'Employees Trained', value: 45, icon: Users },
      { label: 'Training Hours', value: 320, icon: TrendingUp },
      { label: 'Success Rate', value: '87%', icon: Award },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SB</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">SkillBridge</h1>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Phase 1: Academic Tutoring
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{profile.full_name}</div>
                <div className="text-sm text-gray-500 capitalize">{profile.user_type}</div>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
              🎉 Welcome to SkillBridge!
            </h2>
                         <p className="text-blue-100 mb-4">
               You&apos;re logged in as a <span className="font-medium capitalize">{profile.user_type}</span>
             </p>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                <IconComponent className="w-3 h-3 mr-1" />
                {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
              </div>
              <span className="text-blue-200">•</span>
              <span className="text-blue-200">
                Welcome to SkillBridge! 🚀 Start your skills-to-income journey today.
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats[profile.user_type].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <div className="text-2xl font-bold text-gray-900">
                      {statsLoading ? (
                        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        stat.value
                      )}
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with these common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 justify-start"
                      onClick={action.action}
                    >
                      <action.icon className="h-5 w-5 mr-3" />
                      <span className="text-left">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{profile.full_name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{profile.user_type}</p>
                </div>
                
                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{profile.email}</span>
                  </div>
                  
                  {profile.location && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{profile.location}</span>
                    </div>
                  )}
                  
                  {profile.user_type === 'instructor' && profile.hourly_rate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hourly Rate:</span>
                      <span className="font-medium">{profile.hourly_rate} ETB</span>
                    </div>
                  )}
                  
                  {profile.user_type === 'instructor' && profile.rating && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium flex items-center">
                        {profile.rating}/5
                        <Star className="h-3 w-3 text-yellow-400 ml-1" />
                      </span>
                    </div>
                  )}
                </div>
                
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 