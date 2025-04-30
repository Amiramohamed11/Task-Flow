"use client"
import React from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
export default function page() {

  const signupSchema = z.object({
    first_name:z.string().min(1,{message:"first Name is Required"}),
    last_name:z.string().min(1,{message:"last Name is Required"}),
    email:z.
    string().min(1,{message:"Email is Required"})
    .email({message:"Not Valid email"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters"}),
    confirm_password: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ['confirm_password'],

  })
  type Isignup = z.infer<typeof signupSchema>

  const {handleSubmit,register,formState:{errors,isSubmitting}}= useForm<Isignup>({
    mode:"onChange",
    resolver:zodResolver(signupSchema)
  });
  const onSubmit:SubmitHandler<Isignup> =({first_name,last_name,email,
    password})=>{
const user ={
  first_name,
  last_name,
  email,
  password,
};
console.log(user);

  };
  return (
    <>
    <h2 className='m-5'>Welcome back</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder='Enter Your First Name' 
      {...register('first_name')}
      />
      {errors.first_name && <span style={{color:"red"}}>{errors.first_name.message}</span>}
      <input type="text" placeholder='Enter Your Last Name' 
            {...register('last_name')}
/>
{errors.last_name && <span style={{color:"red"}}>{errors.last_name.message}</span>}

      <input type="email" placeholder='Enter Your Email'       {...register('email')}
      />
      {errors.email && <span style={{color:"red"}}>{errors.email.message}</span>}

      <input type="password" placeholder='Enter Your Password'       {...register('password')}
 />
       {errors.password && <span style={{color:"red"}}>{errors.password.message}</span>}

      <input type="password" placeholder='Enter Your Confirm Password' 
            {...register('confirm_password')}
 />
<button type='submit' className='bg-blue-500 p-5 rounded-lg m-5' disabled={isSubmitting}>Signup</button>
    </form>
    </>
  )
}
