"use client"
import Table from '@/components/table';
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useGetParcelStatusWithStepActionMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { getParcelStatuses } from '@/redux/parcelStatus/parcelStatuSlice';
import { useUpdateParcelStatusWithTrackerIdAdminMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { useUpdateParcelWithIdMutation } from '@/redux/parcel/parcelApiSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getParcels } from '@/redux/parcel/parcelSlice';
import { useGetParcelWithIdMutation } from '@/redux/parcel/parcelApiSlice';
import Parceltable from '@/components/parcel_table_admin';



const Requests = () => {
 
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { admin } = useAppSelector(state => state.adminState);
  const [updateParcelWithIdMutation] = useUpdateParcelWithIdMutation();
  const [getParcelStatusWithActionStatus] = useGetParcelStatusWithStepActionMutation();
  const [updateParcelStatusWithTrackerIdAdmin] = useUpdateParcelStatusWithTrackerIdAdminMutation();
  const { parcelStatuses } = useAppSelector(state => state.parcelStatusState);
  const [stepZero, setStepZero] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [showParceltable, setShowParcelTable] = useState(false);
  let parcelStatusMessage: string, deliveryCost: number;
  const [getParcelWithId] = useGetParcelWithIdMutation();

  useEffect(() => {
    if (admin) {
      getParcelStatus();
    } else {
      router.push('/admin');
    }
  }, [stepZero, stepOne, stepTwo, stepThree, stepFour])

  const columns = [
    {
      header: 'ID',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return (
          <span className='cursor-pointer hover:text-shadow-md hover:shadow-white' onClick={()=>openParceltable(row.parcel_id)}>{row._id}</span>
        )
      }

    },
    {
      header: 'Action',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return (row.stepAction === 3 || row.stepAction === 4 ? <button className='rounded-full bg-red-500 
        px-4 py-2 text-gray-50 hover:text-white'>Delete</button>
          : row.stepAction === 0 ? <><input className='p-1 border rounded text-black ' type='number' placeholder='Enter parcel cost' value={deliveryCost} onChange={(e) => { deliveryCost = e.target.valueAsNumber }}></input><button className='rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => acceptClickButton(row._id, row.parcel_id)}>Accept</button>
            <button className='rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => cancelClickButton(row._id)}>Cancel</button></>
            : row.stepAction === 2 ? <><button className='rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => handleOutForDeliveryClick(row._id)}>Clear</button>
              <button className='rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => acceptClickButton(row._id, row.parcel_id)}>Accept</button></>
              : <><button className='rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => acceptClickButton(row._id, row.parcel_id)}>Accept</button>
                <button className='rounded-full bg-red-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => cancelClickButton(row._id)}>Cancel</button></>)
      }
    },
    {
      header: 'Message',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return (<><input className='p-1 border rounded-l text-black ' type='text' value={parcelStatusMessage} onChange={(e) => { parcelStatusMessage = e.target.value }}></input><button className='p-1 rounded-r bg-blue-500' onClick={() => handleMessageSubmit(row._id)}>Send</button></>)
      }
    },
  ]

  const openParceltable = async (parcel_id: string) => {
    let res;
    try {
      let _id = parcel_id;
      res = await getParcelWithId({ _id }).unwrap();
      res && dispatch(getParcels(res));
  } catch (err: any) {
      toast.error(err?.data?.message || err.error);
  }   
     setShowParcelTable(true);
  }

  const closeParceltable = () => {
    setShowParcelTable(false);
  }

  const handleMessageSubmit = async (_id: string) => {
    try {
      let datetime = new Date();
      let parcelStatus: string = `${datetime.toLocaleString()}: ${parcelStatusMessage}`;
      const res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus }).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }


  }

  const handleOutForDeliveryClick = async (id: string) => {
    try {
      let _id = id;
      let datetime = new Date();
      let parcelStatus: string = `${datetime.toLocaleString()}: Parcel out for delivery.`;
      const res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus }).unwrap();
      if (res) {
        getParcelStatus();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
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
    try {
      let _id = id;
      let datetime = new Date();
      let parcelStatus = `${datetime.toLocaleString()} : Parcel canceled.`;
      let stepAction = 4;
      await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, stepAction }).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  const acceptClickButton = async (id: any, parcel_id: any) => {


    try {
      let _id;
      let stepAction;


      stepZero ? stepAction = 1 : 0;
      stepOne ? stepAction = 2 : 0;
      stepTwo ? stepAction = 3 : 0;


      let datetime = new Date();
      let parcelStatus: string = '';
      stepZero ? parcelStatus = `${datetime.toLocaleString()}: Parcel request approved, pickup pending.` : 0;
      stepOne ? parcelStatus = `${datetime.toLocaleString()}: Parcel shipped to warehouse.` : 0;
      stepTwo ? parcelStatus = `${datetime.toLocaleString()}: Parcel delivered successfully.` : 0;
      let result: any, res: any;
      _id = parcel_id;
      if (stepZero)
        result = await updateParcelWithIdMutation({ _id, deliveryCost }).unwrap();
      _id = id;
      let isPaid; 
      stepOne ? isPaid = true : 0;
      res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, stepAction, isPaid}).unwrap();
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

  let hiddenCols = {};

  return (
    <div className='h-[100%] w-[100%] flex flex-col items-center z-0'>
      <div className='h-[20%] w-[70] flex items-center'>
        <button onClick={stepZeroSelected} className={`m-2 h-fit w-fit ${stepZero ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Approval</button>
        <button onClick={stepOneSelected} className={`m-2 h-fit w-fit ${stepOne ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Pick-up</button>
        <button onClick={stepTwoSelected} className={`m-2 h-fit w-fit ${stepTwo ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Shipped</button>
        <button onClick={stepThreeSelected} className={`m-2 h-fit w-fit ${stepThree ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Delivered</button>
        <button onClick={stepFourSelected} className={`m-2 h-fit w-fit ${stepFour ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Canceled</button>
      </div>
      <div className='h-[100%] w-[100%] flex justify-center'>
        <div className='h-[100%] w-[70%] flex justify-center '>
          {<Table data={parcelStatuses} columns={columns} hiddenCols={hiddenCols} />}
          {
            showParceltable && <Parceltable closeParceltable={closeParceltable}/>
          }
        </div>
      </div>
    </div>


  )
}

export default Requests;