'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertCircle,
  ArrowLeft,
  Plus,
  BookOpen,
  School,
  Edit,
  Trash2,
  GraduationCap,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const gradeOptions = [
  'Pre-K',
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
];

const ethiopianSubjects = [
  'Mathematics',
  'English',
  'Amharic',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Civics',
  'Computer Science',
  'Art',
  'Physical Education',
];

const learningStyles = [
  {
    value: 'visual',
    label: 'Visual Learner',
    description: 'Learns best through seeing and visual aids',
  },
  {
    value: 'auditory',
    label: 'Auditory Learner',
    description: 'Learns best through hearing and discussion',
  },
  {
    value: 'kinesthetic',
    label: 'Kinesthetic Learner',
    description: 'Learns best through hands-on activities',
  },
  {
    value: 'mixed',
    label: 'Mixed Learning Style',
    description: 'Benefits from multiple learning approaches',
  },
];

interface Child {
  id: string;
  name: string;
  age: number;
  grade_level: string;
  school_name: string;
  subjects_struggling: string[];
  learning_style: string;
  special_needs: string;
  created_at: string;
}

export default function ChildrenManagement() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade_level: '',
    school_name: '',
    subjects_struggling: [] as string[],
    learning_style: '',
    special_needs: '',
  });

  useEffect(() => {
    if (!loading && (!user || profile?.user_type !== 'parent')) {
      router.push('/auth');
    }
    // TODO: Load children from Supabase
    loadChildren();
  }, [user, profile, loading, router]);

  const loadChildren = async () => {
    // TODO: Implement Supabase query
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
        created_at: '2024-01-15',
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!formData.name || !formData.age || !formData.grade_level) {
        throw new Error('Please fill in all required fields');
      }

      if (parseInt(formData.age) < 3 || parseInt(formData.age) > 25) {
        throw new Error('Age must be between 3 and 25');
      }

      // TODO: Submit to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate adding the child
      const newChild: Child = {
        id: Date.now().toString(),
        name: formData.name,
        age: parseInt(formData.age),
        grade_level: formData.grade_level,
        school_name: formData.school_name,
        subjects_struggling: formData.subjects_struggling,
        learning_style: formData.learning_style,
        special_needs: formData.special_needs,
        created_at: new Date().toISOString(),
      };

      if (editingChild) {
        setChildren(prev =>
          prev.map(child =>
            child.id === editingChild.id
              ? { ...newChild, id: editingChild.id }
              : child
          )
        );
        setEditingChild(null);
      } else {
        setChildren(prev => [...prev, newChild]);
      }

      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      grade_level: '',
      school_name: '',
      subjects_struggling: [],
      learning_style: '',
      special_needs: '',
    });
    setError('');
  };

  const handleEdit = (child: Child) => {
    setFormData({
      name: child.name,
      age: child.age.toString(),
      grade_level: child.grade_level,
      school_name: child.school_name,
      subjects_struggling: child.subjects_struggling,
      learning_style: child.learning_style,
      special_needs: child.special_needs,
    });
    setEditingChild(child);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (childId: string) => {
    if (
      confirm('Are you sure you want to remove this child from your account?')
    ) {
      // TODO: Delete from Supabase
      setChildren(prev => prev.filter(child => child.id !== childId));
    }
  };

  const addSubject = (subject: string) => {
    if (!formData.subjects_struggling.includes(subject)) {
      setFormData(prev => ({
        ...prev,
        subjects_struggling: [...prev.subjects_struggling, subject],
      }));
    }
  };

  const removeSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects_struggling: prev.subjects_struggling.filter(s => s !== subject),
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user || !profile || profile.user_type !== 'parent') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-2xl font-bold text-gray-900">
                  My Children
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your children's profiles and tutoring needs
                </p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={resetForm}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Child
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingChild ? 'Edit Child Profile' : 'Add New Child'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingChild
                      ? "Update your child's information and learning preferences."
                      : "Add your child's information to help us find the perfect tutor."}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Child's Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Meron Tadesse"
                        value={formData.name}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="e.g., 15"
                        value={formData.age}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            age: e.target.value,
                          }))
                        }
                        min="3"
                        max="25"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level *</Label>
                      <Select
                        value={formData.grade_level}
                        onValueChange={value =>
                          setFormData(prev => ({ ...prev, grade_level: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeOptions.map(grade => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school">School Name</Label>
                      <Input
                        id="school"
                        placeholder="e.g., Addis Ababa Preparatory School"
                        value={formData.school_name}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            school_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Subjects Struggling With */}
                  <div className="space-y-3">
                    <Label>Subjects that need help with</Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {ethiopianSubjects.map(subject => (
                        <Button
                          key={subject}
                          type="button"
                          variant={
                            formData.subjects_struggling.includes(subject)
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() =>
                            formData.subjects_struggling.includes(subject)
                              ? removeSubject(subject)
                              : addSubject(subject)
                          }
                          className="justify-start"
                        >
                          {subject}
                        </Button>
                      ))}
                    </div>
                    {formData.subjects_struggling.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.subjects_struggling.map(subject => (
                          <Badge
                            key={subject}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeSubject(subject)}
                          >
                            {subject} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Learning Style */}
                  <div className="space-y-3">
                    <Label>Learning Style</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {learningStyles.map(style => (
                        <div
                          key={style.value}
                          className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                            formData.learning_style === style.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() =>
                            setFormData(prev => ({
                              ...prev,
                              learning_style: style.value,
                            }))
                          }
                        >
                          <div className="font-medium">{style.label}</div>
                          <div className="text-sm text-gray-600">
                            {style.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Needs */}
                  <div className="space-y-2">
                    <Label htmlFor="special-needs">
                      Special Requirements or Learning Needs
                    </Label>
                    <Textarea
                      id="special-needs"
                      placeholder="Any special requirements, learning difficulties, or notes for tutors..."
                      value={formData.special_needs}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          special_needs: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddDialogOpen(false);
                        setEditingChild(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                          {editingChild ? 'Updating...' : 'Adding...'}
                        </>
                      ) : editingChild ? (
                        'Update Child'
                      ) : (
                        'Add Child'
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children.length === 0 ? (
          <Card className="py-12 text-center">
            <CardContent>
              <GraduationCap className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No children added yet
              </h3>
              <p className="mb-6 text-gray-600">
                Add your children's profiles to start finding them the perfect
                tutors.
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Child
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {children.map(child => (
              <Card
                key={child.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{child.name}</CardTitle>
                      <CardDescription>
                        {child.age} years old • {child.grade_level}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(child)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(child.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {child.school_name && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <School className="h-4 w-4" />
                      <span>{child.school_name}</span>
                    </div>
                  )}

                  {child.subjects_struggling.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-medium text-gray-700">
                        Needs help with:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {child.subjects_struggling.map(subject => (
                          <Badge
                            key={subject}
                            variant="secondary"
                            className="text-xs"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {child.learning_style && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">
                        Learning Style:{' '}
                      </span>
                      <span className="capitalize">
                        {child.learning_style} learner
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() =>
                        router.push(`/post-skill-request?child=${child.id}`)
                      }
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Find Tutor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
