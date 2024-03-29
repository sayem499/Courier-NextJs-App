"use client"
import Table from '@/components/table';
import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useGetParcelStatusWithStepActionAdminMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { getParcelStatuses } from '@/redux/parcelStatus/parcelStatusSlice';
import { useUpdateParcelStatusWithTrackerIdAdminMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { useUpdateParcelWithIdMutation } from '@/redux/parcel/parcelApiSlice';
import { useGetParcelsWithIdsMutation } from '@/redux/parcel/parcelApiSlice';
import { useGetParcelStatusesWithIdsMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getParcels } from '@/redux/parcel/parcelSlice';
import { useGetParcelWithIdMutation } from '@/redux/parcel/parcelApiSlice';
import { useGetParcelWithAdminLocationPickupMutation, useGetParcelWithAdminLocationDeliveryMutation } from '@/redux/parcel/parcelApiSlice';
import { useGetDeliveryWithPhonenumberMutation } from '@/redux/delivery/deliveryApiSlice';
import { useSetDeliveryMutation } from '@/redux/delivery/deliveryApiSlice';
import { useUpdateDeliveryWithPhonenumberAdminMutation } from '@/redux/delivery/deliveryApiSlice';
import Parceltable from '@/components/parcel_table_admin';
import SearchIcon from '@mui/icons-material/Search';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import BarcodeReader from 'react-barcode-reader';



const Requests = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { admin } = useAppSelector(state => state.adminState);
  const [updateParcelWithIdMutation] = useUpdateParcelWithIdMutation();
  const [getParcelStatusWithActionStatus] = useGetParcelStatusWithStepActionAdminMutation();
  const [updateParcelStatusWithTrackerIdAdmin] = useUpdateParcelStatusWithTrackerIdAdminMutation();
  const [getDeliveryWithPhonenumber] = useGetDeliveryWithPhonenumberMutation();
  const [setDeliveryMutation] = useSetDeliveryMutation();
  const [updateDeliveryWithPhonenumberAdmin] = useUpdateDeliveryWithPhonenumberAdminMutation();
  const { parcelStatuses } = useAppSelector(state => state.parcelStatusState);
  const { parcels } = useAppSelector(state => state.parcelState);
  const [stepZero, setStepZero] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [showParceltable, setShowParcelTable] = useState(false);
  const [getParcelWithAdminLocationPickup] = useGetParcelWithAdminLocationPickupMutation();
  let parcelStatusMessage: string, deliveryCost: number;
  const [deliveryCostFlag, setDeliveryCostFlag] = useState(true);
  const [getParcelWithId] = useGetParcelWithIdMutation();
  const [getParcelsWithIds] = useGetParcelsWithIdsMutation();
  const [getParcelStatusesWithIds] = useGetParcelStatusesWithIdsMutation();
  const [searchText, setSearchText] = useState('')
  const [filterShow, setFilterShow] = useState(false);
  const [filterOptions, setFilterOptions] = useState('tracker_id');


  let deliveryMan_phonenumber: string;

  useEffect(() => {
    if (admin) {
      getParcelStatus();
    } else {
      router.push('/admin');
    }
  }, [stepZero, stepOne, stepTwo, stepThree, stepFour, filterOptions])

  const columns = [
    {
      header: 'ID',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return (
          <span className='cursor-pointer hover:text-shadow-md hover:shadow-white' onClick={() => openParceltable(row.parcel_id)}>{row._id}</span>
        )
      }

    },
    {
      header: 'Action',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return (row.stepAction === 3 || row.stepAction === 4 ? row.isReturned ? <button className='rounded-full bg-red-500 px-4 py-2 text-gray-50 hover:text-white'>Delete</button>
          : <button className='rounded-full bg-blue-500 px-4 py-2 text-gray-50 hover:text-white' onClick={() => handleReturnedClick(row._id)}>Returned</button>
          : row.stepAction === 0 ? <><input className='p-1 border rounded text-black ' type='number' placeholder='Enter parcel cost' value={deliveryCost} onSelect={() => setDeliveryCostFlag(false)} onChange={(e) => { deliveryCost = e.target.valueAsNumber }} required></input><button className={`rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1 ${ deliveryCostFlag ? ' opacity-50' : ' opacity-100' }`} onClick={() => acceptClickButton(row._id, row.parcel_id)} disabled={deliveryCostFlag}>Accept</button>
            <button className='rounded-full bg-red-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => cancelClickButton(row._id)}>Cancel</button></>
            : row.stepAction === 2 ? <><input className='p-1 border rounded text-black' type='text' placeholder='Enter phonenumber' value={deliveryMan_phonenumber} onChange={(e) => { deliveryMan_phonenumber = e.target.value }} />
              <button className={'rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' + (row.isDeliveryAssigned ? ' opacity-50' : ' opacity-100')} onClick={() => assignDeliveryMan(row._id)} disabled={row.isDeliveryAssigned}>Assign</button>
              <button className='rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => handleOutForDeliveryClick(row._id)}>Clear</button>
              <button className={'rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' } onClick={() => acceptClickButton(row._id, row.parcel_id)}>Accept</button></>
              : <><input className='rounded p-1 text-black' type='text' placeholder='Enter phonenumber' value={deliveryMan_phonenumber} onChange={(e) => { deliveryMan_phonenumber = e.target.value }}></input>
                <button className={'rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1 ' + (row.isPickupAssigned ? ' opacity-50' : ' opacity-100' )} onClick={() => assignDeliveryMan(row._id)} disabled={row.isPickupAssigned}>Assign</button>
                <button className={ 'rounded-full bg-green-500 px-4 py-2 text-gray-50 hover:text-white m-1' + (row.isPicked ? ' opacity-100' : ' opacity-50') } onClick={() => acceptClickButton(row._id, row.parcel_id)} disabled={!row.isPicked}>Accept</button>
                <button className='rounded-full bg-red-500 px-4 py-2 text-gray-50 hover:text-white m-1' onClick={() => cancelClickButton(row._id)}>Cancel</button></>)
      }
    },
    {
      header: 'Message',
      accessorFn: (row: any) => row,
      cell: (cell: any) => {
        const row = cell.getValue();
        return (<><input className='p-1 border rounded-l text-black ' type='text' value={parcelStatusMessage} onChange={(e) => { parcelStatusMessage = e.target.value }}></input><button className='p-1 rounded-r bg-blue-500' onClick={() => handleMessageSubmit(row._id)}>Send</button></>)
      }
    },
  ]

  const handleReturnedClick = async (_id: any) => {
    let datetime = new Date();
    let isReturned = true;
    const parcelStatus = `${datetime.toLocaleString()}: Parcel ${_id} returned successfully.`
    const res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, isReturned }).unwrap();
    getParcelStatus();
  }

  const openParceltable = async (parcel_id: string) => {
    let res;
    try {
      let _id = parcel_id;
      res = await getParcelWithId({ _id }).unwrap();
      res && dispatch(getParcels(res));
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
    setShowParcelTable(true);
  }

  const closeParceltable = () => {
    setShowParcelTable(false);
  }

  const handleMessageSubmit = async (_id: string) => {
    try {
      let datetime = new Date();
      let parcelStatus: string = `${datetime.toLocaleString()}: ${parcelStatusMessage}`;
      const res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus }).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }


  }

  const handleOutForDeliveryClick = async (id: string) => {
    try {
      let _id = id;
      let datetime = new Date();
      let parcelStatus: string = `${datetime.toLocaleString()}: Parcel out for delivery.`;
      const res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus }).unwrap();
      if (res) {
        getParcelStatus();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }


  }

  const getParcelStatus = async () => {

    try {
      let stepAction;

      stepZero ? stepAction = 0 : 0;
      stepOne ? stepAction = 1 : 0;
      stepTwo ? stepAction = 2 : 0;
      stepThree ? stepAction = 3 : 0;
      stepFour ? stepAction = 4 : 0;

      if (admin?.admin_location) {
        let admin_location = admin?.admin_location;
        const result = await getParcelWithAdminLocationPickup({ admin_location }).unwrap();
        const filteredParcelTrackers: [] = result.map((parcel: any) => parcel.tracker_id);
        if (filteredParcelTrackers) {
          const res = await getParcelStatusWithActionStatus({ stepAction }).unwrap();
          let filteredParcelStatuses: any[] = [];
          filteredParcelTrackers.forEach((tracker) => {
            filteredParcelStatuses = filteredParcelStatuses.concat(res.filter((parcel: any) => parcel._id === tracker))
          })
          filteredParcelStatuses && dispatch(getParcelStatuses(filteredParcelStatuses));
        }

      } else {
        const res = await getParcelStatusWithActionStatus({ stepAction }).unwrap();
        res && dispatch(getParcelStatuses(res));
      }

    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }

  }

  const cancelClickButton = async (id: any) => {
    try {
      let _id = id;
      let datetime = new Date();
      let parcelStatus = `${datetime.toLocaleString()} : Parcel canceled.`;
      let stepAction = 4;
      await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, stepAction }).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  }


  //Function to assign deliveryman
  const assignDeliveryMan = async (id: any) => {

    try {
      let _id = uuidv4();
      let deliveries: string[] = [], pickups: string[] = [];
      let stepAction;

      stepZero ? stepAction = 0 : 0;
      stepOne ? stepAction = 1 : 0;
      stepTwo ? stepAction = 2 : 0;

      let datetime = new Date();
      let parcelStatus: string;
      let result: any, res: any;
      deliveries.push(id);
      pickups.push(id);

      const deliveryCheck = await getDeliveryWithPhonenumber({ deliveryMan_phonenumber }).unwrap();

      if (stepAction === 1) {
        deliveries = [];
        let isPickupAssigned = true;
        parcelStatus = `${datetime.toLocaleString()}: Deliveryman assigned, pickup pending.`;
        if (deliveryCheck.length > 0) {

          res = await updateDeliveryWithPhonenumberAdmin({ deliveryMan_phonenumber, pickups }).unwrap();
          if(res){
            _id = id;
            result = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, deliveryMan_phonenumber, isPickupAssigned }).unwrap();
          }   
          if(result)
            getParcelStatus();

        } else {
          const createDeliveryRes = await setDeliveryMutation({ _id, deliveryMan_phonenumber, deliveries, pickups }).unwrap();
          if(createDeliveryRes){
            _id = id;
            result = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, deliveryMan_phonenumber, isPickupAssigned }).unwrap();
          }
            
          if(result)
            getParcelStatus();
        }

      } else if (stepAction === 2) {
        pickups = [];
        let isDeliveryAssigned = true;
        parcelStatus = `${datetime.toLocaleString()}: Deliveryman assigned, delivery pending.`;
        if (deliveryCheck.length > 0) {
          res = await updateDeliveryWithPhonenumberAdmin({ deliveryMan_phonenumber, deliveries }).unwrap();
          if(res){
            _id = id;
            result = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, deliveryMan_phonenumber, isDeliveryAssigned }).unwrap();
          }
            
          if(result)
            getParcelStatus();
        } else {
          const createDeliveryRes = await setDeliveryMutation({ _id, deliveryMan_phonenumber, deliveries, pickups }).unwrap();
          if(createDeliveryRes){
            _id = id;
            result = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, deliveryMan_phonenumber, isDeliveryAssigned }).unwrap();
          }
            
          if(result)
            getParcelStatus();
        }
      }


    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }

}

const handleScan = (data: string) => {
  parcelStatuses.map((parcelStatus: any) => {
    if(parcelStatus._id === data){
      acceptClickButton(parcelStatus._id, parcelStatus.parcel_id);
    }
  })

}

//function to update parcel status
const acceptClickButton = async (id: any, parcel_id: any) => {


  try {
    let _id;
    let stepAction;

    stepZero ? stepAction = 0 : 0;
    stepOne ? stepAction = 1 : 0;
    stepTwo ? stepAction = 2 : 0;


    let datetime = new Date();
    let parcelStatus: string = '', isReturned = false;
    let res: any;
    let isPaid;
    stepZero ? parcelStatus = `${datetime.toLocaleString()}: Parcel request approved, pickup pending.` : 0;
    stepOne ? parcelStatus = `${datetime.toLocaleString()}: Parcel shipped to warehouse.` : 0;
    stepTwo ? parcelStatus = `${datetime.toLocaleString()}: Parcel delivered successfully.` : 0;

    _id = parcel_id;
    if (stepZero)
      await updateParcelWithIdMutation({ _id, deliveryCost }).unwrap();
    _id = id;
    stepOne ? isPaid = true : 0;
    stepAction ? stepAction++ : stepAction = 1;
    console.log(deliveryCost);
    res = await updateParcelStatusWithTrackerIdAdmin({ _id, parcelStatus, stepAction, isPaid, deliveryCost, isReturned, deliveryMan_phonenumber }).unwrap();
    if (res) {
      getParcelStatus();
    }

  } catch (err: any) {
    toast.error(err?.data?.message || err.error);
    console.log(err.error || err.data?.message);
  }


}

// Function to handle search result

const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();

  if (searchText) {
    switch (filterOptions) {

      case 'tracker_id':
        try {

          let stepAction;

          stepZero ? stepAction = 0 : 0;
          stepOne ? stepAction = 1 : 0;
          stepTwo ? stepAction = 2 : 0;
          stepThree ? stepAction = 3 : 0;
          stepFour ? stepAction = 4 : 0;

          const res = await getParcelStatusWithActionStatus({ stepAction }).unwrap();

          const result = res.filter((item: any) => item._id.toLowerCase() === searchText.toLowerCase());

          dispatch(getParcelStatuses(result));


        } catch (err: any) {
          toast.error(err.data.message || err.error);
        }
        break;

      case 'district':
        try {

          let stepAction: any, ids: any[] = [], r, filteredParcels, filteredTrackerId: any[] = [];

          stepZero ? stepAction = 0 : 0;
          stepOne ? stepAction = 1 : 0;
          stepTwo ? stepAction = 2 : 0;
          stepThree ? stepAction = 3 : 0;
          stepFour ? stepAction = 4 : 0;

          const res = await getParcelStatusWithActionStatus({ stepAction }).unwrap();
          res.map((parcelStatus: any) => {
            ids.push(parcelStatus.parcel_id);
          })

          r = await getParcelsWithIds({ ids }).unwrap();
          filteredParcels = r.filter((item: any) => stepAction === 1 ? item.senderDistrict.toLowerCase() === searchText.toLowerCase() : stepAction === 2 ? item.district.toLowerCase() === searchText.toLowerCase() : null);
          filteredParcels.filter((item: any) => {
            filteredTrackerId.push(item.tracker_id);
          })

          ids = filteredTrackerId;
          const filteredRes = await getParcelStatusesWithIds({ ids }).unwrap();

          dispatch(getParcelStatuses(filteredRes));



        } catch (err: any) {
          toast.error(err.data.message || err.error);
        }
        break;

    }
  } else {
    getParcelStatus();
  }


}

//Function to handle option selection for search

const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFilterOptions(e.target.value);
}


const stepZeroSelected = () => {
  setStepZero(true);
  setStepOne(false);
  setStepTwo(false);
  setStepThree(false);
  setStepFour(false);
}

const stepOneSelected = () => {
  setStepZero(false);
  setStepOne(true);
  setStepTwo(false);
  setStepThree(false);
  setStepFour(false);
}

const stepTwoSelected = () => {
  setStepZero(false);
  setStepOne(false);
  setStepTwo(true);
  setStepThree(false);
  setStepFour(false);
}

const stepThreeSelected = () => {
  setStepZero(false);
  setStepOne(false);
  setStepTwo(false);
  setStepThree(true);
  setStepFour(false);
}

const stepFourSelected = () => {
  setStepZero(false);
  setStepOne(false);
  setStepTwo(false);
  setStepThree(false);
  setStepFour(true);
}

let hiddenCols = {};

return (
  <div className='h-[100%] w-[100%] flex flex-col items-center z-0'>
    <BarcodeReader
      onScan={handleScan}
      onError={(data: any) => toast.error(data)}
    />
    <div className='h-[20%] w-[70] flex items-center'>
      <button onClick={stepZeroSelected} className={`m-2 h-fit w-fit ${stepZero ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Approval</button>
      <button onClick={stepOneSelected} className={`m-2 h-fit w-fit ${stepOne ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Pick-up</button>
      <button onClick={stepTwoSelected} className={`m-2 h-fit w-fit ${stepTwo ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Shipped</button>
      <button onClick={stepThreeSelected} className={`m-2 h-fit w-fit ${stepThree ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Delivered</button>
      <button onClick={stepFourSelected} className={`m-2 h-fit w-fit ${stepFour ? 'border-b-4  border-b-blue-500  dark:border-b-indigo-500' : ''}`}>Canceled</button>
    </div>
    <div className='h-[100%] w-[100%] flex justify-center'>
      <div className='flex flex-col h-[100%] w-[100%] justify-center items-center'>
        <div className='flex h-[10%] w-[80%] justify-center'>
          <div className='flex h-[100%] w-[100%] items-center justify-start'>
            <form className='w-[30%] h-[100%] flex items-center' onSubmit={handleSearch}>
              <input className=' pl-3 p-2 w-[100%] h-[100%] text-black rounded-l focus:placeholder-transparent' placeholder='Search...' type='text' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
              <SearchIcon className='bg-white h-[100%] rounded-r text-gray pr-2 w-[10%] cursor-pointer' onClick={handleSearch} />
            </form>
            {!filterShow ? <TuneOutlinedIcon className='h-[50%] w-[5%] cursor-pointer' onClick={() => { setFilterShow(true) }} />
              :
              (
                <div className='flex h-[100%] w-[70%]'>
                  <div className='w-[100%] h-[100%] flex justify-start items-center'>
                    <input id='id' name='search_filter' className='m-3 h-[50%] w-4 bg-gray' type='radio' value='tracker_id' onChange={(e) => handleOptionSelect(e)} />
                    <label htmlFor='id'>ID</label>
                  </div>

                  <div className='w-[100%] h-[100%] flex justify-start items-center'>
                    <input id='district' name='search_filter' className='m-3 h-[50%] w-4 bg-gray' type='radio' value='district' onChange={(e) => handleOptionSelect(e)} />
                    <label htmlFor='district'>District</label>
                  </div>

                  <div className='w-[100%] h-[100%] flex justify-start items-center ml-5'>
                    <CloseIcon className='' onClick={() => { setFilterShow(false) }} />
                  </div>

                </div>
              )}

          </div>
        </div>
        <div className='h-[100%] w-[100%] flex justify-center '>
          {<Table data={parcelStatuses && parcelStatuses} columns={columns} hiddenCols={hiddenCols} />}
          {
            showParceltable && <Parceltable closeParceltable={closeParceltable} />
          }
        </div>
      </div>
    </div>
  </div>


)
}

export default Requests;