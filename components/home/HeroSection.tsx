import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { MotionDiv, MotionH1, MotionH2, MotionSection, MotionSpan } from '../common/MotionWrapper'
import { buttonVariants, containerVariants, itemVariants } from '@/utils/constants'

function HeroSection() {
  return (
    <MotionSection 
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className='relative mx-auto flex flex-col z-0 items-center justify-center  py-16 sm:py-20 lg:pb-20 transition-all animate-in lg:px-12 max-w-7xl'>
        
            
                <MotionDiv 
                variants={itemVariants} className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
                    <Badge variant= {"secondary"} className='relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200'>
            <Sparkles className='h-6 w-6 mr-2 text-rose-600 animate-pulse'/>
            <p className='text-base text-rose-600'>Powered by AI</p>
            </Badge>
            </MotionDiv>
            
            <MotionH1 className='font-bold py-6 text-center'>Transform PDFs into
                <span className='relative inline-block'>
                    <MotionSpan whileHover={buttonVariants} className='relative z-10 px-2'>Clear</MotionSpan>
                   <span className='absolute inset-0 bg-rose-200/50 rounded-lg transform '></span> 
                </span>
                 
                 Summaries</MotionH1>
            <MotionH2 className='text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600'>Get a complete summary reel of the document in seconds</MotionH2>
            <MotionDiv variants={itemVariants} whileHover={buttonVariants} className="">
            <Button variant={"link"}
            className='text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300'>
                <Link className='flex items-center gap-2' href={'/upload'}><span>Try RapidBrief</span>
                <ArrowRight className='animate-pulse'/></Link>
            </Button>
            </MotionDiv>
        
    </MotionSection>
  )
}

export default HeroSection