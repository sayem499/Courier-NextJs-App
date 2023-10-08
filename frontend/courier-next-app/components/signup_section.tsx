"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRegisterMutation } from '@/redux/users/userApiSlice';
import { setUserData } from '@/redux/users/userSlice';
import { toast } from 'react-toastify';
import Track from './track_parcel';

const Signup: React.FC = () => {
  const _id = uuidv4();
  const [user_firstname, setFirstName] = useState('');
  const [user_lastname, setLastName] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user_phonenumber, setPhonenumber] = useState('');
  const [showTrack, setShowTrack] = useState(false);
  const [trackerId, setTrackerId] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { user } = useAppSelector(state => state.userState);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if(user){
      router.push('/home');
    }
  },[user, router, showTrack]);

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(user_password !== confirmPassword){
      toast.error('Passwords do not match!');
    } else {
      try{
        const res = await register({_id, user_firstname, user_lastname, user_email, user_password, user_phonenumber}).unwrap();
        dispatch(setUserData({...res}));
        router.push('/home');
      } catch(err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const closeTrack = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | void) => {
    setShowTrack(false);
  }

  return (
    <div className='flex w-full h-1/2 sm:mr-3 sm:h-full justify-center 
            md:justify-start sm:w-1/4'>

            <div className='flex flex-col w-full sm:w-full h-full sm:h-[85%] 
             bg-slate-400 dark:bg-slate-600 rounded-b-2xl 
             items-center text-slate-600 dark:text-slate-300 overflow-auto'>

              <span className='sm:mt-2 text-xl'>Sign up</span>

              <div className='flex w-full flex-col 
               items-center mt-2 justify-center'>
                
                <input value={user_firstname} onChange={e => {setFirstName(e.target.value)}} 
                  className='text-black text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='First Name'
                  type='text' name='user_firstmname'></input>

                <input value={user_lastname} onChange={e => {setLastName(e.target.value)}}
                  className='text-black text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Last Name'
                  type='text' name='user_lastmname'></input>  

                <input value={user_email} onChange={e => {setEmail(e.target.value)}}
                  className='text-black text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Email'
                  type='email' name='user_email'></input>

                <input value={user_phonenumber} onChange={e => {setPhonenumber(e.target.value)}}
                  className='text-black text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Phonenumber'
                  type='text' name='user_phonenumber'></input>

                <input value={user_password} onChange={e => {setPassword(e.target.value)}} 
                  className='text-black text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Password'
                  type='password' name='user_password'></input>

                <input value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}}
                  className='text-black text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Retype password'
                  type='password' name='user_passwordR'></input>

                <button onClick={submitHandler} className="bg-blue-500 mt-2 ml-2 mr-2 mb-5 w-4/5 
                hover:bg-blue-700 text-white  py-2 px-4 rounded">
                  Sign up
                </button>
              </div>
              <div className='flex items-center w-4/5 h-fit-content mt-3 mb-3'>
                <span className='border border-slate-300 w-1/2'></span>
                <span className='mr-2 ml-2'>or</span>
                <span className='border border-slate-300 w-1/2'></span>
              </div>

              <span className='sm:mt-3 text-lg'>Track your package.</span>
              <div className='flex items-center w-4/5 '>

                <input value={trackerId} onChange={(e) => setTrackerId(e.target.value)} className='text-sm mt-2 mb-2 p-2 w-4/5 rounded-l sm:text-xs'
                  placeholder='Track courier'
                  type='text' name='track_id'></input>

                <button onClick={() => setShowTrack(true)} className="bg-blue-500 w-1/5 h-auto sm:w-2/5
                   hover:bg-blue-700 text-white sm:text-xs text-sm p-2 
                    item-center  rounded-r mt-2 mb-2">
                  Track
                </button>
              </div>

            </div>
            { showTrack && <Track closeTrack={closeTrack} trackerID={trackerId}/>}
          </div>
  )
}

export default Signup