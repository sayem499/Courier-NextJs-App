"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Table from '@/components/table';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useGetparcelsMutation } from '@/redux/parcel/parcelApiSlice';
import { getParcels } from '@/redux/parcel/parcelSlice';




const Parcel = () => {
  const [getparcels, { isLoading }] = useGetparcelsMutation();
  const { user } = useAppSelector(state => state.userState);
  const { parcels } = useAppSelector(state => state.parcelState);
  const dispatch = useAppDispatch();

  let hiddenCols = { courierType: true, parcelPrice: true, cashCollectionAmount: true };
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getparcelData(user._id);
    } else {
      router.push('/');
    }
  }, [])

  const columns = [
    {
      header: 'Receiver Name',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return (<>{row.receiverName}</>)
      },
    },
    {
      header: 'Reciever Phonenumber',
      accessorKey: 'receiverPhonenumber',
    },
    {
      header: 'Receiver Address',
      accessorFn: (row: { address: string; upazila: string; district: string; postcode: string; division: string; }) =>
        `${row.address}, ${row.upazila}, ${row.district}-${row.postcode}, ${row.division}`,
    },
    {
      header: 'Sender Name',
      accessorKey: 'senderName',
    },
    {
      header: 'Sender Phonenumber',
      accessorKey: 'senderPhonenumber',
    },
    {
      header: 'Sender Address',
      accessorFn: (row: { senderAddress: string; senderUpazila: string; senderDistrict: string; senderPostcode: string; senderDivision: string; }) =>
        `${row.senderAddress}, ${row.senderUpazila}, ${row.senderDistrict}-${row.senderPostcode}, ${row.senderDivision}`,
    },
    {
      header: 'Parcel Weight(g)',
      accessorKey: 'parcelWeight',
    },
    {
      header: 'Parcel Type',
      accessorKey: 'parcelType',
    },
    {
      header: 'Courier Type',
      accessorKey: 'courierType',
    },
    {
      header: 'Parcel Price',
      accessorKey: 'parcelPrice',
    },
    {
      header: 'Cash Collection Amount',
      accessorKey: 'cashCollectionAmount',
    },
    {
      header: 'Tracker ID',
      accessorKey: 'tracker_id',
    },
    {
      header: 'Delivery Cost (Tk.)',
      accessorKey: 'deliveryCost',
    },
  ]



  const getparcelData = async (sender_id: string) => {
    try {
      const res = await getparcels({ sender_id }).unwrap();
      res && dispatch(getParcels(res));
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="h-[100%] w-[100%] flex flex-col overflow-auto">
      <div className='h-[100%] w-[100%] flex items-center justify-center'>
        <div className='h-[100%] w-[70%] flex items-center justify-center '>
          {parcels.length > 0 ? <Table data={parcels} columns={columns} hiddenCols={hiddenCols} /> : 'Loading...'}
        </div>
      </div>
    </div>
  )
}

export default Parcel