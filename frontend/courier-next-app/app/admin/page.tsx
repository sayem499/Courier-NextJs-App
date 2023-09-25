"use client"
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from "../hooks";
import { useRouter } from 'next/navigation';
import { useLoginAdminMutation } from "@/redux/admin/adminApiSlice";
import { setAdminData } from "@/redux/admin/adminSlice";
import { toast } from 'react-toastify';


const Admin = () => {
  const {admin} = useAppSelector((state) => state.adminState);
  const [admin_email, setEmail] = useState('');
  const [admin_password, setPassword] = useState('');
  const [loginAdmin, {isSuccess}] = useLoginAdminMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if(admin){
      router.push('admin/dashboard');
    }
  })
  const loginHndler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try{
      const res = await loginAdmin({admin_email, admin_password}).unwrap();
      dispatch(setAdminData({...res}));
      if(isSuccess){
        router.push('admin/dashboard');
      }
    }catch(err: any){
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-[100%] w-[100%] bg-black/[0.4]" >
      <div className="flex flex-col rounded-lg justify-center items-center h-[80%] w-[35%] dark:bg-slate-600 bg-gray-100">

        <form className=" flex flex-col justify-center items-center w-[90%] h-[90%]">
          <span className='sm:mt-2 sm: mb-3 text-2xl text-black dark:text-white'>Login</span>

          <input value={admin_email} onChange={e => { setEmail(e.target.value) }}
            className='text-black text-sm m-2 p-2 w-4/5 rounded border-black border'
            placeholder='Email'
            type='email' name='admin_email'></input>

          <input value={admin_password} onChange={e => { setPassword(e.target.value) }}
            className='text-black text-sm m-2 p-2 w-4/5 rounded border-black border'
            placeholder='Password'
            type='password' name='admin_password'></input>

          <button onClick={(e) => loginHndler(e)} className="bg-green-700 mt-2 ml-2 mr-2 mb-5 w-4/5 
                hover:bg-green-500 text-white  py-2 px-4 rounded">
            Login
          </button>
          <span>Forgot password? <a href='' className="text-blue-700 dark:text-blue-400 hover:text-blue-500 ">Click Here</a></span>
        </form>
      </div>
    </div>
  )


}

export default Admin