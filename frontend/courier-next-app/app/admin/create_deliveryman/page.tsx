"use client"
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useRouter } from 'next/navigation';
import { useSetDeliveryManMutation } from '@/redux/deliveryMan/deliveryManAdminApiSlice';
import { setDeliveryManData } from '@/redux/deliveryMan/deliveryManAdminSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Createdeliveryman = () => {
  const [ setDeliveryMan ]= useSetDeliveryManMutation();
  const dispatch = useAppDispatch();
  const { deliveryman } = useAppSelector(state => state.deliveryManState);
  const [ deliveryMan_username, setUsername ] = useState('');
  const [ deliveryMan_phonenumber, setPhonenumber ] = useState('');
  const [ deliveryMan_email, setEmail ]= useState('');
  const [ deliveryMan_password, setPassword ] = useState('');
  const [ deliveryMan_confirmPassword, setConfirmPassword ] = useState('');
  const _id = uuidv4();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( deliveryMan_password === deliveryMan_confirmPassword){
    try{ 
     const res = await setDeliveryMan({ _id, deliveryMan_username, deliveryMan_phonenumber, deliveryMan_email, deliveryMan_password }).unwrap();
     dispatch(setDeliveryManData(res));
     if(res){
      toast.success('Deliveryman Created Successfully!');
      setUsername('');
      setPhonenumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
     }
    }catch(err: any){
      toast.error( err.data.message || err.error );
    }
   } else {
     toast.error('Passwords do not match!');
   }
  }

  return (
    <div className='flex flex-col h-[100%] w-[100%]'>
      <div className='flex h-[30%] w-[100%] justify-center'>

      </div>
      <div className='flex h-[70%] w-[100%] justify-center'>
            <div className='h-[100%] w-[80%] items-center '>
              <form className='flex flex-col items-center justify-center' onSubmit={(e)=>handleSubmit(e)}>

                <span className='text-bold text-2xl'>Deliveryman Registration</span>   

                <div className='flex w-[50%] flex-col mb-5'>
                 <label className='mb-1' htmlFor='deliveryMan_username'>Username</label>
                 <input onChange={(e)=> setUsername(e.target.value)} value={deliveryMan_username} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Username' type="text" name='deliveryMan_username' id='deliveryMan_username'/>
                </div>

                <div className='flex w-[50%] flex-col mb-5'>
                 <label className='mb-1' htmlFor='deliveryMan_phonenumber'>Phonenumber</label>
                 <input onChange={(e)=> setPhonenumber(e.target.value)} value={deliveryMan_phonenumber} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Phonenumber'  type="text" name='deliveryMan_phonenumber' id='deliveryMan_phonenumber'/>
                </div>

                <div className='flex w-[50%] flex-col mb-5'>
                 <label className='mb-1' htmlFor='deliveryMan_email'>Email</label>
                 <input onChange={(e)=> setEmail(e.target.value)} value={deliveryMan_email} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Email'  type="text" name='deliveryMan_email' id='deliveryMan_email'/>
                </div>

                <div className='flex w-[50%] flex-col mb-5'>
                 <label className='mb-1' htmlFor='deliveryMan_password'>Password</label>
                 <input onChange={(e)=> setPassword(e.target.value)} value={deliveryMan_password} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Password'  type="password" name='deliveryMan_password' id='deliveryMan_password'/>
                </div>

                <div className='flex w-[50%] flex-col mb-5'>
                 <label className='mb-1' htmlFor='deliveryMan_confirmPassword'>Re-type Password</label>
                 <input onChange={(e)=> setConfirmPassword(e.target.value)} value={deliveryMan_confirmPassword} className='rounded-sm text-sm p-2 text-black' placeholder='Confirm Password'  type="password" name='deliveryMan_confirmPassword' id='deliveryMan_confirmPassword'/>
                </div>
                
                <button type='submit' className='w-[15%] rounded-md p-2 bg-green-500 text-white'>Submit</button>
              </form>

            </div>
      </div>
    </div>
  )
}

export default Createdeliveryman