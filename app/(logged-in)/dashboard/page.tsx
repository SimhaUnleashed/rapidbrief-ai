import { MotionDiv, MotionH1, MotionP } from '@/components/common/MotionWrapper';
import EmptySummaryState from '@/components/summaries/EmptySummaryState';
import SummaryCard from '@/components/summaries/SummaryCard';
import { Button } from '@/components/ui/button'
import { getSummaries } from '@/lib/summaries';
import { hasReachedUploadLimit } from '@/lib/user';
import { itemVariants } from '@/utils/constants';
import { currentUser } from '@clerk/nextjs/server';
import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

async function DashboardPage() {
    const user = await currentUser();
    const userId = user?.id;
    if(!userId) return redirect('/sign-in');
    
    const {hasReachedLimit, uploadLimit} = await hasReachedUploadLimit(userId);
    const summaries = await getSummaries(userId);
  return (
    <main className='min-h-screen'>
        <MotionDiv initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="container mx-auto flex flex-col gap-4">
            <div className="px-2 py-12 sm:py-24">
                <div className="flex gap-4 mb-8 justify-between">
                    <div className='flex flex-col gap-2'>
            <MotionH1 variants={itemVariants}
            initial='hidden' whileInView='visible' className='text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent'>Your Summaries</MotionH1>
            <MotionP variants={itemVariants} initial="hidden" whileInView="visible" className='text-gray-600'>Transform your PDFs into concise,actionable insights</MotionP>
            </div>
            {!hasReachedLimit && (
                <MotionDiv variants={itemVariants}
                initial="hidden" animate="visible"
                whileHover={{scale:1.05}}
                className='self-start'>
                    <Button className='text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 
                hover:scale-105 hover:no-underline group transition-all duration-300' variant={'link'}>
                    <Link className='flex items-center' href={'/upload'}>
                    <Plus className='h-5 w-5 mr-2'/>
                    New Summary</Link>
                </Button>
                </MotionDiv>
                
            )}
                
            </div>
            
            {hasReachedLimit && (
                <MotionDiv variants={itemVariants}
                initial="hidden" animate="visible"
                whileHover={{scale:1.05}}
                className='self-start'>
                <div className="mb-6">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                    <p className='text-sm'>You've reached the limit the limit of {uploadLimit} uploads on the Basic plan.{' '}
                        <Link className='text-rose-800 font-medium underline underline-offset-4 inline-flex items-center' href='/#pricing'>Click here to upgrade to Pro {' '}<ArrowRight className='h-4 w-4 inline-block'/></Link>{' '} for unlimited uploads.
                    </p>
                </div>
                
            </div>
            </MotionDiv>
            )}
            
            {summaries.length===0 ? (
                <EmptySummaryState/>
            ):(
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                {summaries.map((summary,i)=>(
                    <SummaryCard summary={summary} key={i}/>
                ))}
            </div>
            )}
            
            </div>
        </MotionDiv>
        </main>
  )
}

export default DashboardPage