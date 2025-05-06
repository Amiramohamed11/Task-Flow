"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

export default function SigninWithGoogle() {
  return (
    <button type='button' onClick={()=> signIn('google')} className='border-2 m-5 rounded-lg p-5 '>Google</button>
  )
}
