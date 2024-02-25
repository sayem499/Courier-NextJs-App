"use client"
import React, {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useRouter } from 'next/navigation';
import Table from '@/components/table';
import { toast } from 'react-toastify';
import { useGetParcelStatusWithSenderIdMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { getParcelStatuses } from '@/redux/parcelStatus/parcelStatusSlice';

const Payment = () => {

  const {user} = useAppSelector( state => state.userState);
  const {parcelStatuses} = useAppSelector( state => state.parcelStatusState);
  const [getParcelStatusWithSenderId] = useGetParcelStatusWithSenderIdMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!user){
      router.push('/');
    }else{
      getTableData();
    }
    
  },[])

  const hiddenCols = {}
  const columns = [
    {
      header: 'ID',
      accessorKey: '_id',

    },
    {
      header: 'Payment',
      accessorFn:(row: any) => row ,
      cell:(cell: any) => {
        const row = cell.getValue();
        return( row.isPaid ? <span className='text-green-500'>Paid</span> : <span className='text-red-500'>Pending</span>)
      }
    },
    {
      header: 'Delivery Cost',
      accessorFn: (row: any) => row,
      cell:(cell: any) => {
        const row = cell.getValue();
        return(<span>{row.deliveryCost + ' ৳'}</span>)
      }
    },
  ]

  const getTableData = async () => {
    try{
      let sender_id = user?._id;
      const res = await getParcelStatusWithSenderId({sender_id}).unwrap();
      res && dispatch(getParcelStatuses(res));
    }catch(err: any){
      toast.error(err.data.message || err.error);
    }
  }

  return (
    <div className="h-[100%] w-[100%] flex flex-col">
      <div className='flex items-center justify-center h-[100%] w-[100%]'>
      { parcelStatuses.length > 0 ? <Table data={parcelStatuses} columns={columns} hiddenCols={hiddenCols}/> : 'Loading...' }
      </div>
    </div>
  ) 
}

export default Payment