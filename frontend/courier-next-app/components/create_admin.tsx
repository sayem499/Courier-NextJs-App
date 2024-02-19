"use client"

import Divisions from '@/JSON/bd-divisions.json';
import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useRegisterAdminMutation } from '@/redux/admin/adminApiSlice';

const Createadmin = () => {
    const _id = uuidv4();
    const [registerAdmin] = useRegisterAdminMutation(); 
    const [admin_email, setEmail] = useState('');
    const [admin_password, setPassword] = useState('');
    const [admin_passwordConfirm, setPasswordConfirm] = useState('');
    const [admin_location, setLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(admin_password === admin_passwordConfirm){
        try{
            const res = await registerAdmin({ _id, admin_email, admin_password, admin_location }).unwrap();
            if(res){
                toast.success('Admin registered successfully');
                setEmail('');
                setPassword('');
                setPasswordConfirm('');
                setLocation('');
            }
        }catch(err: any){
            toast.error(err.data.message || err.error);
        }
    }else {
       toast.error('Passwords do not match.'); 
    }
  }  

  return (
    <div className='flex flex-col w-[100%] h-[100%] '>
     <div className='flex w-[100%] h-[30%] justify-center'>
        
     </div>

     <div className='flex w-[100%] h-[70%] justify-center'>

        <form className='flex flex-col w-[30%] items-center' onSubmit={handleSubmit}>
        <span className='text-bold text-2xl'>Admin Registration</span> 
            <div className='flex flex-col mb-2 w-[100%]'>
                <label htmlFor='admin_email' className='mb-1 '>Email</label>
                <input value={admin_email} onChange={(e) => setEmail(e.target.value)} type='email' className='text-black rounded-sm p-2 text-sm' id='admin_email' name='admin_email' placeholder='Enter email'/>
            </div>  

            <div className='flex flex-col mb-2 w-[100%]'>
                <label htmlFor='admin_password' className='mb-1 '>Password</label>
                <input value={admin_password} onChange={(e) => setPassword(e.target.value)} type='password' className='text-black rounded-sm p-2 text-sm' id='admin_password' name='admin_password' placeholder='Enter password'/>
            </div>

            <div className='flex flex-col mb-2 w-[100%]'>
                <label htmlFor='admin_passwordConfirm' className='mb-1 '>Re-type Password</label>
                <input value={admin_passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type='password' className='text-black rounded-sm p-2 text-sm' id='admin_passwordConfirm' name='admin_passwordConfirm' placeholder='Confirm password'/>
            </div>

            <div className='flex flex-col mb-2 w-[100%]'>
                <label htmlFor='admin_location' className='mb-1 '>Location</label>
                <select value={admin_location} onChange={(e) => setLocation(e.target.value)} className='text-black rounded-sm p-2 text-sm' id='admin_location' name='admin_location' placeholder='Enter location'>
                <option value={''}>Choose Location</option>
                {
                   Divisions.divisions.map((div, key) => {
                    return(
                        <option key={key} id={div.id} value={div.name}>{div.name}</option>
                    )
                   }) 
                }
                </select>
            </div>

            <button type='submit' className=' mt-5 text-white rounded-sm bg-green-500 w-[40%] h-[6%]'>Submit</button>  
        </form>
     </div>
    </div>
  )
}

export default Createadmin