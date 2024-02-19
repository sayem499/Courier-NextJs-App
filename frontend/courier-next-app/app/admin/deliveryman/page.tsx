"use client"
import React, { useState } from 'react'
import Createdeliveryman from '@/components/create_deliveryman';
import Updatedeliveryman from '@/components/update_deliveryman';



const Deliveryman = () => {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);


  const stepOneSelected = () => {
    setStepOne(true);
    setStepTwo(false);
    setStepThree(false);
  }
  
  const stepTwoSelected = () => {
    setStepOne(false);
    setStepTwo(true);
    setStepThree(false);
  }
  
  const stepThreeSelected = () => {
    setStepOne(false);
    setStepTwo(false);
    setStepThree(true);
  }

  return (
    <div className='flex flex-col w-[100%] h-[100%] '>
      <div className='flex w-[100%] h-[10%] items-center justify-center'>
        <div className='flex h-[100%] w-[100%] items-center justify-center'>
          <button onClick={stepOneSelected} className={`m-2 h-fit w-fit ${stepOne ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Create</button>
          <button onClick={stepTwoSelected} className={`m-2 h-fit w-fit ${stepTwo ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Update</button>
          <button onClick={stepThreeSelected} className={`m-2 h-fit w-fit ${stepThree ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Delete</button>
        </div>
      </div>
      <div className='flex w-[100%] h-[90%] justify-center'>
        {
          stepOne && <Createdeliveryman/>
        }
        {
          stepTwo && <Updatedeliveryman/>
        }
      </div>

    </div>
  )
}

export default Deliveryman