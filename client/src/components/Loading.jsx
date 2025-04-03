import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-base-300 absolute' >
        <div className="flex flex-col w-90 h-30 items-center gap-2 bg-base-100 justify-center rounded-2xl">
            <LoaderCircle className='text-primary animate-spin' />
            <h2 className='font-bold' >Logging In</h2>
        </div>
    </div>
  )
}

export default Loading
