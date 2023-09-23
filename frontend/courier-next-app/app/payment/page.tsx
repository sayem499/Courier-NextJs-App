import React, {useEffect} from 'react';
import { useAppSelector } from '../hooks';
import { useRouter } from 'next/navigation';
const Payment = () => {

  const {user} = useAppSelector( state => state.userState);
  const router = useRouter();

  useEffect(() => {
    if(!user){
      router.push('/');
     }
  })

  return (
    <div className="h-[100%] w-[100%] flex flex-col"></div>
  )
}

export default Payment