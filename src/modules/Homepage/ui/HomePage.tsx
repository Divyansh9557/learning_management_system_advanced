/* eslint-disable @next/next/no-img-element */

import { HeroGeometric } from '../components/HeroSection'; 
import { Card, CardContent} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, TrendingUp, Star, Play, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
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

  const popularCourses = [
    {
      title: 'Full Stack Web Development',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: '12,450',
      duration: '40 hours',
      price: '$99',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
    },
    {
      title: 'Data Science with Python',
      instructor: 'Dr. Michael Chen',
      rating: 4.8,
      students: '8,930',
      duration: '35 hours',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop'
    },
    {
      title: 'UI/UX Design Mastery',
      instructor: 'Emily Roberts',
      rating: 4.9,
      students: '15,670',
      duration: '28 hours',
      price: '$79',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=250&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303]">
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
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">LearnHub</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Experience the future of online learning with our cutting-edge platform designed for modern learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
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
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
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
              Popular <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">Courses</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Join thousands of students already learning with our most popular courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <Card key={index} className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm overflow-hidden hover:bg-white/[0.05] transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Button size="sm" className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-white/60 mb-4">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                    <div>{course.duration}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{course.price}</span>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                      Enroll Now
                    </Button>
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
            Ready to Start Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">Learning Journey?</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their careers through our comprehensive learning platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3">
              Start Learning Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3">
              Browse Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage