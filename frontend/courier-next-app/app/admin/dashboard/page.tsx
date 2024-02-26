"use client"
import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useRouter } from 'next/navigation';
import { useCheckTokenAdminMutation } from '@/redux/admin/adminApiSlice';
import { logoutAdmin } from '@/redux/admin/adminSlice';
import { useLogoutAdminMutation } from '@/redux/admin/adminApiSlice';
import { toast } from 'react-toastify';

const Admindashboard = () => {

const router = useRouter();
const dispatch = useAppDispatch();
const {admin} = useAppSelector(state => state.adminState);
const [checkAdminToken] = useCheckTokenAdminMutation();
const [logoutAdminApi] = useLogoutAdminMutation();

useEffect(() => {
  if(!admin){
    router.push('/admin');
  }
  if (admin) {
    adminTokenCheck();
    router.push('/admin/dashboard');
}
  
},[admin])

const adminTokenCheck = async () => {
  try {
      await checkAdminToken().unwrap();
      return;
  } catch (err: any) {
      if (err?.data?.message === 'Not authorizied, no token!') {
          await logoutAdminApi().unwrap();
          dispatch(logoutAdmin());
          router.push('/admin');
          toast.error(err?.data?.message || err.error);
          toast.error('Please login again!');
      }
  }
}

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