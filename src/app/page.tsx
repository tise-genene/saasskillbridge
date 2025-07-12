'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, MapPin, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-amber-500">
                <span className="text-sm font-bold text-white">🦅</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                Eagle Tutorials
              </span>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-xs text-blue-800"
              >
                ADDIS ABABA
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🎓 Transforming Education in Ethiopia
            </Badge>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
              Find the Perfect{' '}
              <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                Tutor
              </span>{' '}
              in Minutes
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-600">
              Connect with vetted, expert tutors in Addis Ababa for both online
              and home-based learning. No more endless searching on Telegram -
              find quality education that fits your schedule and budget.
            </p>
            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/auth?mode=signup&type=parent">
                <Button
                  size="lg"
                  className="bg-blue-600 px-8 py-6 text-lg hover:bg-blue-700"
                >
                  Find a Tutor Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth?mode=signup&type=tutor">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-600 px-8 py-6 text-lg text-blue-600 hover:bg-blue-50"
                >
                  Become a Tutor
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              Join 500+ families and tutors already using Our Platform in
              Ethiopia
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Say Goodbye to Telegram Tutor Hunting
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              We&apos;re solving the massive inefficiency in how parents find
              quality tutors in Addis Ababa.
            </p>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-red-600">
                The Old Way
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">❌</span>
                  Searching through countless Telegram channels
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">❌</span>
                  No verification of tutor credentials
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">❌</span>
                  Unclear pricing and payment methods
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">❌</span>
                  No reviews or track record visibility
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">❌</span>
                  Difficult scheduling and communication
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold text-blue-600">
                The Eagle Way
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 text-blue-500" />
                  Smart matching based on subject, location & budget
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 text-blue-500" />
                  Verified tutors with education credentials
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 text-blue-500" />
                  Transparent pricing with secure payments
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 text-blue-500" />
                  Real reviews from verified families
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 text-blue-500" />
                  Built-in scheduling and secure messaging
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Why Choose Eagle Tutorials?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Built specifically for the Ethiopian education market with
              features that matter most to local families.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-3">
            <Card className="border-blue-200 bg-white text-center shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <MapPin className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <CardTitle className="text-blue-900">
                  Location-Based Matching
                </CardTitle>
                <CardDescription>
                  Find tutors in your neighborhood in Addis Ababa for convenient
                  home visits
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200 bg-white text-center shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Shield className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <CardTitle className="text-blue-900">Verified Tutors</CardTitle>
                <CardDescription>
                  All tutors undergo credential verification and background
                  checks
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-blue-200 bg-white text-center shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <Clock className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <CardTitle className="text-blue-900">
                  Flexible Scheduling
                </CardTitle>
                <CardDescription>
                  Book sessions that fit your family&apos;s schedule with
                  real-time availability
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            How It Works in 3 Simple Steps
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-blue-200 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle className="text-blue-900">
                  Tell Us What You Need
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Select the subject, grade level, preferred location, and
                  whether you want online or home tutoring.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <CardTitle className="text-blue-900">
                  Get Matched & Book
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our smart algorithm finds the best tutors for your needs.
                  Review profiles, read reviews, and book sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <CardTitle className="text-blue-900">Learn & Succeed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Start learning with verified tutors, track progress, and watch
                  grades improve with personalized attention.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Trusted by Families Across Addis Ababa
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-blue-200 bg-white">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
                <p className="mb-4 italic text-slate-600">
                  &quot;Finding a reliable math tutor for my daughter used to
                  take weeks. With Eagle Tutorials, I found the perfect match in
                  just one day!&quot;
                </p>
                <p className="font-semibold text-slate-900">
                  - Almaz T., Parent
                </p>
                <p className="text-sm text-slate-500">Bole, Addis Ababa</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
                <p className="mb-4 italic text-slate-600">
                  &quot;The platform makes it so easy to manage my students and
                  schedule. I can focus on teaching instead of administration."
                </p>
                <p className="font-semibold text-slate-900">
                  - Fikir M., Chemistry Tutor
                </p>
                <p className="text-sm text-slate-500">
                  Addis Ababa University Graduate
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
                <p className="mb-4 italic text-slate-600">
                  &quot;My son&apos;s English grades improved dramatically after
                  just 6 sessions. The tutor was professional and really
                  understood his needs."
                </p>
                <p className="font-semibold text-slate-900">
                  - Sarah G., Parent
                </p>
                <p className="text-sm text-slate-500">Kazanchis, Addis Ababa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Find Your Child&apos;s Perfect Tutor?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Join hundreds of families in Addis Ababa who have found quality
            education through Eagle Tutorials.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/auth?mode=signup&type=parent">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg"
              >
                Find a Tutor Today
              </Button>
            </Link>
            <Link href="/auth?mode=signup&type=tutor">
              <Button
                size="lg"
                variant="outline"
                className="border-white px-8 py-6 text-lg text-blue-600 hover:bg-white hover:text-blue-800"
              >
                Start Teaching & Earning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-amber-500">
                  <span className="text-sm font-bold text-white">🦅</span>
                </div>
                <span className="text-xl font-bold">Eagle Tutorials</span>
              </div>
              <p className="text-sm text-slate-400">
                Connecting students with expert tutors across Addis Ababa for
                personalized, quality education.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">For Parents</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/find-tutor" className="hover:text-white">
                    Find a Tutor
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">For Tutors</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/become-tutor" className="hover:text-white">
                    Become a Tutor
                  </Link>
                </li>
                <li>
                  <Link href="/tutor-requirements" className="hover:text-white">
                    Requirements
                  </Link>
                </li>
                <li>
                  <Link href="/tutor-resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} Eagle Tutorials Services. All
              rights reserved. Made with ❤️ in Addis Ababa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
