"use client"
import Table from '@/components/table';
import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useGetParcelStatusWithStepActionMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { getParcelStatuses } from '@/redux/parcelStatus/parcelStatuSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const Requests = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { admin } = useAppSelector(state => state.adminState);
  const [getParcelStatusWithActionStatus] = useGetParcelStatusWithStepActionMutation();
  const { parcelStatuses } = useAppSelector( state => state.parcelStatusState);

  useEffect(() => {
    if(admin){
      getParcelStatus();
    }else{
      router.push('/admin');
    }
  },[parcelStatuses])

  
  const columns = [
    {

    },
  ]

  const getParcelStatus = async () => {
    
    try{
      let stepAction = 0;
      const res = await getParcelStatusWithActionStatus({stepAction}).unwrap();
      dispatch(getParcelStatuses(res));
    }catch(err: any) {
      toast.error(err?.data?.message || err?.error);
    }
    
  }

  return (
    <div className='h-[100%] w-[100%] flex flex-col items-center'>
        <div className='h-[100%] w-[100%] flex justify-center'>
            <div className='h-[100%] w-[70%] flex justify-center'>
              {/* <Table data={parcelStatuses} columns={columns}/> */}
            </div>
        </div>
    </div>
  )
}

export default Requests;