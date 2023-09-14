"use client"
import React, { useEffect, useState } from 'react'
import Divisions from '@/JSON/bd-divisions.json';
import Districts from '@/JSON/bd-districts.json';
import Upazilas from '@/JSON/bd-upazilas.json';
import Postcodes from '@/JSON/bd-postcodes.json';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Newparcel = () => {

  /* Name states for sender  & receiver */

  const [senderName, setSenderName] = useState('');
  const [recieverName, setRecieverName] = useState('');

  /*  Phonenumber states for sender & reciever */

  const [senderPhonenumber, setSenderPhonenumber] = useState('');
  const [recieverPhonenumber, setRecieverPhonenumber] = useState(''); 


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
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(recieverName +' '+ recieverPhonenumber+ ' ')
    console.log(address + ' '+ division+ ' '+ district+ ' '+ upazila+ ' '+ postcode) 
    console.log(senderName +' '+ senderPhonenumber+ ' ')
    console.log(senderAddress + ' '+ senderDivision+ ' '+ senderDistrict+ ' '+ senderUpazila+ ' '+ senderPostcode) 
    console.log(parcelWeight+ ' ' + parcelType)



  }

  /* Function to handle reset */

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRecieverName('');
    setRecieverPhonenumber('');
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


  return (
    <div className='flex flex-col items-center  h-[300%] w-[100%] overflow-auto'>
      {/* Banner Div */}
      <div className=' w-[100%] h-[15%] flex '>

      </div>

      {/*  Form Div  */}
      <div className='w-[100%] h-[85%]  sm:pl-10 sm:pr-10'>
        <span className=' text-4xl md-10'>Create new parcel</span>

        <form className='h-[70%] w-[100%] mt-10' onSubmit={handleSubmit} onReset={handleReset}>
          <div className='flex-col'>
            <span className='text-2xl'>Reciever Infofmation</span>

            <div className='h-[20%] width-[100%] flex mt-2 text-sm'>
              <div className='flex flex-col m-2'>
                <label htmlFor='recieverName' className=''>Reciever Name</label>
                <input id='recieverName' value={recieverName} onChange={(e) => { setRecieverName(e.target.value)} } 
                  className='h-10 p-1 rounded text-black' type='text' placeholder='Type Name'></input>
              </div>

              <div className='flex flex-col m-2'>
                <label htmlFor='recieverPhone' className=''>Reciever Phonenumber</label>
                <input id='recieverPhone' value={recieverPhonenumber} onChange={(e) => setRecieverPhonenumber(e.target.value)} 
                  className='h-10 p-1 rounded text-black' type='tel' placeholder='Type Phonenumber'></input>
              </div>

            </div>

            <div className='h-[30%] width-[100%] flex text-sm '>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='recieverAddress' className=''>Reciever Address</label>
                <input id='recieverAddress' value={address} onChange={e => setAddress(e.target.value)}
                  className='h-10 w-[100%] p-1 rounded text-black' type='tel' placeholder='Type Address'></input>
              </div>

              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='recieverDivision' className=''>Reciever Division</label>
                <select id='recieverDivision' value={division} className='h-10 w-[100%] flex rounded items-center text-black'
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
                <select id='recieverDistrict' value={district} className='h-10 w-[100%] flex rounded items-center text-black'
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
                <select id='recieverUpazila' value={upazila} className='h-10 w-[100%] flex rounded items-center text-black'
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
                <select id='recieverPostcode' value={postcode} className='h-10 w-[100%] flex rounded items-center text-black'
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
                <input id='senderName' value={senderName} onChange={(e) => { setSenderName(e.target.value)} } 
                  className='h-10 p-1 rounded text-black' type='text' placeholder='Type Name'></input>
              </div>

              <div className='flex flex-col m-2'>
                <label htmlFor='senderPhone' className=''>Sender Phonenumber</label>
                <input id='senderPhone' value={senderPhonenumber} onChange={(e) => setSenderPhonenumber(e.target.value)} 
                  className='h-10 p-1 rounded text-black' type='tel' placeholder='Type Phonenumber'></input>
              </div>

            </div>

            <div className='h-[30%] width-[100%] flex text-sm '>
              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='senderAddress' className=''>Sender Address</label>
                <input id='senderAddress' value={senderAddress} onChange={e => setSenderAddress(e.target.value)}
                  className='h-10 w-[100%] p-1 rounded text-black' type='tel' placeholder='Type Address'></input>
              </div>

              <div className='h-[100%] w-[30%] flex flex-col m-2'>
                <label htmlFor='senderDivision' className=''>Sender Division</label>
                <select id='senderDivision' value={senderDivision} className='h-10 w-[100%] flex rounded items-center text-black'
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
                <label htmlFor='senderDistrict' className=''>Sender District</label>
                <select id='senderDistrict' value={senderDistrict} className='h-10 w-[100%] flex rounded items-center text-black'
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
                <label htmlFor='senderUpazila' className=''>Sender Upazila</label>
                <select id='senderUpazila' value={senderUpazila} className='h-10 w-[100%] flex rounded items-center text-black'
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
                <label htmlFor='senderPostcode' className=''>Sender Postcode</label>
                <select id='senderPostcode' value={senderPostcode} className='h-10 w-[100%] flex rounded items-center text-black'
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
          <div className='h-[10%] width-[100%] flex text-sm sm:mb-5'>

            <div className='h-[100%] w-[30%] flex flex-col m-2'>
              <label htmlFor='parcelWeight' className=''>Parcel Weight</label>
              <div className='flex items-center'>
                <input value={parcelWeight + "gm"} id='parcelWeight'
                  className='h-10 w-[100%] p-1 rounded text-black text-center' type='text' placeholder='Type Weight'></input>
                <div className='flex-col text-xs'>
                  <ArrowDropUpIcon onClick={weightUp} /><ArrowDropDownIcon onClick={weightDown} />
                </div>
              </div>
            </div>

            <div className='h-[100%] w-[30%] flex flex-col m-2'>

              <label htmlFor='parcelType' className=''>Select an option</label>
              <div className='flex h-10 w-[100%] p-1 mt-1 rounded text-black items-center justify-around bg-white border'>

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