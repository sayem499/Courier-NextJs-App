"use client"
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { resetParcelStatus, getParcelStatus } from '../redux/parcelStatus/parcelStatuSlice';
import { useGetParcelStatusWithIdMutation } from '../redux/parcelStatus/parcelStatusApiSlice';
import { toast } from 'react-toastify';
import DoneIcon from '@mui/icons-material/Done';


const Track: React.FC<{ closeTrack: (event: React.MouseEvent<HTMLDivElement> | void) => void, trackerID: string | null }> = ({ closeTrack, trackerID }) => {

    const [trackerId, setTrackerId] = useState('');
    const steps = ['Pending', 'Pickup', 'Shipped', 'Delivered'];

    const [getParcelStatusWithId] = useGetParcelStatusWithIdMutation();
    const dispatch = useAppDispatch();
    const { parcelStatus } = useAppSelector((state) => state.parcelStatusState);
    const { user } = useAppSelector(state => state.userState);

    useEffect(() => {
        if(trackerID){
            handleIDClick();
        }
        return () => {
            dispatch(resetParcelStatus());
        }
    }, [trackerID])

    const handleIDClick = async () => {
        if (trackerID === '') {
            toast.error('Please enter tracker ID.');
        } else {
            const _id = trackerID;
            try {
                const res = await getParcelStatusWithId({ _id }).unwrap();
                dispatch(getParcelStatus(res));
            } catch (err: any) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    

    const handleClick = async () => {
        if (trackerId === '') {
            toast.error('Please enter tracker ID.');
        } else {
            const _id = trackerId;
            try {
                const res = await getParcelStatusWithId({ _id }).unwrap();
                dispatch(getParcelStatus(res));
            } catch (err: any) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div id='track-container' className='h-[100%] w-[100%] top-0 left-0 fixed z-10 
        flex items-center justify-center bg-black/[.3]' onClick={e => (e.target as Element).id === 'track-container' ? closeTrack() : ''}>

            <div className='h-[85%] w-[75%] flex flex-col items-center bg-white dark:bg-slate-700 pt-28 rounded '>
                {user && <div className='flex'>
                    <input value={trackerId} onChange={e => setTrackerId(e.target.value)} placeholder='Enter tracker ID'
                        className='rounded-l-md text-center text-black' type='text'></input>

                    <button className="bg-blue-500 hover:bg-blue-700 hover:shadow-blue-500
                     text-white sm:text-xs text-sm p-2 item-center rounded-r-md" onClick={handleClick}>Track</button>
                </div>}

                <div className='flex w-[100%] h-[15%] justify-center items-center mt-20'>

                    {parcelStatus && <ul className=' w-[100%] h-[100%] flex justify-center m-auto text-sm' id='progress-ul'>
                        {steps.map((item, index) => (
                            
                                <li className='flex flex-col h-[90%] w-[10%]'>
                                    <section className={`flex items-center h-[50%] w-[100%] ml-5
                                        after:content-[" "] after:h-1 after:w-[100%] ${index === 3 ? 'after:bg-transparent' : ''}
                                        ${index < 3 && parcelStatus && parcelStatus.stepAction <= index   ? 'dark:after:bg-gray-400  after:bg-gray-200': ' after:bg-green-500'}
                                `}>
                                       {  parcelStatus && parcelStatus.stepAction > index || parcelStatus.stepAction === 3 ?  <DoneIcon className='text-sm rounded-full bg-green-500 text-white'/> : <span className={`rounded-full ${parcelStatus && parcelStatus.stepAction >= index ? 'bg-green-500' : 'bg-gray-500'}  w-3 h-3 `}></span>
                                           
                                        }
                                        
                                    </section>
                                    <span>{parcelStatus.stepAction === 4 && index === 3 ? parcelStatus.isReturned ? 'Returned' : 'Canceled' : item} </span>
                                </li >
                               
                            
                        ))

                        }
                    </ul>}

                </div>

                {parcelStatus && <div className='h-[50%] w-[70%] bg-white rounded-md pt-2 flex flex-col overflow-scroll'>
                    {
                        parcelStatus?.parcelStatus.map((item) => (
                            <span className='m-2 text-black text-sm'>{item}</span>
                        ))


                    }

                </div>}

            </div>
        </div>
    )
}

export default Track;