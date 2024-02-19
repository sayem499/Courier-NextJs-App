"use client"
import { useRouter, usePathname } from "next/navigation";

interface User {
  _id: string;
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_phonenumber: string;
};

interface Admin {
  _id: string,
  admin_email: string,
  admin_password: string,
  admin_location: string,
}



const Nav: React.FC<{ user: User | null, admin: Admin | null }> = ({ user, admin }) => {

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

  const routeRequest = () => {
    router.push('/admin/requests');
  }

  const routeDashboard = () => {
    router.push('/admin/dashboard');
  }

  const routeCreateDeliveryman = () => {
    router.push('/admin/deliveryman');
  }

  const routeCreateAdmin = () => {
    router.push('/admin/admin');
  }


  return (
    <div className="hidden h-[100%] sm:flex justify-center items-center">
      <ul className="sm:hidden md:flex justify-between items-center h-[100%]">
        {!user && !admin && <li className='mr-5 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Enterprise</li>}
        {!user && !admin && <li className='ml-5 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Courier</li>}
        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/home' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routeHome}>Dashboard</li>}
        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/parcel' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routeParcel}>Parcel</li>}
        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/return' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routeReturn}>Return</li>}
        {user && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/payment' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routePayment}>Payment</li>}

        {admin && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/admin/dashboard' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routeDashboard}>Dashboard</li>}

        {admin && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/admin/requests' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routeRequest}>Requests</li>}

        {admin && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/admin/deliveryman' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routeCreateDeliveryman}>Deliveryman</li>}

        {admin && <li className={`ml-6 mr-6 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg
                         dark:hover:text-white cursor-pointer flex justify-center items-center h-[100%] 
                          ${path === '/admin/admin' ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`} onClick={routeCreateAdmin}>Admin</li>}
      </ul>
    </div>
  )
}

export default Nav