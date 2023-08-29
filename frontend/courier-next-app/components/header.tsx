"use client"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import Dropdownmenu from './dropdownmenu';

export default function Header() {
    const [appMode, setAppMode] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const themePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(appMode === 'dark'){
            document.documentElement.classList.add('dark');
        }else if(appMode === 'light'){
            document.documentElement.classList.remove('dark');
        }else if(themePreference){
            document.documentElement.classList.add('dark');
        } 
        
    }, [appMode])

    const changeMode = (event: React.MouseEvent<HTMLButtonElement>, data: string) => {
        event.preventDefault();
        setAppMode(data);
    }

    const menuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <header className="flex w-full h-[10%] justify-between items-center dark:bg-slate-700  bg-slate-500">

                <span className="text-sm text-slate-300 md:text-xl xl:text-3xl ml-5 ">NextCourier-&gt;</span>

                <div>
                    <ul className="sm: hidden md:flex justify-between items-center">
                        <li className='mr-5 text-slate-300 hover:text-white cursor-pointer'>Enterprise</li>
                        <li className='ml-5 text-slate-300 hover:text-white cursor-pointer '>Courier</li>
                    </ul>
                </div>

                <div className='md:flex items-center justify-between sm: hidden'>

                    {appMode === 'light' ? <button className='m-5' onClick={(event) => changeMode(event, 'dark')}>
                        <LightModeOutlinedIcon className='text-slate-300' /></button> :
                        <button className='m-5' onClick={(event) => changeMode(event, 'light')}><DarkModeOutlinedIcon  
                        className='text-slate-300'/></button>}

                    <button className="mr-5 rounded-full 
        bg-green-700 px-4 py-2 text-gray-200 hover:text-white">Login</button>
                </div>

                <div className='sm: mr-5 items-center cursor-pointer md:hidden'>
                    {appMode === 'light' ? <button className='m-5' onClick={(event) => changeMode(event, 'dark')}>
                        <LightModeOutlinedIcon className='text-slate-300' /></button> :
                        <button className='m-5' onClick={(event) => changeMode(event, 'light')}><DarkModeOutlinedIcon 
                        className='text-slate-300 ' /></button>}

                    <MenuIcon className='text-slate-300 ' onClick={(event:React.MouseEvent<SVGSVGElement>) => menuOpen(event)} />

                    {isMenuOpen && <Dropdownmenu />}

                </div>


            </header>

        </>
    )
}
