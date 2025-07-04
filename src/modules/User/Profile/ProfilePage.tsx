
import React from 'react';
import {  Mail, Phone, MapPin, Calendar, Award, BookOpen, Clock, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const userStats = [
    { label: 'Courses Completed', value: '12', icon: BookOpen, color: 'from-emerald-500 to-cyan-500' },
    { label: 'Learning Hours', value: '156', icon: Clock, color: 'from-violet-500 to-purple-500' },
    { label: 'Certificates', value: '8', icon: Award, color: 'from-rose-500 to-pink-500' },
    { label: 'Current Streak', value: '15 days', icon: Calendar, color: 'from-amber-500 to-orange-500' },
  ];

  const achievements = [
    { name: 'Quick Learner', description: 'Completed 5 courses in a month', earned: true },
    { name: 'Perfect Score', description: 'Scored 100% on 3 quizzes', earned: true },
    { name: 'Consistent Learner', description: '30-day learning streak', earned: false },
    { name: 'Knowledge Seeker', description: 'Completed 20 courses', earned: false },
  ];

  const recentCertificates = [
    { course: 'Advanced React Development', date: '2024-01-15', instructor: 'Sarah Johnson' },
    { course: 'JavaScript Fundamentals', date: '2024-01-10', instructor: 'Mike Chen' },
    { course: 'UI/UX Design Principles', date: '2024-01-05', instructor: 'Emily Roberts' },
  ];

  return (
    <div className="min-h-screen bg-[#030303] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-rose-500/10 rounded-2xl border border-white/[0.08] p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  JD
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">John Doe</h1>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-white/60 text-lg mb-4">Advanced Learner • Web Development Enthusiast</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/60">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined January 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <Card key={index} className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.earned ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/[0.02] border border-white/[0.05]'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-emerald-500' : 'bg-white/[0.05]'}`}>
                      <Award className={`w-5 h-5 ${achievement.earned ? 'text-white' : 'text-white/40'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? 'text-white' : 'text-white/60'}`}>
                        {achievement.name}
                      </h4>
                      <p className="text-white/40 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Certificates */}
          <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recent Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCertificates.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{cert.course}</h4>
                      <p className="text-white/60 text-sm">by {cert.instructor}</p>
                      <p className="text-white/40 text-xs">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
