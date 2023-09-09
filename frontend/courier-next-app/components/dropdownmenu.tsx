import { useLogoutMutation } from '@/redux/users/userApiSlice';
import { logout } from '@/redux/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/navigation';

export default function Dropdownmenu() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [logoutApi] = useLogoutMutation();
    const { user } = useAppSelector(state => state.userState);

    const logoutFunction = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await logoutApi().unwrap();
        dispatch(logout());
        router.push('/');
    }

    return (
        <div className="rounded dark:bg-slate-500 bg-white absolute top-16 right-5 h-fit z-50">
            <ul className="flex items-center flex-col justify-center">
               { !user &&  <><li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer'>Enterprise</li> 
                      <li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer '>Courier</li></> }

                {
                   user && <>
                        <li className='ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Dashboard</li>
                        <li className='ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Parcel</li>
                        <li className='ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Return</li>
                        <li className='ml-6 mr-6 mt-3 text-slate-900 dark:text-slate-300 hover:drop-shadow-lg dark:hover:text-white cursor-pointer '>Payment</li>
                   </>
                }      

                <li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer '>
                    {
                       !user ? <button className=" rounded-full bg-green-600 px-4 py-2 
                        dark:text-slate-300 hover:text-white">Login</button>

                        : <button onClick={logoutFunction} className=" rounded-full bg-red-600 px-4 py-2 
                        dark:text-slate-300 hover:text-white">Logout</button>
                    }
                </li>

            </ul>
        </div>
    )

} 