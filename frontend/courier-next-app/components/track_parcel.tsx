"use client"
import React, { useState } from 'react'

const Track: React.FC<{ closeTrack: (event: React.MouseEvent<HTMLDivElement> | void) => void }> = ({ closeTrack }) => {
    const [trackerId, setTrackerId] = useState('');
    const steps = ['Pending', 'Pickup', 'Shipped', 'Delivered'];
    return (
        <div id='track-container' className='h-[100%] w-[100%] top-0 left-0 fixed z-10 
        flex items-center justify-center bg-black/[.3]' onClick={e => (e.target as Element).id === 'track-container' ? closeTrack() : ''}>

            <div className='h-[85%] w-[75%] flex flex-col items-center bg-white dark:bg-slate-700 pt-28 rounded '>
                <div className='flex'>
                    <input value={trackerId} onChange={e => setTrackerId(e.target.value)} placeholder='Enter tracker ID'
                        className='rounded-l-md text-center' type='text'></input>

                    <button className="bg-blue-500 hover:bg-blue-700 hover:shadow-blue-500
                     text-white sm:text-xs text-sm p-2 item-center rounded-r-md">Track</button>
                </div>

                <div className='flex w-[100%] h-[100%] justify-center items-center mt-20'>

                    <ul className=' w-[100%] h-[100%] flex justify-center m-auto' id='progress-ul'>
                       { steps.map((item, index)=>(
                            <li className='flex flex-col h-[20%] w-[10%] items-center '>
                            <section className={`flex items-center h-[50%] w-[100%]
                                ${ index === 3 ? 'before:content-[" "] before:w-[50%] before:h-1 dark:before:bg-gray-500 before:bg-gray-200  after:content-[" "] after:w-[50%]': 'after:content-[" "] after:w-[50%] after:h-1 dark:after:bg-gray-500 after:bg-gray-200 '}
                                ${ index === 0 ? 'before:content-[" "] before:w-[50%]' : 'before:content-[" "] before:w-[50%] before:h-1 dark:before:bg-gray-500 before:bg-gray-200 '}`}>
                                <span className='rounded-full bg-green-500 w-3 h-3 '></span>
                            </section>    
                            <span>{item}</span>
                        </li >
                       )) 
                        
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Track;