'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Users, TrendingUp, Globe, DollarSign, CheckCircle, MapPin, Clock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦅</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Eagle Tutorials</span>
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">ADDIS ABABA</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🎓 Transforming Education in Ethiopia
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Find the Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">Tutor</span> in Minutes
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with vetted, expert tutors in Addis Ababa for both online and home-based learning. 
              No more endless searching on Telegram - find quality education that fits your schedule and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth?mode=signup&type=parent">
                <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                  Find a Tutor Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth?mode=signup&type=tutor">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-50">
                  Become a Tutor
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              Join 500+ families and tutors already using Our Platform in Ethiopia
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Say Goodbye to Telegram Tutor Hunting
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We&apos;re solving the massive inefficiency in how parents find quality tutors in Addis Ababa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">The Old Way</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  Searching through countless Telegram channels
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  No verification of tutor credentials
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  Unclear pricing and payment methods
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  No reviews or track record visibility
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  Difficult scheduling and communication
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">The Eagle Way</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
                  Smart matching based on subject, location & budget
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
                  Verified tutors with education credentials
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
                  Transparent pricing with secure payments
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
                  Real reviews from verified families
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-500 mr-2 h-5 w-5 mt-0.5" />
                  Built-in scheduling and secure messaging
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Eagle Tutorials?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built specifically for the Ethiopian education market with features that matter most to local families.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-blue-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Location-Based Matching</CardTitle>
                <CardDescription>Find tutors in your neighborhood in Addis Ababa for convenient home visits</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-blue-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Verified Tutors</CardTitle>
                <CardDescription>All tutors undergo credential verification and background checks</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-blue-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Flexible Scheduling</CardTitle>
                <CardDescription>Book sessions that fit your family&apos;s schedule with real-time availability</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>  
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            How It Works in 3 Simple Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle className="text-blue-900">Tell Us What You Need</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Select the subject, grade level, preferred location, and whether you want online or home tutoring.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <CardTitle className="text-blue-900">Get Matched & Book</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our smart algorithm finds the best tutors for your needs. Review profiles, read reviews, and book sessions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <CardTitle className="text-blue-900">Learn & Succeed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Start learning with verified tutors, track progress, and watch grades improve with personalized attention.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Trusted by Families Across Addis Ababa
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
                <p className="text-slate-600 italic mb-4">
                  &quot;Finding a reliable math tutor for my daughter used to take weeks. With Eagle Tutorials, I found the perfect match in just one day!&quot;
                </p>
                <p className="font-semibold text-slate-900">- Almaz T., Parent</p>
                <p className="text-sm text-slate-500">Bole, Addis Ababa</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
                <p className="text-slate-600 italic mb-4">
                  &quot;The platform makes it so easy to manage my students and schedule. I can focus on teaching instead of administration."
                </p>
                <p className="font-semibold text-slate-900">- Fikir M., Chemistry Tutor</p>
                <p className="text-sm text-slate-500">Addis Ababa University Graduate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
                <p className="text-slate-600 italic mb-4">
                  &quot;My son&apos;s English grades improved dramatically after just 6 sessions. The tutor was professional and really understood his needs."
                </p>
                <p className="font-semibold text-slate-900">- Sarah G., Parent</p>
                <p className="text-sm text-slate-500">Kazanchis, Addis Ababa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Child&apos;s Perfect Tutor?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of families in Addis Ababa who have found quality education through Eagle Tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?mode=signup&type=parent">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Find a Tutor Today
              </Button>
            </Link>
            <Link href="/auth?mode=signup&type=tutor">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-blue-600 hover:bg-white hover:text-blue-800">
                Start Teaching & Earning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🦅</span>
                </div>
                <span className="text-xl font-bold">Eagle Tutorials</span>
              </div>
              <p className="text-slate-400 text-sm">
                Connecting students with expert tutors across Addis Ababa for personalized, quality education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Parents</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/find-tutor" className="hover:text-white">Find a Tutor</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Tutors</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/become-tutor" className="hover:text-white">Become a Tutor</Link></li>
                <li><Link href="/tutor-requirements" className="hover:text-white">Requirements</Link></li>
                <li><Link href="/tutor-resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Eagle Tutorials Services. All rights reserved. Made with ❤️ in Addis Ababa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
