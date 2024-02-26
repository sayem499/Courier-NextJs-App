"use client"
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../hooks"
import { useEffect } from "react";
import { useCheckTokenMutation } from '@/redux/users/userApiSlice';
import { logout } from '@/redux/users/userSlice';
import { toast } from "react-toastify";

function Home() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector( state => state.userState);
  const router = useRouter();
  const [checkToken] = useCheckTokenMutation();

  useEffect(() => {
    if(!user){
      router.push('/');
    }

    if (user) {
      tokenCheck();
      router.push('/home');
  } 
  })
  const tokenCheck = async () => {
    try {
        await checkToken().unwrap();
        return;
    } catch (err: any) {
        if (err?.data?.message === 'Not authorized, no token!') {
            dispatch(logout());
            router.push('/');
            toast.error(err?.data?.message || err.error);
            toast.error('Please login again!');
        }

    }
}
return (
    <div className="h-[100%] w-[100%] flex flex-col">
      <div className="h-[30%] w-[100%] flex ">

      </div>
      <div className="h-[20%] w-[80%] flex justify-start ml-20">
        <span className="text-4xl capitalize">Welcome{", "+ user?.user_firstname +" "+ user?.user_lastname} </span>
      </div>
    </div>
  )
}

export default Home