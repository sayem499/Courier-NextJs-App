"use client"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import Dropdownmenu from './dropdownmenu';
import { useLogoutMutation } from '@/redux/users/userApiSlice';
import { logout } from '@/redux/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/navigation';
import Login from './login';
import Nav from './nav_options';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';


const Header: React.FC = () => {
    const [appMode, setAppMode] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [logoutApi] = useLogoutMutation();
    const { user } = useAppSelector(state => state.userState);

    useEffect(() => {
        if (user) {
            router.push('/home');
        }

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

    const routeNewParcel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('/new_parcel');
    }

    return (
        <>
            <header className={`flex w-full h-[10%] justify-between items-center dark:bg-slate-700  bg-slate-50 ${showLogin ? '' : 'drop-shadow-md'}`}>

                <span className="text-sm text-slate-900 dark:text-slate-300 md:text-xl xl:text-3xl ml-5 italic ">NextCourier-&gt;</span>

                { user && <button className=' sm:flex items-center justify-center hidden h-[60%] w-[10%]  dark:border  rounded-lg text-sm shadow-md'><GpsFixedIcon className='text-sm mr-1' />Track Parcel</button> }

                <Nav user={user} />


                {user && <div className='sm:flex items-center justify-center hidden w-[10%] h-[60%]'>

                    <button className='h-[100%] w-[100%] border rounded-lg text-sm dark:bg-transparent
                     hover:text-white text-slate-100 bg-blue-500' onClick={routeNewParcel}>Create Parcel</button>


                 </div>
                }


                <div className='sm:flex items-center justify-between hidden'>
                    {appMode === 'light' ? <button className='m-5' onClick={(event) => changeMode(event, 'dark')}>
                        <LightModeOutlinedIcon className='text-slate-900 dark:text-slate-300' /></button> :
                        <button className='m-5' onClick={(event) => changeMode(event, 'light')}><DarkModeOutlinedIcon
                            className='text-slate-300' /></button>
                    }

                    {
                        user ? <button onClick={logoutFunction}
                            className="mr-5 rounded-full bg-red-500 
                        px-4 py-2 text-gray-50 hover:text-white">Logout</button>

                            : <button onClick={(event) => openLogin(event)}
                                className="mr-5 rounded-full bg-green-500 
                        px-4 py-2 text-gray-50 hover:text-white">Login</button>
                    }
                </div>

                <div className='flex mr-5 items-center cursor-pointer sm:hidden'>
                    {appMode === 'light' ? <button className='m-5' onClick={(event) => changeMode(event, 'dark')}>
                        <LightModeOutlinedIcon className='text-slate-900 dark:text-slate-300' /></button> :
                        <button className='m-5' onClick={(event) => changeMode(event, 'light')}><DarkModeOutlinedIcon
                            className='text-slate-300 ' /></button>}

                    <MenuIcon className='dark:text-slate-300 text-black' onClick={(event: React.MouseEvent<SVGSVGElement>) => menuOpen(event)} />

                    {isMenuOpen && <Dropdownmenu />}
                </div>
                {showLogin && <Login closeLogin={closeLogin} />}

            </header>

        </>
    )
}

export default Header