"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Table from '@/components/table';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useGetparcelsMutation } from '@/redux/parcel/parcelApiSlice';
import { getParcels } from '@/redux/parcel/parcelSlice';
import Parceltag from '@/components/parcel_tag';
import { useGetParcelWithTrackerIdMutation } from '@/redux/parcel/parcelApiSlice';




const Parcel = () => {
  const [getparcels, { isLoading }] = useGetparcelsMutation();
  const { user } = useAppSelector((state: any) => state.userState);
  const { parcels } = useAppSelector((state: any)  => state.parcelState);
  const dispatch = useAppDispatch();
  const [tracker_id, setTrackeId] = useState('');
  const [showTag, setShowTag] = useState(false);
  const [parcelData, setParcelData] = useState([]);
  const [getParcelWithTrackerId] = useGetParcelWithTrackerIdMutation();
  
  const getParcelDataFunc = async (tracker_id: any) => {
       try{
        const parcelTempData = await getParcelWithTrackerId({tracker_id}).unwrap();
        setParcelData(parcelTempData)
        setShowTag(true);
       }catch(err: any){
        toast.error(err.error || err.data.message);
       } 
    } 


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
    {
      header: 'Parcel Tag,',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return(<><button onClick={() => handleViewTag(row.tracker_id)} className='w-12 h-8 bg-gray-300 text-black rounded-md shadow-md'>Tag</button></>)
      },
    },
  ]

  const handleViewTag = (_id: string) => {
    setTrackeId(_id);
    getParcelDataFunc(_id);
  }


  const getparcelData = async (sender_id: string) => {
    try {
      const res = await getparcels({ sender_id }).unwrap();
      res && dispatch(getParcels(res));
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const closeParceltag = () => {
    setShowTag(false);
  }

  return (
    <div className="h-[100%] w-[100%] flex flex-col overflow-auto items-center">
      <div className='h-[100%] w-[100%] flex items-center justify-center'>
        <div className='h-[100%] w-[100%] flex items-center justify-center '>
          {parcels.length > 0 ? <Table data={parcels} columns={columns} hiddenCols={hiddenCols} /> : 'Loading...'}
        </div>
      </div>
        {
          showTag && <Parceltag closeParceltag={closeParceltag} tracker_id={tracker_id} parcelData={parcelData}/>
        }
          
    </div>
  )
}

export default Parcel