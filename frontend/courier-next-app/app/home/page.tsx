"use client"
import { useRouter } from "next/navigation";
import { useAppSelector } from "../hooks"
import { useEffect } from "react";

function Home() {

  const {user} = useAppSelector( state => state.userState);
  const router = useRouter();

  useEffect(() => {
    if(!user){
      router.push('/');
     }
  })
  
  return (
    <div className="h-[100%] w-[100%] flex flex-col">
      <div className="h-[30%] w-[100%] flex ml-20">

      </div>
      <div className="h-[20%] w-[80%] flex justify-start ml-20">
        <span className="text-4xl capitalize">Welcome{", "+ user?.user_firstname +" "+ user?.user_lastname} </span>
      </div>
    </div>
  )
}

export default Home