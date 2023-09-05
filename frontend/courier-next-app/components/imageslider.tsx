"use client"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useState, useEffect } from 'react';

interface Slide {
  url: string;
}

type SlideArray = Slide[];


const Imageslider: React.FC<{ slides: SlideArray, messages: string[] }> =
  ({ slides, messages }) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {

      setTimeout(() => {
        if (index < slides.length - 1)
          setIndex(index + 1);
        else
          setIndex(0);
      }, 6000)


    },)






    const prevSlide = () => {
      const isZeroIndex = index === 0;
      const newIndex = isZeroIndex ? slides.length - 1 : index - 1;
      setIndex(newIndex);
    }

    const nextSlide = () => {
      const isLastIndex = index === slides.length - 1;
      const newIndex = isLastIndex ? 0 : index + 1;
      setIndex(newIndex);
    }

    return (
      <div className="sm:w-full sm:h-[78%] items-center group bg-black overflow-hidden z-0">

        <img src={slides[index].url} alt=''
          className="object-fill w-full sm:h-[100%] opacity-50 "></img>
        <span className='block absolute top-[20%] left-20'>
         {
          messages[index].split('\n').map((item, i) => (
            <p key={i} className='text-xl sm:text-5xl text-white'>{item}</p>
          ))
         }
        </span>


        <div className='hidden group-hover:flex absolute top-[50%] 
      translate-x-0 translate-y-[-1/2] left-[1%] cursor-pointer
       bg-black/20 rounded-full items-center justify-center'>
          <ArrowBackIosIcon className='text-white' onClick={prevSlide} />
        </div>

        <div className='hidden group-hover:flex absolute top-[50%] 
      translate-x-0 translate-y-[-1/2] right-[3%] sm:right-[25%] cursor-pointer
       bg-black/20 rounded-full items-center '>
          <ArrowForwardIosIcon className='text-white' onClick={nextSlide} />
        </div>

      </div>
    )
  }

export default Imageslider