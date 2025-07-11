'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, ArrowLeft, BookOpen, DollarSign, MapPin, User, Clock, CheckCircle, Home, Monitor } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const ethiopianSubjects = [
  { name: 'Mathematics', category: 'Core', grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'English', category: 'Language', grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'Amharic', category: 'Language', grades: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'Physics', category: 'Science', grades: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'Chemistry', category: 'Science', grades: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'Biology', category: 'Science', grades: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'History', category: 'Social Studies', grades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'Geography', category: 'Social Studies', grades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'Civics', category: 'Social Studies', grades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
  { name: 'Computer Science', category: 'Technology', grades: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] }
]

const addisAbabaSubcities = [
  'Addis Ketema', 'Akaky Kaliti', 'Arada', 'Bole', 'Gullele', 
  'Kirkos', 'Kolfe Keranio', 'Lideta', 'Nifas Silk-Lafto', 'Yeka'
]

const sessionTypes = [
  { value: 'online', label: 'Online Sessions', icon: Monitor, description: 'Virtual tutoring via video call' },
  { value: 'home', label: 'Home Tutoring', icon: Home, description: 'Tutor comes to your location' },
  { value: 'either', label: 'Either Option', icon: null, description: 'Flexible - online or in-person' }
]

const urgencyLevels = [
  { value: 'urgent', label: 'Urgent (Start within 1 week)', color: 'text-red-600' },
  { value: 'normal', label: 'Normal (Start within 2-3 weeks)', color: 'text-blue-600' },
  { value: 'flexible', label: 'Flexible (Start anytime)', color: 'text-green-600' }
]

interface Child {
  id: string
  name: string
  age: number
  grade_level: string
  school_name: string
  subjects_struggling: string[]
  learning_style: string
  special_needs: string
  created_at: string
}

export default function PostTutorRequest() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [children, setChildren] = useState<Child[]>([])
  
  const loadChildren = async () => {
    // TODO: Load from Supabase
    // Simulated data for now
    setChildren([
      {
        id: '1',
        name: 'Meron Tadesse',
        age: 15,
        grade_level: 'Grade 10',
        school_name: 'Addis Ababa Preparatory School',
        subjects_struggling: ['Mathematics', 'Physics'],
        learning_style: 'visual',
        special_needs: '',
        created_at: '2024-01-15'
      }
    ])
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    grade_level: '',
    session_type: 'either' as 'online' | 'home' | 'either',
    sessions_per_week: 2,
    session_duration_minutes: 60,
    total_sessions: '',
    budget_per_session: '',
    start_date: '',
    urgency: 'normal' as 'urgent' | 'normal' | 'flexible',
    location_subcity: '',
    location_kebele: '',
    location_details: '',
    child_id: '',
    tutor_gender_preference: 'no_preference' as 'male' | 'female' | 'no_preference',
    tutor_experience_min: 0,
    special_requirements: [] as string[]
  })
  const [newRequirement, setNewRequirement] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && (!user || (profile?.user_type !== 'parent' && profile?.user_type !== 'student'))) {
      router.push('/auth')
    }
    // Load children for parent users
    if (profile?.user_type === 'parent') {
      loadChildren()
    }
    // Check for child parameter in URL
    const params = new URLSearchParams(window.location.search)
    const childId = params.get('child')
    if (childId) {
      const selectedChild = children.find(c => c.id === childId)
      if (selectedChild) {
        setFormData(prev => ({
          ...prev,
          child_id: childId,
          title: `${selectedChild.subjects_struggling[0] || 'Tutoring'} tutor needed for ${selectedChild.name}`,
          grade_level: selectedChild.grade_level,
          subject: selectedChild.subjects_struggling[0] || ''
        }))
      }
    }
  }, [user, profile, loading, router, children])

  const availableGrades = formData.subject 
    ? ethiopianSubjects.find(s => s.name === formData.subject)?.grades || []
    : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.subject || !formData.grade_level || !formData.budget_per_session) {
        throw new Error('Please fill in all required fields')
      }

      if (formData.session_type === 'home' && !formData.location_subcity) {
        throw new Error('Please specify your location for home tutoring')
      }

      if (parseInt(formData.budget_per_session) < 50) {
        throw new Error('Minimum budget per session is 50 ETB')
      }

      // TODO: Submit to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addRequirement = () => {
    if (newRequirement.trim() && !formData.special_requirements.includes(newRequirement.trim())) {
      setFormData(prev => ({
        ...prev,
        special_requirements: [...prev.special_requirements, newRequirement.trim()]
      }))
      setNewRequirement('')
    }
  }

  const removeRequirement = (reqToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      special_requirements: prev.special_requirements.filter(req => req !== reqToRemove)
    }))
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || !profile || (profile.user_type !== 'parent' && profile.user_type !== 'student')) {
    return null
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-blue-900">Tutor Request Posted!</CardTitle>
            <CardDescription>
              Your request has been posted successfully. Qualified tutors will start applying soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => router.push('/dashboard')} className="w-full bg-blue-600 hover:bg-blue-700">
              View Dashboard
            </Button>
            <Button 
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  title: '',
                  description: '',
                  subject: '',
                  grade_level: '',
                  session_type: 'either',
                  sessions_per_week: 2,
                  session_duration_minutes: 60,
                  total_sessions: '',
                  budget_per_session: '',
                  start_date: '',
                  urgency: 'normal',
                  location_subcity: '',
                  location_kebele: '',
                  location_details: '',
                  child_id: '',
                  tutor_gender_preference: 'no_preference',
                  tutor_experience_min: 0,
                  special_requirements: []
                })
              }}
              variant="outline" 
              className="w-full"
            >
              Post Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Find a Tutor</h1>
                <p className="text-sm text-gray-500">Post your tutoring request and connect with qualified educators</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Posting as:</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">{profile.full_name}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Subject & Grade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>Subject & Grade Level</span>
              </CardTitle>
              <CardDescription>
                What subject does your child need help with?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Grade 10 Mathematics Tutor Needed for Exam Preparation"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(
                        ethiopianSubjects.reduce((acc, subject) => {
                          if (!acc[subject.category]) acc[subject.category] = []
                          acc[subject.category].push(subject.name)
                          return acc
                        }, {} as Record<string, string[]>)
                      ).map(([category, subjects]) => (
                        <div key={category}>
                          <div className="px-2 py-1 text-sm font-semibold text-gray-500">{category}</div>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level *</Label>
                  <Select 
                    value={formData.grade_level} 
                    onValueChange={(value) => handleInputChange('grade_level', value)}
                    disabled={!formData.subject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.subject ? "Select grade" : "Select subject first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableGrades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Child Selection for Parents */}
              {profile?.user_type === 'parent' && children.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="child">Select Child</Label>
                  <Select value={formData.child_id} onValueChange={(value) => handleInputChange('child_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose which child needs tutoring" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name} - {child.grade_level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.child_id && (
                    <p className="text-sm text-gray-500">
                      Selected: {children.find(c => c.id === formData.child_id)?.name}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your child's current level, specific areas where they need help, learning goals, and any other relevant information..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Session Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Session Preferences</span>
              </CardTitle>
              <CardDescription>
                How would you like the tutoring sessions to be structured?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Session Type *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sessionTypes.map((type) => (
                    <div 
                      key={type.value}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.session_type === type.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('session_type', type.value)}
                    >
                      <div className="flex items-center space-x-3">
                        {type.icon && <type.icon className="h-5 w-5 text-blue-600" />}
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessions-per-week">Sessions per Week</Label>
                  <Select 
                    value={formData.sessions_per_week.toString()} 
                    onValueChange={(value) => handleInputChange('sessions_per_week', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 session/week</SelectItem>
                      <SelectItem value="2">2 sessions/week</SelectItem>
                      <SelectItem value="3">3 sessions/week</SelectItem>
                      <SelectItem value="4">4 sessions/week</SelectItem>
                      <SelectItem value="5">5 sessions/week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Session Duration</Label>
                  <Select 
                    value={formData.session_duration_minutes.toString()} 
                    onValueChange={(value) => handleInputChange('session_duration_minutes', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-sessions">Total Sessions Needed</Label>
                  <Input
                    id="total-sessions"
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.total_sessions}
                    onChange={(e) => handleInputChange('total_sessions', e.target.value)}
                    min="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span>Budget & Timeline</span>
              </CardTitle>
              <CardDescription>
                Set your budget and preferred start date
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget per Session (ETB) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="150"
                    value={formData.budget_per_session}
                    onChange={(e) => handleInputChange('budget_per_session', e.target.value)}
                    min="50"
                    required
                  />
                  <p className="text-sm text-gray-500">Typical range: 100-300 ETB per session</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Preferred Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => handleInputChange('start_date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Urgency Level</Label>
                <div className="space-y-2">
                  {urgencyLevels.map((level) => (
                    <div 
                      key={level.value}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        formData.urgency === level.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInputChange('urgency', level.value)}
                    >
                      <div className={`font-medium ${level.color}`}>
                        {level.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location (for home tutoring) */}
          {formData.session_type !== 'online' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Location Details</span>
                </CardTitle>
                <CardDescription>
                  Where should the tutor come for home sessions?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subcity">Sub-City *</Label>
                    <Select value={formData.location_subcity} onValueChange={(value) => handleInputChange('location_subcity', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sub-city" />
                      </SelectTrigger>
                      <SelectContent>
                        {addisAbabaSubcities.map((subcity) => (
                          <SelectItem key={subcity} value={subcity}>
                            {subcity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kebele">Kebele</Label>
                    <Input
                      id="kebele"
                      placeholder="e.g., Kebele 03"
                      value={formData.location_kebele}
                      onChange={(e) => handleInputChange('location_kebele', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location-details">Specific Location/Landmarks</Label>
                  <Textarea
                    id="location-details"
                    placeholder="Provide specific address, nearby landmarks, or detailed directions..."
                    value={formData.location_details}
                    onChange={(e) => handleInputChange('location_details', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tutor Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Tutor Preferences</span>
              </CardTitle>
              <CardDescription>
                Any specific requirements for your ideal tutor?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender-preference">Gender Preference</Label>
                  <Select value={formData.tutor_gender_preference} onValueChange={(value: any) => handleInputChange('tutor_gender_preference', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no_preference">No Preference</SelectItem>
                      <SelectItem value="male">Male Tutor</SelectItem>
                      <SelectItem value="female">Female Tutor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Minimum Experience (years)</Label>
                  <Select 
                    value={formData.tutor_experience_min.toString()} 
                    onValueChange={(value) => handleInputChange('tutor_experience_min', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Experience Level</SelectItem>
                      <SelectItem value="1">1+ years</SelectItem>
                      <SelectItem value="2">2+ years</SelectItem>
                      <SelectItem value="3">3+ years</SelectItem>
                      <SelectItem value="5">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Special Requirements</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="e.g., Experience with ADHD students, Exam preparation specialist"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement} variant="outline">
                    Add
                  </Button>
                </div>

                {formData.special_requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.special_requirements.map((req) => (
                      <Badge key={req} variant="secondary" className="cursor-pointer" onClick={() => removeRequirement(req)}>
                        {req} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Ready to find the perfect tutor for your child?
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Posting Request...
                    </>
                  ) : (
                    'Find My Tutor'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
} 