import Imageslider from '@/components/imageslider';
import Choice from '@/components/choice_section';
import Signup from '@/components/signup_section';
import '../globals.css'

interface Slide {
  url: string;
}

type SlideArray = Slide[];



export default function Home() {
  const slides: SlideArray = [
    { url: "/front_image_3.png" },
    { url: "/front_image_2.jpeg" },
    { url: "/front_image_1.jpg" },
  ]

  const messages: string[] = [
    "Client satisfaction is \nour first priority",
    "Our employees are \ntrained professionals",
    "We deliver all over \nBangladesh",
  ]

  return (
    <>

    
      <div className="flex w-full h-[100%] flex-col justify-center md:justify-start overflow-auto no-scrollbar">
        <div className='flex w-full h-full md:justify-start 
          justify-center sm:flex-row sm:h-full flex-col'>

          <div className='flex w-full  sm:w-4/5 h-1/2 sm:h-full justify-center'>
            <Imageslider messages={messages} slides={slides} />
          </div>

          <Signup />
        </div>
      </div>

      <Choice />
      

    </>
  )
}