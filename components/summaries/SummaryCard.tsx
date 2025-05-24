import React from 'react'
import { Card } from '../ui/card'
import DeleteButton from './DeleteButton'
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import {formatDistanceToNow} from 'date-fns';
import { formatFileNameAsTitle } from '@/utils/format-utils';
import { easeIn } from 'motion/react';
import { itemVariants } from '@/utils/constants';
import { MotionDiv } from '../common/MotionWrapper';

const SummaryHeader = ({fileUrl,title,createdAt}:{fileUrl:string,title:string,createdAt:string}) => {
  return (
    <div className='flex items-start gap-2 sm:gap-4'>
      <FileText className='w-6 h-6 sm:w-8 sm:h-8 text-rose-400 transform transition duration-200 ease-in-out'/>
      <div className='flex-1 min-w-0'>
      <h3 className='text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5'>{title || formatFileNameAsTitle(fileUrl)}</h3>
      <p className='text-gray-600 line-clamp-2 text-sm sm:text-base '>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
      </div>
    </div>
  )
}


const StatusBadge = ({status}:{status:string}) => {
  return <span className={cn('px-3 py-1 text-xs font-medium rounded-full capitalize', status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>{status}</span>
}

function SummaryCard({summary}:{summary:any}) {
  console.log(summary);
  return (

    <MotionDiv variants={itemVariants}
                initial="hidden" animate="visible"
                whileHover={{scale:1.02, transition:{duration:0.2,ease:'easeOut'}}}
                className='self-start'>
      <Card className='relative w-full'>
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id}/>
        </div>
        <Link href={`summaries/${summary.id}`} className='block p-4 sm:p-6'>
        <div className="flex flex-col gap-3 sm:gap-4">
        <SummaryHeader fileUrl={summary.original_file_url} title={summary.title} createdAt={summary.created_at}/>
        <p className='text-base xl:text-lg  text-gray-600 truncate w-4/5 sm:text-base pl-2'>{summary.summary_text}</p>
        {/* <p className='text-gray-600 line-clamp-2 text-sm sm:text-base pl-2'>{(new Date(summary.created_at)).toISOString().split('T')[0]}</p> */}
        <div className="flex justify-between items-center mt-2 sm:mt-4">
          <StatusBadge status={summary.status}/>
        </div>
        </div>
        </Link>
      </Card>
    </MotionDiv>
  )
}

export default SummaryCard