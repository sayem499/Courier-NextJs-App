import { SocialIcon } from 'react-social-icons';


const Footer = () => {
  return (
    <div className="flex h-screen sm:h-[30%] w-[100%] 
    items-center dark:bg-slate-900 bg-white flex-col">
      {/* <div className="flex h-[100%] sm:h-[70%] w-[100%] bg-white dark:bg-slate-900">

      </div> */}
      <div className="flex h-[100%] pt-5 pl-20 sm:h-[100%] w-[100%]  bg-gray-300 dark:bg-slate-300 items-center justify-between">
        <div className="flex h-[100%] w-[20%] flex-col pl-5 m-2">
          <span className="text-black italic text-2xl font-semibold">NextCourier-&gt;</span>
          <span className="text-black mt-5">For better user experience use our app.</span>
          <img className="h-[30%] w-[50%] cursor-pointer" src="/google-play-badge.svg"></img>
        </div>
        <div className="flex h-[100%] w-[20%] flex-col pl-5 m-2">
          <span className="text-black text-lg font-semibold">Important links</span>
          <span className="text-black mt-2 cursor-pointer">Courier</span>
          <span className="text-black mt-2 cursor-pointer">Enterprise</span>
          <span className="text-black mt-2 cursor-pointer">FAQ</span>
          <span className="text-black mt-2 cursor-pointer">Privacy Policy</span>
          <span className="text-black mt-2 cursor-pointer">Coverage Area</span>
        </div>
        <div className="flex h-[100%] w-[20%] flex-col pl-5 m-2">
          <span className="text-black text-lg font-semibold">Contact Us</span>
          <span className="text-black mt-2">35, East Hajipara<br/>Rampura, Dhaka-1219.<br/>Mob: 01918302991</span>
        </div>
        <div className="flex h-[100%] w-[20%] flex-col pl-5 m-2">
          <span className="text-black text-lg font-semibold">Follow Us</span>
          <div className='flex'>
            <SocialIcon className="mr-1" url="https://www.youtube.com/"/>
            <SocialIcon className="mr-1"url="https://www.linkedin.com/"/>
            <SocialIcon className="mr-1"url="https://www.facebook.com/"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer