"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (error) => {
          setPending(false);
          toast.error(error.error.message);
        },
      }
    );
  };

  const onSocial = (social: "google" | "github") => {
    setPending(true);
    authClient.signIn.social(
      {
        provider: social,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: (error) => {
          setPending(false);
          toast.error(error.error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-sm text-zinc-400 mb-6">Login to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                {...register("email")}
                className="bg-zinc-800 text-white border border-zinc-700 focus:border-white focus:ring-0 placeholder:text-zinc-400"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
                className="bg-zinc-800 text-white border border-zinc-700 focus:border-white focus:ring-0 placeholder:text-zinc-400"
              />
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              disabled={pending}
              type="submit"
              className={`w-full bg-zinc-700 hover:bg-zinc-600 text-white ${
                pending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Sign in
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-zinc-700" />
            <span className="mx-2 text-sm text-zinc-500">Or continue with</span>
            <div className="flex-grow h-px bg-zinc-700" />
          </div>

          <div className="flex space-x-4 mx-auto">
            <Button
              onClick={() => onSocial("google")}
              disabled={pending}
              variant="outline"
              className="w-[50%] border-zinc-600 bg-gray-400 text-black  hover:bg-zinc-800"
            >
              <FaGoogle  />
            </Button>
            <Button
              onClick={() => onSocial("github")}
              disabled={pending}
              variant="outline"
              className="w-[50%] border-zinc-600 bg-gray-400 text-black  hover:bg-zinc-800"
            >
              <FaGithub />
            </Button>
          </div>

          <p className="text-center text-sm text-zinc-400 mt-4">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-zinc-100 underline">
              Sign up
            </Link>
          </p>

          <p className="text-xs text-center text-zinc-500 mt-4">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Right - Branding */}
        <div className="w-full hidden md:w-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white md:flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🌀</div>
            <h2 className="text-2xl font-bold">LearnHub</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
