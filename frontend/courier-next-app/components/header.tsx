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


 const Header: React.FC = () => {
    const [appMode, setAppMode] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogin, setShowLogin]  = useState(false);

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
        console.log('function')
        setShowLogin(false);
    }

    return (
        <>
            <header className="flex w-full h-[10%] justify-between items-center dark:bg-slate-700  bg-slate-50 z-0">

                <span className="text-sm text-slate-900 dark:text-slate-300 md:text-xl xl:text-3xl ml-5 italic ">NextCourier-&gt;</span>

                <div>
                    <ul className="sm: hidden md:flex justify-between items-center">
                        <li className='mr-5 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer'>Enterprise</li>
                        <li className='ml-5 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Courier</li>
                    </ul>
                </div>

                <div className='md:flex items-center justify-between sm: hidden'>

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

                <div className='sm: mr-5 items-center cursor-pointer md:hidden'>
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