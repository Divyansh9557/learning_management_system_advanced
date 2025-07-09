'use client'
/* eslint-disable @next/next/no-img-element */
import { HeroGeometric } from '../components/HeroSection'; 
import { Card, CardContent} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, TrendingUp,  ArrowRight, CheckCircle } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const HomePage = () => {

  const trpc = useTRPC()
  const {data}= useSuspenseQuery(
     trpc.course.homePage.queryOptions()
  )

 const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with real-world experience',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Interactive Learning',
      description: 'Engage with peers and instructors in our vibrant community',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Certified Achievement',
      description: 'Earn recognized certificates to advance your career',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Students', icon: Users },
    { value: '200+', label: 'Expert Courses', icon: BookOpen },
    { value: '95%', label: 'Success Rate', icon: TrendingUp },
    { value: '24/7', label: 'Support', icon: CheckCircle }
  ];


  return (
    <div className=" max-h-[50%] md:min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <HeroGeometric
        badge="LearnHub LMS"
        title1="Elevate Your"
        title2="Learning Journey"
      />

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
                LearnHub
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Experience the future of online learning with our cutting-edge
              platform designed for modern learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-rose-500/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.05] border border-white/[0.08] mb-4">
                  <stat.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Popular{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
                Courses
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Join thousands of students already learning with our most popular
              courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((course, index) => (
              <Card
                key={index}
                className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm overflow-hidden hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={course.course.thumbnailUrl}
                    alt={course.course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {course.course.title}
                  </h3>
                  <p className="text-white/60 mb-4">
                    by {course.instructor.name}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      {course.course.price}
                    </span>
                    <Link href={`/browse?page=1`}>
                      <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-rose-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
              Learning Journey?
            </span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their
            careers through our comprehensive learning platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/courses"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3"
              >
                Start Learning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href={"/browse?page=1"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#0a0a0b] border-t border-white/10 px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-white/80">
          {/* Logo + About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">LearnHub</h3>
            <p className="text-sm text-white/60">
              Empowering learners worldwide through interactive, expert-led
              education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Stay Connected</h4>
            <div className="flex space-x-4 text-white/70">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-white"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/Divyansh9557"
                target="_blank"
                className="hover:text-white"
              >
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/divyansh-saini-398630354"
                target="_blank"
                className="hover:text-white"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage