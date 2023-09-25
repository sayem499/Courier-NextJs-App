"use client"
import React, {useEffect} from 'react'
import { useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/navigation';

const Admindashboard = () => {

const router = useRouter();
const {admin} = useAppSelector(state => state.adminState);

useEffect(() => {
  if(!admin){
    router.push('/admin');
  }
  
},[admin])

  return (
    <div className='h-[100%] w-[100%] flex flex-col justify-center'>
        <div className='h-[40%] w-[100%]'>

        </div>
        <div className='h-[100%] w-[100%] flex'>
            <span className='ml-20 text-3xl'>Welocome, {admin?.admin_email}</span>
        </div>
    </div>
  )
}

export default Admindashboard