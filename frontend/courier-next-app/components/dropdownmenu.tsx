import { useLogoutMutation } from '@/redux/users/userApiSlice';
import { logout } from '@/redux/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/navigation';
import Track from './track_parcel';
import React, {useState} from 'react';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

export default function Dropdownmenu(openTrack: any){

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [logoutApi] = useLogoutMutation();
    const { user } = useAppSelector(state => state.userState);
    const [showTrack, setShowTrack] = useState(false);

    const logoutFunction = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await logoutApi().unwrap();
        dispatch(logout());
        router.push('/');
    }

    const routeHome = () => {
        router.push('/home');
    }
    
    const routeParcel = () => {
        router.push('/parcel');
    }
    
    const routeReturn = () => {
        router.push('/return');
    }
    
    const routePayment = () => {
        router.push('/payment');
    }

    return (
        <div className="rounded dark:bg-slate-500 bg-white absolute top-16 right-5 h-fit z-50">
            <ul className="flex items-center flex-col justify-center">
               { !user &&  <><li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer'>Enterprise</li> 
                      <li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer '>Courier</li></> }

                {
                   user && <>
                        <li className='inline md:hidden ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer ' onClick={routeHome}>Dashboard</li>
                        <li className='inline md:hidden ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer ' onClick={routeParcel}>Parcel</li>
                        <li className='inline md:hidden ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer ' onClick={routeReturn}>Return</li>
                        <li className='inline md:hidden ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer ' onClick={routePayment}>Payment</li>
                   </>
                }      

                <li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer '>
                    {
                       !user ? <button className=" rounded-full bg-green-600 px-4 py-2 
                        dark:text-slate-300 hover:text-white">Login</button>

                        : <button onClick={logoutFunction} className=" rounded-full bg-red-600 px-4 py-2 
                        dark:text-slate-300 hover:text-white">Logout</button>
                    }
                </li>

                <li className='mr-5 ml-5 mt-2 mb-2 items-center justify-center' >
                {user ? <div className='w-[90%] h-[20%] dark:border  rounded-lg flex items-center justify-center '><GpsFixedIcon className='text-md' />
                    <button className='text-sm shadow-md' onClick={openTrack}>Track Parcel</button></div> : ''}
                </li>

            </ul>
        </div>
    )

} 