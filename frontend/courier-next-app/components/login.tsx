"use client"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLoginMutation } from "@/redux/users/userApiSlice";
import { setUserData } from "@/redux/users/userSlice";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const Login: React.FC<{closeLogin: (event: React.MouseEvent<HTMLDivElement, MouseEvent>| void) => void}> = ({closeLogin}) => {
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [login,{isLoading, isSuccess}] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHndler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try{
      const res = await login({user_email, user_password}).unwrap();
      dispatch(setUserData({...res}));
      closeLogin();
      if(isSuccess) {router.push('/home');}

    }catch(err: any) {
      toast.error(err?.data?.message || err.error);
    }
  }
  
  return (
    <div id="login-container" className="flex flex-col items-center justify-center h-[100%] w-[100%] fixed top-0 left-0 bg-black/[0.4] z-10" onClick={e => {if((e.target as Element ).id === 'login-container') {closeLogin()}}}>
      <div className="flex flex-col rounded-lg justify-center items-center h-[80%] w-[35%] dark:bg-slate-600 bg-gray-100">

        <form className=" flex flex-col justify-center items-center w-[90%] h-[90%]">
          <div onClick = {closeLogin}><CloseIcon className="absolute top-[13%] right-[34%] cursor-pointer"/></div>
          <span className='sm:mt-2 sm: mb-3 text-2xl text-black dark:text-white'>Login</span>
          <input value={user_email} onChange={e => { setEmail(e.target.value) }}
            className='text-black text-sm m-2 p-2 w-4/5 rounded border-black border'
            placeholder='Email'
            type='email' name='user_email'></input>

          <input value={user_password} onChange={e => { setPassword(e.target.value) }}
            className='text-black text-sm m-2 p-2 w-4/5 rounded border-black border'
            placeholder='Password'
            type='password' name='user_password'></input>

          <button onClick={(e) => loginHndler(e)} className="bg-green-700 mt-2 ml-2 mr-2 mb-5 w-4/5 
                hover:bg-green-500 text-white  py-2 px-4 rounded">
           Login
          </button>
          <span>Forgot password? <a href='' className="text-blue-700 dark:text-blue-400 hover:text-blue-500 ">Click Here</a></span>
        </form>
      </div>
    </div>
  )
}

export default Login