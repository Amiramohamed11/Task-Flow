"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Page() {
  const [errorApi, seterrorApi] = useState(null);
  const router = useRouter();


  const signupSchema = z
    .object({
      name: z.string().min(1, { message: "First name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      rePassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  type ISignup = z.infer<typeof signupSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ISignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<ISignup> = async ({
  
    email,
    password,
    
  }) => {
    const user = {  email, password };
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      user
    )
    .then(   (res)=>{console.log(res)
      router.push("/home"); // ✅ التحويل بعد النجاح

    }  )
    .catch(  (error)=>{
      seterrorApi(error.response.data.message);
    }     )

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>

        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register("name")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("rePassword")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">{errors.rePassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
        {errorApi && (
  <p className="text-red-500 text-sm mt-2 text-center">{errorApi}</p>
)}
      </form>
    </div>
  );
}
