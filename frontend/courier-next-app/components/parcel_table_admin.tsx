'use client'
import React,{ useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Table from '../components/table';
import { useAppSelector } from '@/app/hooks';




const Parceltable: React.FC<{ closeParceltable: (event: React.MouseEvent | void) => void }> = ({ closeParceltable}) => {
    const {parcels} = useAppSelector(state => state.parcelState);
    const columns = [
        {
            header: 'Tracker ID',
            accessorKey: 'tracker_id',
        },
        {
            header: 'Reciever Name',
            accessorKey: 'receiverName',
        },
        {
            header: 'Reciever Phonenumber',
            accessorKey: 'receiverPhonenumber',
        },
        {
            header: 'Receiver Address',
            accessorFn: (row: { address: string; upazila: string; district: string; postcode: string; division: string; }) =>
                `${row.address}, ${row.upazila}, ${row.district}-${row.postcode}, ${row.division}`,
        },
        {
            header: 'Sender Name',
            accessorKey: 'senderName',
        },
        {
            header: 'Sender Phonenumber',
            accessorKey: 'senderPhonenumber',
        },
        {
            header: 'Sender Address',
            accessorFn: (row: { senderAddress: string; senderUpazila: string; senderDistrict: string; senderPostcode: string; senderDivision: string; }) =>
                `${row.senderAddress}, ${row.senderUpazila}, ${row.senderDistrict}-${row.senderPostcode}, ${row.senderDivision}`,
        },
        {
            header: 'Parcel Weight(g)',
            accessorKey: 'parcelWeight',
        },
        {
            header: 'Parcel Type',
            accessorKey: 'parcelType',
        },
        {
            header: 'Delivery Cost (Tk.)',
            accessorKey: 'deliveryCost',
        },

    ]
    return (
        <div className='flex w-[100%] h-[100%] justify-center items-center fixed top-0 left-0 bg-black/[0.4] z-10'>
            <div className='flex flex-col justify-center items-center h-[85%] w-[95%] dark:bg-slate-600 bg-gray-100'>
                <CloseIcon className='fixed top-14 right-10' onClick={closeParceltable} />
                 <Table data={parcels} columns={columns} />
            </div>
        </div>
    )
}

export default Parceltable