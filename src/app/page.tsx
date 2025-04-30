import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './lib/nextAuth'
import SigninWithGoogle from './_components/SigninWithGoogle';

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log('جلسة المستخدم:', session);

  return (
    <div className='container mx-auto mt-5 text-center '>
      <h1 className='bg-amber-500 p-5 font-bold'>Hello World</h1>
      {session?(
      <h2>Welcome {session?.user?.name}</h2>

      ):(
<SigninWithGoogle/>
)}
    </div>
  )
}
 