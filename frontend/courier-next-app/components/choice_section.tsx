"use client"
import SpeedIcon from '@mui/icons-material/Speed';
import { motion } from 'framer-motion';

import React from 'react'

const Choice : React.FC = () => {
  return (
    <div id='choose' className='w-full h-[60%] sm:w-[100%] sm:h-screen bg-white dark:bg-slate-900  flex-col'>
        
        <section className='flex w-full h-[10%] justify-center items-center mt-10 sm:m-0'>
          <motion.span 
            initial={{opacity: 0}} 
            whileInView={{opacity:1}} 
            transition={{ease: "linear", delay: 0.5,  duration: 2, }} 
            viewport={{ once: true }}
            className='text-xl sm:text-3xl dark:text-white text-slate-900'>Why should you choose NextCourier</motion.span>
        </section>

        <section className='flex w-full h-[30%] justify-center items-center mt-10'>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView = {{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className='flex flex-col bg-slate-50 dark:bg-slate-600 w-[20%] sm:w-[20%] h-[100%] m-5 sm:m-10 items-center'>
              <SpeedIcon className='w-[70%] h-[50%] mt-2'/>
              <span className='dark:text-white sm:text-xl text-lg mt-2'>Fast Solutions</span>
              <span className='dark:text-white sm:text-sm text-xs m-2 text-center'>Our professional team are able to provide fastest soutions for your needs.</span>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1, type: "spring", stiffness: 200 }} 
            viewport={{ once: true }}
            className='flex flex-col bg-slate-600 w-[20%] sm:w-[20%] h-[100%] m-5 sm:m-10'>

          </motion.section>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1,type: "spring", stiffness: 200 }} 
            viewport={{ once: true }}
            className='flex flex-col bg-slate-600 w-[20%] sm:w-[20%] h-[100%] m-5 sm:m-10'>

          </motion.section>
        </section>

        <section className='flex w-full h-[30%] justify-center items-center mt-10'>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView = {{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className='flex flex-col bg-slate-600 w-[20%] sm:w-[20%] h-[100%] m-5 sm:m-10'>

          </motion.section>

          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1, type: "spring", stiffness: 200 }} 
            viewport={{ once: true }}
            className='flex flex-col bg-slate-600 w-[20%] sm:w-[20%] h-[100%] m-5 sm:m-10'>

          </motion.section>
          <motion.section 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{  delay: 1,type: "spring", stiffness: 200 }}
            viewport={{ once: true }} 
            className='flex flex-col bg-slate-600 w-[20%] sm:w-[20%] h-[100%] m-5 sm:m-10'>

          </motion.section>
        </section>
      </div>
  )
}

export default Choice