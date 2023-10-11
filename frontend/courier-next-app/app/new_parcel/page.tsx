"use client"
import React, { useEffect, useState } from 'react'
import Divisions from '@/JSON/bd-divisions.json';
import Districts from '@/JSON/bd-districts.json';
import Upazilas from '@/JSON/bd-upazilas.json';
import Postcodes from '@/JSON/bd-postcodes.json';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/navigation';
import { useSetparcelMutation } from '@/redux/parcel/parcelApiSlice';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../hooks';
import { v4 as uuidv4 } from 'uuid';
import { resetParcel } from '@/redux/parcel/parcelSlice';
import { useSetParcelStatusMutation } from '@/redux/parcelStatus/parcelStatusApiSlice';

const Newparcel = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userState);
  const [setparcel, { isLoading }] = useSetparcelMutation();
  const [setParcelStatus] = useSetParcelStatusMutation();
  const [parcelPrice, setParcelPrice] = useState<number | string>(0);
  const [courierType, setCourierType] = useState('normal');
  const [cashCollectionAmount, setCashCollectionAmount] = useState<number | string>(0);
  const router = useRouter();

  useEffect(() => {
    if(!user){
      router.push('/');
    }
  })

  /* Name states for sender  & receiver */

  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');

  /*  Phonenumber states for sender & reciever */

  const [senderPhonenumber, setSenderPhonenumber] = useState('');
  const [receiverPhonenumber, setReceiverPhonenumber] = useState('');


  /* Receiver address state */
  const [address, setAddress] = useState('');
  const [division, setDivision] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [district, setDistrict] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazila, setUpazila] = useState('');
  const [postcode, setPostcode] = useState('');


  /* Reciever addredd state */
  const [senderAddress, setSenderAddress] = useState('');
  const [senderDivision, setSenderDivision] = useState('');
  const [senderDivisionId, setSenderDivisionId] = useState('');
  const [senderDistrict, setSenderDistrict] = useState('');
  const [senderDistrictId, setSenderDistrictId] = useState('');
  const [senderUpazila, setSenderUpazila] = useState('');
  const [senderPostcode, setSenderPostcode] = useState('');


  /* Parcel info state */

  const [parcelWeight, setParcelWeight] = useState(500);
  const [parcelType, setParcelType] = useState('others');

  /* Function to get division id from element and set Division value for receiver*/

  const handleDivChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const element = e.target.children[index];
    const divId = element.getAttribute('id');
    divId && setDivisionId(divId);
    setDivision(e.target.value);
  }

  /* Function to get district id from element and set district value for receiver*/
  const handleDisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const element = e.target.children[index];
    const disId = element.getAttribute('id');
    disId && setDistrictId(disId);
    setDistrict(e.target.value);
  }

  /*  Function to get Upazila id from element and set upazila value for receiver*/
  const handleUpaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const element = e.target.children[index];
    const disId = element.getAttribute('id');
    setUpazila(e.target.value);
  }

  /* Function to set postcode value for receiver*/

  const handlePostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostcode(e.target.value);

  }


  /* Function for parcel weight increase and decrease for receiver*/


  const weightUp = () => {
    setParcelWeight(parcelWeight + 500);
  }
  const weightDown = () => {
    setParcelWeight(parcelWeight - 500);
  }



  /* Function for parcel type selection.  */

  const selectParcelType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParcelType(e.target.value);
  }



  /* Function to get division id from element and set Division value for sender*/

  const handleSenderDivChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const element = e.target.children[index];
    const divId = element.getAttribute('id');
    divId && setSenderDivisionId(divId);
    setSenderDivision(e.target.value);
  }


  /* Function to get district id from element and set district value for sender*/

  const handleSenderDisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const element = e.target.children[index];
    const disId = element.getAttribute('id');
    disId && setSenderDistrictId(disId);
    setSenderDistrict(e.target.value);
  }

  /*  Function to get Upazila id from element and set upazila value forsender*/
  const handleSenderUpaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const element = e.target.children[index];
    const disId = element.getAttribute('id');
    setSenderUpazila(e.target.value);
  }

  /* Function to set postcode value for receiver*/

  const handleSenderPostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSenderPostcode(e.target.value);

  }


  /* Function to handle submit */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (receiverName === '' || receiverPhonenumber === '' || address === ''
      || senderName === '' || senderPhonenumber === '' || senderAddress === '') {

      toast.error('Please! fill out the required fields.')
    } else {
      const sender_id = user?._id;
      let _id = uuidv4();
      let tracker_id = generateRandomNumericID();

      try {
        const res = await setparcel({
          _id, sender_id, receiverName, receiverPhonenumber,
          address, division, district, upazila, postcode,
          senderName, senderPhonenumber, senderAddress, senderDivision, senderDistrict,
          senderUpazila, senderPostcode, parcelWeight, parcelType, tracker_id, parcelPrice, courierType, cashCollectionAmount,
        }).unwrap();

        

        if (res) {
          toast.success('Parcel created successfully!');
          handleReset();
          dispatch(resetParcel());

        }

      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }

      let parcel_id = _id;
      _id = tracker_id;
      let datetime = new Date();
      let parcelStatus: [string] = [`${datetime.toLocaleString()}: Request pending for approval.`];
      let stepAction = 0;
      try{
        await setParcelStatus({_id, parcelStatus, parcel_id, stepAction}).unwrap();
      }catch(err:any){
        toast.error(err?.data?.message || err.error);
      }
    }

  }

  /* Function to handle reset */

  const handleReset = (e: React.FormEvent<HTMLFormElement> | void) => {
    e && e.preventDefault();
    setReceiverName('');
    setReceiverPhonenumber('');
    setAddress('');
    setDivision('');
    setDistrict('');
    setUpazila('');
    setPostcode('');

    setSenderName('');
    setSenderPhonenumber('');
    setSenderAddress('');
    setSenderDivision('');
    setSenderDistrict('');
    setSenderUpazila('');
    setSenderPostcode('');

    setParcelWeight(500);
    setParcelType('others');

  }

  const generateRandomNumericID = () => {
    const min = 10000; // Smallest 5-digit number (10000)
    const max = 99999; // Largest 5-digit number (99999)
    const now = new Date();
    const formattedDate = now.getDate();
    const formattedMonth = now.getMonth()+1;
    const formattedTime = now.getHours();
    const formattedMinute = now.getMinutes();
    return `${formattedDate}${formattedMonth}${formattedTime}${formattedMinute}${Math.floor(Math.random() * (max - min + 1)) + min}`;
  };

  return (
    <div className='flex flex-col items-center  h-[300%] w-[100%] overflow-auto'>
      {/* Banner Div */}
      <div className=' w-[100%] h-[15%] flex '>

      </div>

      {/*  Form Div  */}
      <div className='w-[100%] h-[85%]  sm:pl-10 sm:pr-10 '>
        <span className=' text-4xl md-10'>Create new parcel</span>

        <form className='h-[70%] w-[100%] mt-10' onSubmit={handleSubmit} onReset={handleReset}>
          <div className='flex flex-col'>
            <span className='text-2xl'>Courier Type</span>
            <div className='h-[20%] width-[100%] flex mt-2 text-sm'>
              <div className='flex h-15 w-15 m-2 items-center'>
                <label htmlFor='normal' className='text-lg'>Normal</label>
                <input id='normal' name='courierTypeRadio' className='m-1' type='radio' value='normal' defaultChecked onClick={() => setCourierType('normal')} ></input>
              </div>
              <div className='flex h-15 w-15 m-2 items-center'>
                <label htmlFor='shop' className='text-lg'>Shop</label>
                <input id='shop' name='courierTypeRadio' className='m-1' type='radio' value='shop' onClick={() => setCourierType('shop')}></input>
              </div>
            </div>
            <span className='text-2xl'>Reciever Infofmation</span>

            <div className='h-[20%] width-[100%] flex mt-2 text-sm'>
              <div className='flex flex-col m-2'>
                <label htmlFor='recieverName' className=''>Reciever Name</label>
                <input id='recieverName' value={receiverName} onChange={(e) => { setReceiverName(e.target.value) }}
                  className='h-10 p-1 rounded text-black border border-black' type='text' placeholder='Type Name'></input>
              </div>

              <div className='flex flex-col m-2'>
                <label htmlFor='recieverPhone' className=''>Reciever Phonenumber</label>
                <input id='recieverPhone' value={receiverPhonenumber} onChange={(e) => setReceiverPhonenumber(e.target.value)}
                  className='h-10 p-1 rounded text-black border border-black' type='tel' placeholder='Type Phonenumber'></input>
              </div>

            </div>

            <div className='h-[30%] width-[100%] flex text-sm '>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='recieverAddress' className=''>Reciever Address</label>
                <input id='recieverAddress' value={address} onChange={e => setAddress(e.target.value)}
                  className='h-10 w-[100%] p-1 rounded text-black border border-black' type='tel' placeholder='Type Address'></input>
              </div>

              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='recieverDivision' className=''>Reciever Division</label>
                <select id='recieverDivision' value={division} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handleDivChange}>
                  <option value={''}>Choose Division</option>
                  {
                    Divisions.divisions.map((div, key) => {
                      return (
                        <option key={key} id={div.id} value={div.name}>{div.name}</option>

                      )
                    })
                  }
                </select>
              </div>
            </div>

            <div className='h-[30%] width-[100%] flex text-sm '>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='recieverDistrict' className=''>Reciever District</label>
                <select id='recieverDistrict' value={district} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handleDisChange}>
                  <option value={''}>Choose District</option>
                  {
                    Districts.districts.filter((dis) => dis.division_id === divisionId).map((dis, key) => {
                      return (
                        <option key={key} id={dis.id} value={dis.name}>{dis.name}</option>

                      )
                    })
                  }
                </select>

              </div>

              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='recieverUpazila' className=''>Reciever Upazila</label>
                <select id='recieverUpazila' value={upazila} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handleUpaChange}>
                  <option value={''}>Choose Upazila</option>
                  {
                    Upazilas.upazilas.filter((upa) => upa.district_id === districtId).map((upa, key) => {
                      return (
                        <option key={key} id={upa.id} value={upa.name}>{upa.name}</option>

                      )
                    })
                  }
                </select>
              </div>
            </div>


            <div className='h-[30%] width-[100%] flex text-sm sm:mb-20'>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='recieverPostcode' className=''>Reciever Postcode</label>
                <select id='recieverPostcode' value={postcode} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handlePostChange}>
                  <option value={''}>Choose Postcode</option>
                  {
                    Postcodes.postcodes.filter((post) => (post.division_id === divisionId && post.district_id === districtId)).map((post, key) => {
                      return (
                        <option key={key} value={post.postCode}>{post.postCode}</option>

                      )
                    })
                  }
                </select>
              </div>

            </div>
          </div>





          {/* Sender Information */}

          <div className='flex-col'>
            <span className='text-2xl '>Sender Infofmation</span>

            <div className='h-[20%] width-[100%] flex mt-2 text-sm'>
              <div className='flex flex-col m-2'>
                <label htmlFor='senderName' className=''>Sender Name</label>
                <input id='senderName' value={senderName} onChange={(e) => { setSenderName(e.target.value) }}
                  className='h-10 p-1 rounded text-black border border-black' type='text' placeholder='Type Name'></input>
              </div>

              <div className='flex flex-col m-2'>
                <label htmlFor='senderPhone' className=''>Sender Phonenumber</label>
                <input id='senderPhone' value={senderPhonenumber} onChange={(e) => setSenderPhonenumber(e.target.value)}
                  className='h-10 p-1 rounded text-black border border-black' type='tel' placeholder='Type Phonenumber'></input>
              </div>

            </div>

            <div className='h-[30%] width-[100%] flex text-sm '>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='senderAddress' className=''>Sender/Pick-up Address</label>
                <input id='senderAddress' value={senderAddress} onChange={e => setSenderAddress(e.target.value)}
                  className='h-10 w-[100%] p-1 rounded text-black border border-black' type='tel' placeholder='Type Address'></input>
              </div>

              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='senderDivision' className=''>Sender/Pick-up Division</label>
                <select id='senderDivision' value={senderDivision} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handleSenderDivChange}>
                  <option value={''}>Choose Division</option>
                  {
                    Divisions.divisions.map((div, key) => {
                      return (
                        <option key={key} id={div.id} value={div.name}>{div.name}</option>

                      )
                    })
                  }
                </select>
              </div>
            </div>

            <div className='h-[30%] width-[100%] flex text-sm '>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='senderDistrict' className=''>Sender/Pick-up District</label>
                <select id='senderDistrict' value={senderDistrict} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handleSenderDisChange}>
                  <option value={''}>Choose District</option>
                  {
                    Districts.districts.filter((dis) => dis.division_id === senderDivisionId).map((dis, key) => {
                      return (
                        <option key={key} id={dis.id} value={dis.name}>{dis.name}</option>

                      )
                    })
                  }
                </select>

              </div>

              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='senderUpazila' className=''>Sender/Pick-up Upazila</label>
                <select id='senderUpazila' value={senderUpazila} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handleSenderUpaChange}>
                  <option value={''}>Choose Upazila</option>
                  {
                    Upazilas.upazilas.filter((upa) => upa.district_id === senderDistrictId).map((upa, key) => {
                      return (
                        <option key={key} id={upa.id} value={upa.name}>{upa.name}</option>

                      )
                    })
                  }
                </select>
              </div>
            </div>


            <div className='h-[30%] width-[100%] flex text-sm sm:mb-20'>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='senderPostcode' className=''>Sender/Pick-up Postcode</label>
                <select id='senderPostcode' value={senderPostcode} className='h-10 w-[100%] flex rounded items-center text-black border border-black'
                  onChange={handleSenderPostChange}>
                  <option value={''}>Choose Postcode</option>
                  {
                    Postcodes.postcodes.filter((post) => (post.division_id === senderDivisionId && post.district_id === senderDistrictId)).map((post, key) => {
                      return (
                        <option key={key} value={post.postCode}>{post.postCode}</option>

                      )
                    })
                  }
                </select>
              </div>

            </div>

          </div>




          {/* Parcel Information  */}
          <span className='text-2xl'>Parcel Infofmation</span>
          
          {courierType === 'shop' ? <div className='h-[10%] width-[100%] flex text-sm sm:mb-5'>

            <div className='h-[100%] w-[30%] flex flex-col m-2'>
              <label htmlFor='parcelPrice'>Product Price (for shops)</label>
              <input className='h-10 w-[100%] p-1 rounded text-black border border-black' id='parcelPrice' type='number' value={parcelPrice} onChange={(e)=>setParcelPrice(e.target.value)}></input>
            </div>

            <div className='h-[100%] w-[30%] flex flex-col m-2'>
              <label htmlFor='cashCollectionAmount'>Cash Collection Amount (for shops)</label>
              <input className='h-10 w-[100%] p-1 rounded text-black border border-black' id='cashCollectionAmount' type='number' value={cashCollectionAmount} onChange={(e)=>setCashCollectionAmount(e.target.value)}></input>
            </div>
          </div> : ''}

          <div className='h-[10%] width-[100%] flex text-sm sm:mb-5'>

            <div className='h-[100%] w-[30%] flex flex-col m-2'>
              <label htmlFor='parcelWeight' className=''>Parcel Weight</label>
              <div className='flex items-center mt-1'>
                <input value={parcelWeight + "gm"} id='parcelWeight'
                  className='h-10 w-[100%] p-1 rounded-l border-black border-y border-l text-black text-center ' type='text' placeholder='Type Weight'></input>
                <div className='h-10 flex-col text-xs rounded-r border-black border-y border-r'>
                  <ArrowDropUpIcon className='h-5 w-5' onClick={weightUp} /><ArrowDropDownIcon className='h-5 w-5' onClick={weightDown} />
                </div>
              </div>
            </div>

            <div className='h-[100%] w-[30%] flex flex-col m-2'>

              <label htmlFor='parcelType' className=''>Select an option</label>
              <div className='flex h-10 w-[100%] p-1 mt-1 rounded text-black items-center justify-around bg-white border border-black'>

                <section className='flex items-center justify-center'>
                  <input type='radio' id='fragile' name='parcelType'
                    value={'fragile'} checked={parcelType === 'fragile'} onChange={selectParcelType}></input>
                  <label className='ml-1' htmlFor='fragile'>Fragile</label>
                </section>

                <section className='flex items-center justify-center'>
                  <input type='radio' id='liquid' name='parcelType'
                    value={'liquid'} checked={parcelType === 'liquid'} onChange={selectParcelType}></input>
                  <label className='ml-1' htmlFor='liquid'>Liquid</label>
                </section>

                <section className='flex items-center justify-center'>
                  <input type='radio' id='others' name='parcelType'
                    value={'others'} checked={parcelType === 'others'} onChange={selectParcelType}></input>
                  <label className='ml-1' htmlFor='others'>Others</label>
                </section>
              </div>
            </div>


          </div>



          {/* Submit button div */}

          <div className='flex justify-around items-center h-20 w-[50%]'>
            <button className=' h-[60%] w-[30%] rounded-md bg-red-500 text-white' type='reset'>Reset</button>
            <button type='submit' className='h-[60%] w-[30%] rounded-md bg-blue-500 text-white'>Submit</button>
          </div>

        </form>

      </div>


    </div>
  )
}

export default Newparcel