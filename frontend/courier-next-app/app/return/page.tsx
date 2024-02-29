"use client"
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useRouter } from 'next/navigation';
import Table from '@/components/table';
import { getParcelStatuses } from '@/redux/parcelStatus/parcelStatusSlice';
import { useGetParcelStatusWithSenderIdMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { toast } from 'react-toastify';

const Return = () => {

  const { user } = useAppSelector(state => state.userState);
  const { parcelStatuses } = useAppSelector(state => state.parcelStatusState);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [getParcelStatusWithSenderId, { isLoading }] = useGetParcelStatusWithSenderIdMutation();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }

    getData();
  },[])

  const getData = async () => {
    let sender_id = user?._id
    try {

      const res = await getParcelStatusWithSenderId({ sender_id }).unwrap();
      dispatch(getParcelStatuses(res));

    } catch (err: any) {
      toast.error(err.data.message || err.error);
    }
  }

  const columns = [
    {
      header: 'Tracker ID',
      accessorKey: '_id',
    },
    {
      header: 'Status',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return( 
           row.isReturned ? <span className='text-green-500'>Returned</span> : <span className='text-red-500'>Pending</span> 
        )
      } 
    },
  ]


  const hiddenCols = {}
  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
      <div className='h-[100%] w-[100%] flex justify-center items-center'>
        {isLoading ? 'Loading...' : parcelStatuses ? <Table data={parcelStatuses} columns={columns} hiddenCols={hiddenCols} /> : 'No data found!'}
      </div>
    </div>
  )
}

export default Return