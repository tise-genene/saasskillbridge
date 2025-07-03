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
import { AlertCircle, ArrowLeft, BookOpen, DollarSign, MapPin, Tag, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const skillCategories = [
  'Mathematics',
  'Science',
  'Languages',
  'Programming',
  'Business',
  'Arts',
  'Music',
  'Sports',
  'Other'
]

const locationTypes = [
  { value: 'online', label: 'Online Only' },
  { value: 'in_person', label: 'In-Person Only' },
  { value: 'hybrid', label: 'Both Online & In-Person' }
]

export default function PostSkillRequest() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skill_category: '',
    skill_level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    budget_min: '',
    budget_max: '',
    duration_weeks: '',
    location_type: 'online' as 'online' | 'in_person' | 'hybrid',
    location: '',
    tags: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && (!user || (profile?.user_type !== 'learner'))) {
      router.push('/auth')
    }
  }, [user, profile, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.skill_category || !formData.budget_min || !formData.budget_max || !formData.duration_weeks) {
        throw new Error('Please fill in all required fields')
      }

      if (parseInt(formData.budget_min) >= parseInt(formData.budget_max)) {
        throw new Error('Maximum budget must be greater than minimum budget')
      }

             // Here you would normally save to Supabase
       // For now, we'll just simulate success
       await new Promise(resolve => setTimeout(resolve, 1000))
       throw new Error('Database not available. Please configure Supabase.')

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleInputChange = (field: string, value: string) => {
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

  if (!user || !profile || (profile.user_type !== 'learner')) {
    return null
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-900">Request Posted Successfully!</CardTitle>
            <CardDescription>
              Your skill request has been posted. Instructors will start applying soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Back to Dashboard
            </Button>
            <Button 
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  title: '',
                  description: '',
                  skill_category: '',
                  skill_level: 'beginner',
                  budget_min: '',
                  budget_max: '',
                  duration_weeks: '',
                  location_type: 'online',
                  location: '',
                  tags: []
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
                <h1 className="text-2xl font-bold text-gray-900">Post a Skill Request</h1>
                <p className="text-sm text-gray-500">Find the perfect instructor for your learning goals</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Posting as:</span>
              <Badge variant="outline">{profile.full_name}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Tell us what you want to learn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Request Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Learn Advanced Mathematics for University Prep"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to learn, your current level, and any specific goals..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Skill Category *</Label>
                  <Select value={formData.skill_category} onValueChange={(value) => handleInputChange('skill_category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Your Current Level *</Label>
                  <Select value={formData.skill_level} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => handleInputChange('skill_level', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                      <SelectItem value="advanced">Advanced - Looking to master</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Duration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Budget & Duration</span>
              </CardTitle>
              <CardDescription>
                Set your budget and learning timeline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget-min">Minimum Budget (ETB/hour) *</Label>
                  <Input
                    id="budget-min"
                    type="number"
                    placeholder="50"
                    value={formData.budget_min}
                    onChange={(e) => handleInputChange('budget_min', e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget-max">Maximum Budget (ETB/hour) *</Label>
                  <Input
                    id="budget-max"
                    type="number"
                    placeholder="200"
                    value={formData.budget_max}
                    onChange={(e) => handleInputChange('budget_max', e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Expected Duration (weeks) *</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="8"
                  value={formData.duration_weeks}
                  onChange={(e) => handleInputChange('duration_weeks', e.target.value)}
                  min="1"
                  max="52"
                  required
                />
                <p className="text-sm text-gray-500">How many weeks do you expect this learning journey to take?</p>
              </div>
            </CardContent>
          </Card>

          {/* Location Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location Preferences</span>
              </CardTitle>
              <CardDescription>
                How would you like to learn?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location-type">Learning Format *</Label>
                <Select value={formData.location_type} onValueChange={(value: 'online' | 'in_person' | 'hybrid') => handleInputChange('location_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select learning format" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.location_type !== 'online' && (
                <div className="space-y-2">
                  <Label htmlFor="location">Location Details</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Addis Ababa, Bole area"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Specify your preferred location for in-person sessions</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Tags</span>
              </CardTitle>
              <CardDescription>
                Add relevant tags to help instructors find your request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a tag (e.g., exam-prep, beginner-friendly)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add Tag
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
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
                  Ready to find your perfect instructor?
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Posting...
                    </>
                  ) : (
                    'Post Request'
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