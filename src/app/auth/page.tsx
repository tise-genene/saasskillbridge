'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  Loader2,
  Heart,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'parent' | 'student' | 'tutor'>(
    'parent'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { signUp, signIn } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email || !password || !fullName) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { user, error } = await signUp(email, password, userType, fullName);

    if (error) {
      setError(error);
    } else if (user) {
      setSuccess(
        'Account created successfully! Please check your email to verify your account.'
      );
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }

    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const { user, error } = await signIn(email, password);

    if (error) {
      setError(error);
    } else if (user) {
      setSuccess('Signed in successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }

    setLoading(false);
  };

  const userTypeDescriptions = {
    parent: {
      icon: Heart,
      title: 'Find Tutors for My Child',
      description:
        "Search for qualified tutors, book sessions, and track your child's progress",
      benefits: [
        'Browse verified tutors',
        'Book home or online sessions',
        'Track learning progress',
        'Secure payments',
      ],
    },
    student: {
      icon: GraduationCap,
      title: 'Learn with Expert Tutors',
      description: 'Find tutors for your subjects and excel in your studies',
      benefits: [
        'Get personalized learning',
        'Improve your grades',
        'Flexible scheduling',
        'Build confidence',
      ],
    },
    tutor: {
      icon: BookOpen,
      title: 'Teach & Earn',
      description:
        'Share your expertise, help students succeed, and earn money',
      benefits: [
        'Flexible schedule',
        'Competitive earnings',
        'Verified students',
        'Build reputation',
      ],
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-amber-500">
              <span className="text-xl font-bold text-white">🦅</span>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome to Eagle Tutorials
          </h1>
          <p className="text-gray-600">
            Connecting students with expert tutors across Addis Ababa
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to access your Eagle Tutorials account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Join Eagle Tutorials</CardTitle>
                <CardDescription>
                  Choose your role and start your tutoring journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-6">
                  {/* User Type Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">I am a...</Label>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(userTypeDescriptions).map(
                        ([type, config]) => {
                          const IconComponent = config.icon;
                          return (
                            <div
                              key={type}
                              className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                                userType === type
                                  ? 'border-blue-500 bg-blue-50 shadow-md'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() =>
                                setUserType(
                                  type as 'parent' | 'student' | 'tutor'
                                )
                              }
                            >
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`rounded-lg p-2 ${userType === type ? 'bg-blue-100' : 'bg-gray-100'}`}
                                >
                                  <IconComponent
                                    className={`h-5 w-5 ${userType === type ? 'text-blue-600' : 'text-gray-600'}`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3
                                    className={`font-medium ${userType === type ? 'text-blue-900' : 'text-gray-900'}`}
                                  >
                                    {config.title}
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-600">
                                    {config.description}
                                  </p>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {config.benefits
                                      .slice(0, 2)
                                      .map((benefit, idx) => (
                                        <span
                                          key={idx}
                                          className={`rounded-full px-2 py-1 text-xs ${
                                            userType === type
                                              ? 'bg-blue-100 text-blue-700'
                                              : 'bg-gray-100 text-gray-600'
                                          }`}
                                        >
                                          {benefit}
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input
                        id="full-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password (min 6 characters)"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      `Get Started as ${userTypeDescriptions[userType].title.split(' ')[0]}`
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    By creating an account, you agree to our terms of service
                    and privacy policy.
                    {userType === 'tutor' && (
                      <div className="mt-2 rounded border border-amber-200 bg-amber-50 p-2 text-amber-800">
                        <strong>Note:</strong> Tutor accounts require
                        verification before you can accept students.
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="whitespace-pre-line">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mt-4 border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Made with ❤️ for Ethiopian education •
            <Link href="/" className="ml-1 text-blue-600 hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
