import Link from 'next/link'
import React from 'react'
import { FileText } from 'lucide-react'
import { Button } from '../ui/button';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import PlanBadge from './PlanBadge';

function Header() {
   
  return (
    <nav className='container flex items-center justify-between lg:px-8 px-2 mx-auto'>
        <div className="flex lg:flex-1">
            <NavLink href={"/"} className='flex items-center gap-1 lg:gap-2 shrink-0'>
            <FileText className='w-5 h-5 lg:w-8 lg:h-8 text-gray-900 transform transition duration-200 ease-in-out'/>
            <span className='font-extrabold lg:text-xl text-gray-900'>RapidBrief</span>
            </NavLink>
            </div>
        <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
            
            <NavLink href={"/#pricing"}>Pricing</NavLink>
            <SignedIn>
                <NavLink href={"/dashboard"}>Your Summaries</NavLink>
                </SignedIn>
            
            
        </div>

        <div className="flex lg:justify-end lg:flex-1">
            <SignedIn>
                <div className="flex gap-2 items-center">
                <NavLink href={"/upload"}>Upload a PDF</NavLink>
                <div className="">
                    <PlanBadge/>
                </div>
                <SignedIn><UserButton/></SignedIn>
            </div>
            </SignedIn>
            <SignedOut>
                <div className="">
                <NavLink href={"/sign-in"}>Sign In</NavLink>
            </div>
            </SignedOut>
  
        </div>

    </nav>
  )
}

export default Header