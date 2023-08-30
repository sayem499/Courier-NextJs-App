"use client"
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { motion } from 'framer-motion';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

import React from 'react'

const Choice : React.FC = () => {
  return (
    <div id='choose' className='w-full h-screen sm:w-[100%] sm:h-screen bg-white dark:bg-slate-900  flex-col overflow-auto'>
        
        <section className='flex w-full h-[10%] justify-center items-center mt-10 sm:m-0'>
          <motion.span 
            initial={{opacity: 0}} 
            whileInView={{opacity:1}} 
            transition={{ease: "linear", delay: 0.5,  duration: 2, }} 
            viewport={{ once: true }}
            className='text-xl sm:text-3xl dark:text-white text-slate-900'>Why should you choose NextCourier</motion.span>
        </section>

        <section className='flex sm:flex-row flex-col w-full sm:h-[30%] h-[100%] justify-center items-center sm:mt-10'>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView = {{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className='flex flex-col bg-slate-50 dark:bg-slate-600 w-[50%] sm:w-[20%] h-[100%] m-5 sm:m-10 items-center sm:justify-start justify-center'>
              <SpeedIcon className='w-[50%] h-[50%] mt-2'/>
              <span className='dark:text-white text-xl sm:mt-1 font-bold text-center'>Fast Solutions</span>
              <span className='dark:text-white sm:text-sm text-xs sm:ml-3 sm:mr-3 sm:mt-1 sm:mb-4 text-center'>Our professional team are able to provide fastest soutions for your needs.</span>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1, type: "spring", stiffness: 200 }} 
            viewport={{ once: true }}
            className='flex flex-col bg-slate-50 dark:bg-slate-600 w-[50%] sm:w-[20%] h-[100%] m-5 sm:m-10 items-center sm:justify-start justify-center'>
              <VerifiedUserOutlinedIcon className='w-[50%] h-[50%] mt-2'/>
              <span className='dark:text-white text-xl sm:mt-1 font-bold text-center'>Secure Handling</span>
              <span className='dark:text-white sm:text-sm text-xs sm:ml-3 sm:mr-3 sm:mt-1 sm:mb-4 text-center'>We provide full security to the package trusted with us.</span>

          </motion.section>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1,type: "spring", stiffness: 200 }} 
            viewport={{ once: true }}
            className='flex flex-col bg-slate-50 dark:bg-slate-600 w-[50%] sm:w-[20%] h-[100%] m-5 sm:m-10 items-center sm:justify-start justify-center'>
              <ThumbUpAltOutlinedIcon className='w-[50%] h-[50%] mt-2'/>
              <span className='dark:text-white text-xl sm:mt-1 font-bold text-center'>Client Satisfaction</span>
              <span className='dark:text-white sm:text-sm text-xs sm:ml-3 sm:mr-3 sm:mt-1 sm:mb-4 text-center'>Client satisfaction is our number one priority.</span>
              
          </motion.section>
        </section>

        <section className='flex sm:flex-row flex-col w-full sm:h-[30%] h-[100%] justify-center items-center sm:mt-10'>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView = {{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className='flex flex-col bg-slate-50 dark:bg-slate-600 w-[50%] sm:w-[20%] h-[100%] m-5 sm:m-10 items-center sm:justify-start justify-center'>
              <PlaceOutlinedIcon className='w-[50%] h-[50%] mt-2'/>
              <span className='dark:text-white text-xl sm:mt-1 font-bold text-center'>Full Coverage</span>
              <span className='dark:text-white sm:text-sm text-xs sm:ml-3 sm:mr-3 sm:mt-1 sm:mb-4 text-center'>We provide our services all over Bangladesh.</span>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1, type: "spring", stiffness: 200 }} 
            viewport={{ once: true }}
            className='flex flex-col bg-slate-50 dark:bg-slate-600 w-[50%] sm:w-[20%] h-[100%] m-5 sm:m-10 items-center sm:justify-start justify-center'>
              <PriceCheckIcon className='w-[50%] h-[50%] mt-2'/>
              <span className='dark:text-white text-xl sm:mt-1 font-bold text-center'>Lowest Rates</span>
              <span className='dark:text-white sm:text-sm text-xs sm:ml-3 sm:mr-3 sm:mt-1 sm:mb-4 text-center'>We are providing lowest rates in Bangladesh.</span>

          </motion.section>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1,type: "spring", stiffness: 200 }}
            viewport={{ once: true }} 
            className='flex flex-col bg-slate-50 dark:bg-slate-600 w-[50%] sm:w-[20%] h-[100%] m-5 sm:m-10 items-center sm:justify-start justify-center'>
              <LocalShippingOutlinedIcon className='w-[50%] h-[50%] mt-2'/>
              <span className='dark:text-white text-xl sm:mt-1 font-bold text-center'>Easy Pickup & Delivery</span>
              <span className='dark:text-white sm:text-sm text-xs sm:ml-3 sm:mr-3 sm:mt-1 sm:mb-4 text-center'>We are at your for your pickup and delivery.</span>
              

          </motion.section>
        </section>
      </div>
  )
}

export default Choice