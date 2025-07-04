"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof formSchema>;

export default function SignUp() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    setPending(true);
    authClient.signUp.email(
      {
        email: data.email,
        name: data.name,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (err) => {
          setPending(false);
          console.log(err);
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
          console.log(error.error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">Create your account</h2>
          <p className="text-sm text-zinc-400 mb-6">Sign up to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="bg-zinc-800 text-white border border-zinc-700 focus:border-white focus:ring-0 placeholder:text-zinc-400"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                autoComplete="off"
                placeholder="m@example.com"
                {...register("email")}
                className="bg-zinc-800 text-white border border-zinc-700 focus:border-white focus:ring-0 placeholder:text-zinc-400"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
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
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              disabled={pending}
              type="submit"
              className={`w-full bg-zinc-700 hover:bg-zinc-600 text-white ${
                pending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Sign up
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
              className="w-[50%] border-zinc-600 bg-gray-400 text-black hover:bg-zinc-800"
            >
              <FaGoogle className="text-black" />
            </Button>
            <Button
              onClick={() => onSocial("github")}
              disabled={pending}
              variant="outline"
              className="w-[50%] border-zinc-600 bg-gray-400 text-black hover:bg-zinc-800"
            >
              <FaGithub />
            </Button>
          </div>

          <p className="text-center text-sm text-zinc-400 mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-zinc-100 underline">
              Sign in
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
        <div className="w-full hidden md:w-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 md:flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🌀</div>
            <h2 className="text-2xl font-bold">Learn Hub</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
