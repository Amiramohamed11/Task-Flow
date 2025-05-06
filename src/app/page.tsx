import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './lib/nextAuth'
import SigninWithGoogle from './_components/SigninWithGoogle';

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log('جلسة المستخدم:', session);

  return (
  <></>
  )
}
 