"use client"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';

export default function Heade() {
    const [appMode, setAppMode] = useState('light');
    const changeMode = (event: React.MouseEvent<HTMLButtonElement>, data: string) => {
        event.preventDefault();
        setAppMode(data);
    }

    return (
        <>
            <header className="flex w-full h-20 justify-between items-center mb-5 bg-slate-700 ">

                <h1 className="text-2xl ml-5">NextCourier-&gt;</h1>
                <div>
                    <ul className="sm: hidden md:flex justify-between items-center">
                        <li className='mr-5 text-slate-300 hover:text-white cursor-pointer'>Enterprise</li>
                        <li className='ml-5 text-slate-300 hover:text-white cursor-pointer '>Courier</li>
                    </ul>
                </div>
                <div className='md:flex items-center justify-between sm: hidden'>
                    {appMode === 'light' ? <button  className='m-5' onClick={(event) => changeMode(event, 'dark')}>
                        <LightModeOutlinedIcon /></button> :
                        <button className='m-5' onClick={(event) => changeMode(event, 'light')}><DarkModeOutlinedIcon /></button>}

                    <button className="mr-5 rounded-full 
        bg-slate-600 px-4 py-2 text-slate-300 hover:text-white">Login</button>
                </div>
                <div className='sm: mr-5 items-center cursor-pointer md:hidden'>
                    <MenuIcon/>
                </div>


            </header>

        </>
    )
}
