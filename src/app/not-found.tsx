'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] px-6 py-12 text-white">
      <Card className="max-w-xl w-full bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <Ghost className="w-14 h-14 text-purple-500 animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight">
            Oops! Page not found
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. But don’t worry — we’ll guide you back!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              onClick={() => router.back()}
              variant="secondary"
              className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
