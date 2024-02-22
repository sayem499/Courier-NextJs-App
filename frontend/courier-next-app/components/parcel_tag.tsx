import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Barcode from 'react-jsbarcode';



const Parceltag : React.FC<{ closeParceltag: (event: React.MouseEvent | void) => void, tracker_id: string, parcelData: any}>  = ({closeParceltag, tracker_id, parcelData}) => {

    return (
    <div className='w-[60%] h-[100%] absolute flex flex-col items-center justify-center z-10 overflow-auto bg-white group'>
        <div className=' w-[95%] h-[5%] justify-end items-center flex'>
            <CloseIcon className='text-black opacity-0 group-hover:opacity-100' onClick={closeParceltag}/>
        </div>
        <div className='w-[90%] h-[90%] flex flex-col justify-center items-center border border-black'>
            <div className='w-[80%] h-[20%] flex items-start mt-4 text-black mb-10'>
                <div className='flex flex-col'>
                <span className='font-bold'>Sender Information:</span>
                <span className=''>{parcelData[0].senderName}</span>
                <span className=''>{parcelData[0].senderPhonenumber}</span>
                <span className=''>{parcelData[0].senderAddress}</span>
                <span className=''>{parcelData[0].senderUpazila}, {parcelData[0].senderDistrict}-{parcelData[0].senderPostcode}</span>
                <span className=''>Division: {parcelData[0].senderDivision}</span>
                </div> 
            </div>

            <Barcode value={tracker_id}/>

            <div className='w-[80%] h-[20%] flex items-start mt-4 text-black mb-10'>
                <div className='flex flex-col'>
                <span className='font-bold'>Receiver Information:</span>
                <span className=''>{parcelData[0].receiverName}</span>
                <span className=''>{parcelData[0].receiverPhonenumber}</span>
                <span className=''>{parcelData[0].address}</span>
                <span className=''>{parcelData[0].upazila}, {parcelData[0].district}-{parcelData[0].postcode}</span>
                <span className=''>Division: {parcelData[0].division}</span>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Parceltag