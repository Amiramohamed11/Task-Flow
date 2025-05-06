import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='bg-cyan-800 flex justify-between p-5'>
      <div>Global TaskFlow</div>
    <div className='flex items-center
'>
    <ul className='flex '>
        <li className='mr-5'><Link href="">EN</Link></li>
        <li className='mr-5'><Link href="">AR</Link></li>
        <li className='mr-5'><Link href="">Es</Link></li>
      </ul>
      <button  className='bg-amber-100 p-2 rounded-lg'><Link href={"/signin"}>Sign in</Link></button>
    </div>
    </div>
  )
}
