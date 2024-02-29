"use client"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import Dropdownmenu from './dropdownmenu';
import { useLogoutMutation } from '@/redux/users/userApiSlice';
import { logout } from '@/redux/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter, usePathname } from 'next/navigation';
import Login from './login';
import Nav from './nav_options';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { toast } from 'react-toastify';
import Track from './track_parcel';
import { useLogoutAdminMutation } from '@/redux/admin/adminApiSlice';
import { logoutAdmin } from '@/redux/admin/adminSlice';


const Header: React.FC = () => {
    const [appMode, setAppMode] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showTrack, setShowTrack] = useState(false);
    const [logoutAdminApi] = useLogoutAdminMutation();

    const dispatch = useAppDispatch();
    const router = useRouter();
    const path = usePathname();
    const [logoutApi] = useLogoutMutation();
    const { user } = useAppSelector(state => state.userState);
    const { admin } = useAppSelector(state => state.adminState);

    useEffect(() => {
        const themePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (appMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (appMode === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (themePreference) {
            document.documentElement.classList.add('dark');
        }

    }, [appMode, user, router])

    const logoutFunction = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await logoutApi().unwrap();
        dispatch(logout());
        router.push('/');
    }

    const logoutAdminFunction = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await logoutAdminApi().unwrap();
        dispatch(logoutAdmin());
        router.push('/admin');
    }

    const changeMode = (event: React.MouseEvent<HTMLButtonElement>, data: string) => {
        event.preventDefault();
        setAppMode(data);
    }

    const menuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    }

    const openLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowLogin(true);
    }

    const closeLogin = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | void) => {
        setShowLogin(false);
    }

    const openTrack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowTrack(true);
    }

    const closeTrack = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | void) => {
        setShowTrack(false);
    }

    const routeNewParcel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('/new_parcel');
    }

    return (
        <>
            <header className={`flex w-full h-[10%] md:justify-center justify-between items-center dark:bg-slate-700  bg-slate-50 ${showLogin ? '' : 'drop-shadow-md'}`}>
                <div className='inline-flex w-[20%] sm:[15%] h-[85%] justify-center items-center bg-slate-50 ml-4 rounded-sm dark:shadow-white mr-4'>
                    <span className="md:text-sm lg:text-base test-xs text-slate-900 ml-1 italic ">NextCourier</span>
                    <img className='md:w-[20%] md:h-[70%] h-6 w-10 mr-1' src={'/fast-delivery-truck.png'} />
                </div>
                <div className='sm:inline-flex hidden w-[70%] h-[100%] justify-center items-center'>
                    {user ? <button className='xl:flex hidden items-center justify-center h-[70%] w-[15%]  
                    dark:border  rounded-lg text-sm shadow-md' onClick={openTrack}><GpsFixedIcon className='text-sm mr-1' />Track Parcel</button> : ''}

                    <Nav user={user} admin={admin} />


                    {user ? <div className='xl:flex items-center justify-center hidden w-[15%] h-[100%] '>

                        <button className='h-[70%] w-[100%] border rounded-lg text-sm dark:bg-transparent
                     hover:text-white text-slate-100 bg-blue-500 p-2' onClick={routeNewParcel}>Create Parcel</button>


                    </div> : ''
                    }
                </div>


                
                <div className='xl:flex items-center justify-between hidden'>
                    {appMode === 'light' ? <button className='m-5' onClick={(event) => changeMode(event, 'dark')}>
                        <LightModeOutlinedIcon className='text-slate-900 dark:text-slate-300' /></button> :
                        <button className='m-5' onClick={(event) => changeMode(event, 'light')}><DarkModeOutlinedIcon
                            className='text-slate-300' /></button>
                    }

                    {
                        user ? <button onClick={logoutFunction}
                            className="mr-5 rounded-full bg-red-500 
                        px-4 py-2 text-gray-50 hover:text-white">Logout</button>

                            : path === '/admin' ? '' : !admin && <button onClick={(event) => openLogin(event)}
                                className="mr-5 rounded-full bg-green-500 
                        px-4 py-2 text-gray-50 hover:text-white">Login</button>
                    }

                    {
                        admin ? <button onClick={logoutAdminFunction}
                            className="mr-5 rounded-full bg-red-500 
                        px-4 py-2 text-gray-50 hover:text-white">Logout</button>

                            : ''
                    }

                </div>

                <div className='flex mr-5 items-center cursor-pointer xl:hidden'>
                    {appMode === 'light' ? <button className='m-5' onClick={(event) => changeMode(event, 'dark')}>
                        <LightModeOutlinedIcon className='text-slate-900 dark:text-slate-300' /></button> :
                        <button className='m-5' onClick={(event) => changeMode(event, 'light')}><DarkModeOutlinedIcon
                            className='text-slate-300 ' /></button>}

                    <MenuIcon className='dark:text-slate-300 text-black' onClick={(event: React.MouseEvent<SVGSVGElement>) => menuOpen(event)} />

                    {isMenuOpen && <Dropdownmenu openTrack={openTrack} />}
                </div>

            </header>
            {showLogin && <Login closeLogin={closeLogin} />}
            {showTrack && <Track closeTrack={closeTrack} trackerID={null} />}
        </>
    )
}

export default Header