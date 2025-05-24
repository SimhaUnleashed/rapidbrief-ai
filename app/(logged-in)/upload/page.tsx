import { MotionDiv } from '@/components/common/MotionWrapper'
import { Badge } from '@/components/ui/badge'
import UploadForm from '@/components/upload/UploadForm'
import UploadHeader from '@/components/upload/UploadHeader'
import { hasReachedUploadLimit } from '@/lib/user'
import { containerVariants } from '@/utils/constants'
import { currentUser } from '@clerk/nextjs/server'
import { Sparkles } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

//to prevent vercel from timing out,same with vercel.json
export const maxDuration = 60;

async function Page() {
  const user = await currentUser();

  if(!user?.id){
    redirect('/sign-in')
  }

  const {hasReachedLimit} = await hasReachedUploadLimit(user.id);

  if(hasReachedLimit){
    redirect('/dashboard')
  }
  return (
    <section className="min-h-screen">
  <MotionDiv variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
    <div className="flex flex-col items-center justify-center gap-6 text-center">
    <UploadHeader/>
    <UploadForm/>
    </div>
  </MotionDiv>
</section>
  )
}

export default Page