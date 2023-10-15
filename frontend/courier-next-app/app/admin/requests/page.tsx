"use client"
import Table from '@/components/table';
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useGetParcelStatusWithStepActionMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { getParcelStatuses } from '@/redux/parcelStatus/parcelStatuSlice';
import { useUpdateParcelStatusWithTrackerIdAdminMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const Requests = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { admin } = useAppSelector(state => state.adminState);
  const [getParcelStatusWithActionStatus] = useGetParcelStatusWithStepActionMutation();
  const [updateParcelStatusWithTrackerIdAdmin] = useUpdateParcelStatusWithTrackerIdAdminMutation();
  const { parcelStatuses } = useAppSelector(state => state.parcelStatusState);
  const [stepZero, setStepZero] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);

  useEffect(() => {
    if (admin) {
      getParcelStatus();
    } else {
      router.push('/admin');
    }
  }, [stepOne, stepTwo, stepThree, stepZero, stepFour])


  const columns = [
    {
      header: 'ID',
      accessorKey: '_id',

    },
    {
      header: 'Action',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return ( row.stepAction === 3 || row.stepAction === 4 ? <button className='rounded-full bg-red-500 
        px-4 py-2 text-gray-50 hover:text-white'>Delete</button>
          : row.stepAction === 2 ?  <><button className='rounded-full bg-green-500 
          px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => handleOutForDeliveryClick(row._id)}>Clear</button>
           <button className='rounded-full bg-green-500 
        px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => acceptClickButton(row._id)}>Accept</button></>: <><button className='rounded-full bg-green-500 
        px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => acceptClickButton(row._id)}>Accept</button>
            <button className='rounded-full bg-green-500 
        px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => cancelClickButton(row._id)}>Cancel</button></>)
      }
    },
  ]

  const handleOutForDeliveryClick = async (id: string) => {
    try{
      let _id = id;
      let datetime = new Date();
      let parcelStatus: string = `${datetime.toLocaleString()}: Parcel out for delivery.`;
      const res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus }).unwrap();
      if(res){
        getParcelStatus();
      }
    } catch(err: any) {
      toast(err?.data?.message || err.error);
    }
    

  }

  const getParcelStatus = async () => {

    try {
      let stepAction;
      
      stepZero ? stepAction = 0 : 0;
      stepOne ? stepAction = 1 : 0;
      stepTwo ? stepAction = 2 : 0;
      stepThree ? stepAction = 3 : 0;
      stepFour ? stepAction = 4 : 0;

      const res = await getParcelStatusWithActionStatus({ stepAction }).unwrap();
      dispatch(getParcelStatuses(res));
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }

  }

  const cancelClickButton = async (id: any) => {
    try{
      let _id = id;
      let datetime = new Date();
      let parcelStatus = `${datetime.toLocaleString()} : Parcel canceled.`;
      let stepAction = 4;
      await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, stepAction }).unwrap();
    }catch(err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  const acceptClickButton = async (id: any) => {


    try {
      let _id = id;
      let stepAction;

      
      stepZero ? stepAction = 1 : 0;
      stepOne ? stepAction = 2 : 0;
      stepTwo ? stepAction = 3 : 0;
  

      let datetime = new Date();
      let parcelStatus: string = '';
      stepZero ? parcelStatus = `${datetime.toLocaleString()}: Parcel request approved, pickup pending.` : 0;
      stepOne ? parcelStatus = `${datetime.toLocaleString()}: Parcel shipped to warehouse.`: 0;
      stepTwo ? parcelStatus = `${datetime.toLocaleString()}: Parcel delivered successfully.`: 0;


      const res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, stepAction }).unwrap();
      if (res) {
        getParcelStatus();
      }

    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }


  }

  const stepZeroSelected = () => {
    setStepZero(true);
    setStepOne(false);
    setStepTwo(false);
    setStepThree(false);
    setStepFour(false);
  }

  const stepOneSelected = () => {
    setStepZero(false);
    setStepOne(true);
    setStepTwo(false);
    setStepThree(false);
    setStepFour(false);
  }

  const stepTwoSelected = () => {
    setStepZero(false);
    setStepOne(false);
    setStepTwo(true);
    setStepThree(false);
    setStepFour(false);
  }

  const stepThreeSelected = () => {
    setStepZero(false);
    setStepOne(false);
    setStepTwo(false);
    setStepThree(true);
    setStepFour(false);
  } 

  const stepFourSelected = () => {
    setStepZero(false);
    setStepOne(false);
    setStepTwo(false);
    setStepThree(false);
    setStepFour(true);
  }

  return (
    <div className='h-[100%] w-[100%] flex flex-col items-center'>
      <div className='h-[20%] w-[70] flex items-center'>
        <button onClick={stepZeroSelected} className={`m-2 h-fit w-fit ${ stepZero ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : '' }`}>Approval</button>
        <button onClick={stepOneSelected} className={`m-2 h-fit w-fit ${ stepOne ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : '' }`}>Pick-up</button>
        <button onClick={stepTwoSelected} className={`m-2 h-fit w-fit ${ stepTwo ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : '' }`}>Shipped</button>
        <button onClick={stepThreeSelected} className={`m-2 h-fit w-fit ${ stepThree ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : '' }`}>Delivered</button>
        <button onClick={stepFourSelected} className={`m-2 h-fit w-fit ${ stepFour ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : '' }`}>Canceled</button>
      </div>
      <div className='h-[100%] w-[100%] flex justify-center'>
        <div className='h-[100%] w-[70%] flex justify-center '>
        { <Table data={parcelStatuses} columns={columns} />}
        </div>
      </div>
    </div>
  )
}

export default Requests;