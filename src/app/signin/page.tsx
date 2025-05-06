'use client';

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { getSession } from "next-auth/react";
import SigninWithGoogle from '../_components/SigninWithGoogle';

export default function SigninPage() {
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const router = useRouter();

  // ✅ إعادة التوجيه إذا كان المستخدم مسجلاً الدخول
  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.push('/home');
      }
    });
  }, [router]);

  // ✅ مخطط التحقق
  const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  type ISignin = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ISignin>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // ✅ عند الضغط على زر تسجيل الدخول
  const onSubmit: SubmitHandler<ISignin> = async (values) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log("✅ تسجيل الدخول ناجح:", response.data);
      router.push("/home");
    } catch (error: any) {
      const message = error?.response?.data?.message || "حدث خطأ في تسجيل الدخول.";
      setErrorApi(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">ًWelcome Back</h2>
<h6 className="font-bold text-center">sign in your account</h6>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200"
        >
          {isSubmitting ? "Submitting..." : "Sign In"}
        </button>

        {errorApi && (
          <p className="text-red-500 text-sm mt-2 text-center">{errorApi}</p>
        )}
        <SigninWithGoogle />

        <p className="font-bold text-center">Dont have an  account ? <span>Sign Up</span>
         </p>
      </form>
    </div>
  );
}
