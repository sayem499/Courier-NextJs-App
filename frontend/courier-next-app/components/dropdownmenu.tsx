

export default function Dropdownmenu() {

    return (
        <div className="rounded dark:bg-slate-500 bg-white absolute top-16 right-5 h-fit z-50">
            <ul className="flex items-center flex-col justify-center">
                <li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer'>Enterprise</li>
                <li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer '>Courier</li>
                <li className='mr-5 ml-5 mt-2 mb-2 dark:text-slate-300 hover:text-white cursor-pointer '><button className=" rounded-full 
        bg-green-600 px-4 py-2 dark:text-slate-300 hover:text-white">Login</button></li>
            </ul>
        </div>
    )

} 