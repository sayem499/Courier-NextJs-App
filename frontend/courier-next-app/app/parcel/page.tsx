"use client"
import React, {useEffect} from 'react'
import { useRouter }  from 'next/navigation';
import Table from '@/components/table';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useGetparcelsMutation } from '@/redux/parcel/parcelApiSlice';
import { getParcels } from '@/redux/parcel/parcelSlice';

interface Parcel {
  receiverName: string;
  receiverPhonenumber: string;
  address: string;
  senderName: string;
  senderPhonenumber: string;
  senderAddress: string;
  parcelWeight: string;
  parcelType: string;
}


const Parcel = () => {

const router = useRouter();

  useEffect(() =>{
    if(user){
      getparcelData(user._id);
    }else{
      router.push('/');
    }
  },[])
  
const columns = [
    {
      header: 'Reciever Name',
      accessorKey: 'receiverName',
    },
    {
      header: 'Reciever Phonenumber',
      accessorKey: 'receiverPhonenumber',
    },
    {
      header: 'Receiver Address',
      accessorFn: (row: { address:string; upazila:string; district:string; postcode:string; division:string; }) => 
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
      accessorFn: (row: { senderAddress:string; senderUpazila:string; senderDistrict:string; senderPostcode:string; senderDivision:string; }) => 
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
      header: 'Tracker ID',
      accessorKey: 'tracker_id',
    }   
]
 const [getparcels , {isLoading}] = useGetparcelsMutation();  
 const {user} = useAppSelector(state => state.userState);
 const {parcels} = useAppSelector(state => state.parcelState);
 const dispatch = useAppDispatch();


 const getparcelData = async (sender_id: string) => {
  try{
    const res = await getparcels({sender_id}).unwrap();
    res && dispatch(getParcels(res));
  }catch(err: any) {
    toast.error(err?.data?.message || err.error);
  }
  
 }

  return (
    <div className="h-[100%] w-[100%] flex flex-col">
      
      <div className='h-[100%] w-[100%] flex items-center justify-center'>
        <div className='h-[100%] w-[70%] flex items-center justify-center overflow-auto'>
          <Table data={parcels} columns={columns}/>
          </div>
        
      </div>
    </div>
  )
}

export default Parcel