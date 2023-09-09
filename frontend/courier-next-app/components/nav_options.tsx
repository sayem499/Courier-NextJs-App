
import { useRouter, usePathname } from "next/navigation";

interface User {
    _id: string;
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_phonenumber: string;
};



const Nav: React.FC<{user: User | null}> = ({user}) => {

  const path = usePathname();
  const router = useRouter();

  const routeHome = () => {
    router.push('/home');
  }

  const routeParcel = () => {
    router.push('/parcel');
  }

  const routeReturn = () => {
    router.push('/return');
  }

  const routePayment = () => {
    router.push('/payment');
  }

  return (
    <div className="hidden h-[100%] sm:flex justify-center items-center">
                    <ul className="sm:hidden md:flex justify-between items-center h-[100%]">
                        {!user && <li className='mr-5 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Enterprise</li>}
                        {!user && <li className='ml-5 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Courier</li>}
                        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${ path === '/home' ?  'border-b-4  border-b-blue-500  dark:border-b-indigo-500': ''}`} onClick={routeHome}>Dashboard</li>}
                        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${ path === '/parcel' ?  'border-b-4  border-b-blue-500  dark:border-b-indigo-500': ''}`} onClick={routeParcel}>Parcel</li>}
                        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${ path === '/return' ?  'border-b-4  border-b-blue-500  dark:border-b-indigo-500': ''}`} onClick={routeReturn}>Return</li>}
                        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${ path === '/payment' ?  'border-b-4  border-b-blue-500  dark:border-b-indigo-500': ''}`} onClick={routePayment}>Payment</li>}
                    </ul>
                </div>
  )
}

export default Nav