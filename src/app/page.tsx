'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Users, TrendingUp, Globe, DollarSign, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="text-xl font-bold text-slate-900">SkillBridge</span>
              <Badge variant="secondary" className="text-xs">BETA</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button>Get Started</Button>
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
              🚀 Building the Future of Skills Exchange in Africa
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Skills Into Income</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The first skills-to-income platform designed for emerging markets. Connect learners with expert instructors, 
              from academic tutoring to professional skills that lead to real jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth?mode=signup&type=learner">
                <Button size="lg" className="text-lg px-8 py-6">
                  Find Your Next Skill <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth?mode=signup&type=instructor">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Start Teaching & Earning
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              Join 1,000+ learners and instructors already building skills in Ethiopia
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Replacing Manual, Telegram-Based Skills Exchange
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We&apos;re solving the massive inefficiency in how people learn and teach skills across Africa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">The Problem</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  Manual matching through Telegram channels
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  No quality control or instructor verification
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  Inconsistent pricing and payment issues
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  No success tracking or skill progression
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Solution</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  AI-powered smart matching system
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  Verified instructors with success metrics
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  Built-in payments with local Ethiopian options
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  Real income tracking and skill certification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Opportunity: 1.3 Billion People Learning Informally
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We&apos;re starting with Ethiopia but building the educational infrastructure for all of Africa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>1.3B People</CardTitle>
                <CardDescription>Learning informally across Africa</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>$50B Market</CardTitle>
                <CardDescription>Skills & education market size</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>40% Growth</CardTitle>
                <CardDescription>Annual online learning growth</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            How SkillBridge Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>1. Post Your Skill Need</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Describe what you want to learn, your budget, and timeline. Our AI matches you with the best instructors.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>2. Learn & Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Work with verified instructors, track your progress, and build real skills that lead to income opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>3. Generate Income</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Use your new skills to find work, start freelancing, or teach others. We track your success and income growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Phase Rollout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Our Growth Strategy
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Phase 1 - Now</Badge>
                <CardTitle className="text-lg">Academic Tutoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Math, Science, Languages in Ethiopia. Validating the model.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Phase 2 - Q2</Badge>
                <CardTitle className="text-lg">Professional Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Web development, design, digital marketing that lead to jobs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Phase 3 - Q3</Badge>
                <CardTitle className="text-lg">Trade Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Electrical, plumbing, crafts, and other hands-on skills.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Phase 4 - Q4</Badge>
                <CardTitle className="text-lg">Any Skill Exchange</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Cooking, music, languages - the complete skills marketplace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Bridge the Skills Gap?
          </h2>
          <p className="text-xl mb-8 opacity-90">
                         Join the platform that&apos;s transforming how Africa learns and earns. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?mode=signup&type=learner">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Learning
              </Button>
            </Link>
            <Link href="/auth?mode=signup&type=instructor">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600">
                Start Teaching
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="text-xl font-bold">SkillBridge</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm">
                © 2024 SkillBridge. Building the future of skills exchange in Africa.
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Made with ❤️ for emerging markets
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
