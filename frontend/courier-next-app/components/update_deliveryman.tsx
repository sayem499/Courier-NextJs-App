"use client"
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useGetDeliverymanWithPhonenumberMutation, useUpdateDeliverymanWithIdMutation } from '@/redux/deliveryMan/deliveryManAdminApiSlice';
import { toast } from 'react-toastify';
import { resetDeliveryman, setDeliveryMansData } from '@/redux/deliveryMan/deliveryManAdminSlice';
const Updatedeliveryman = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useAppDispatch();
    const { deliverymans } = useAppSelector((state) => state.deliveryManState);
    const [getDeliverymanWithPhonenumber] = useGetDeliverymanWithPhonenumberMutation();
    const [updateDeliverymanWithId] = useUpdateDeliverymanWithIdMutation();

    const [_id, setId] = useState('');
    const [deliveryMan_username, setUsername] = useState('');
    const [deliveryMan_phonenumber, setPhonenumber] = useState('');
    const [deliveryMan_email, setEmail] = useState('');
    const [deliveryMan_password, setPassword] = useState('');
    const [deliveryMan_confirmPassword, setConfirmPassword] = useState('');
    const [deliveryMan_image, setImage] = useState('');

    useEffect(() => {
        setId(deliverymans[0]?._id);
        setUsername(deliverymans[0]?.deliveryMan_username);
        setPhonenumber(deliverymans[0]?.deliveryMan_phonenumber);
        setEmail(deliverymans[0]?.deliveryMan_email);
    },[deliverymans])

    const handleSearch = async(e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
        e.preventDefault();
        let deliveryMan_phonenumber = searchText
        try{
            
            const res = await getDeliverymanWithPhonenumber({deliveryMan_phonenumber}).unwrap();
            if(res){
                dispatch(setDeliveryMansData(res));
            }
        }catch(err: any){
            toast.error(err.error || err.data?.message);
        }
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(deliveryMan_confirmPassword === deliveryMan_password){
            try{
                const res = await updateDeliverymanWithId({_id, deliveryMan_username, deliveryMan_phonenumber, deliveryMan_email, deliveryMan_password, deliveryMan_image }).unwrap();
                if(res){
                    setDeliveryMansData(res);
                    toast.success('Deliveryman data updated successfully!');
                }
            }catch(err: any){
                toast.error(err.error || err.data?.message);
            }
        }else {
            toast.error('Passwords do not match!');
        }
        
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files;
        const base64 : any = await convertBase64(file);
        setImage(base64)
    }

    const convertBase64 = ( file : any ) => {
        return new Promise( (resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file[0]);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        } )
            
    } 

    return (
        <div className='flex flex-col w-[100%] h-[100%] items-center'>
            <span className='text-bold text-2xl mb-3'>Deliveryman Update</span>
            <div className='flex w-[100%] h-[7%] items-center justify-center'>
                <form onSubmit={(e)=>handleSearch(e)} className='flex h-[100%] w-[50%] items-center justify-center'>
                    <input type='text' name='search' className='p-2 w-[50%] h-[100%] text-black rounded-l focus:placeholder-transparent' placeholder='Search...' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                    <SearchIcon className='bg-white h-[100%] rounded-r text-gray pr-2 w-[10%] cursor-pointer' onClick={(e)=>handleSearch(e)} />
                </form>
            </div>

            <div className='flex w-[100%] h-[100%] items-center justify-center mt-4 mb-4 overflow-auto'>
                {
                   deliverymans.length > 0 ? deliverymans?.map((man) => {
                        return <div key={man._id} className='flex flex-col w-[80%] h-[100%] items-center '>
                            <form className='flex flex-col items-center h-[100%] w-[100%]' onSubmit={(e) => handleSubmit(e)}>

                                <div className='flex w-[50%] flex-col mb-5'>
                                    <label className='mb-1' htmlFor='deliveryMan_username'>Username</label>
                                    <input onChange={(e) => setUsername(e.target.value)} value={deliveryMan_username} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Username' type="text" name='deliveryMan_username' id='deliveryMan_username' />
                                </div>

                                <div className='flex w-[50%] flex-col mb-5'>
                                    <label className='mb-1' htmlFor='deliveryMan_phonenumber'>Phonenumber</label>
                                    <input onChange={(e) => setPhonenumber(e.target.value)} value={deliveryMan_phonenumber} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Phonenumber' type="text" name='deliveryMan_phonenumber' id='deliveryMan_phonenumber' />
                                </div>

                                <div className='flex w-[50%] flex-col mb-5'>
                                    <label className='mb-1' htmlFor='deliveryMan_email'>Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} value={deliveryMan_email} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Email' type="text" name='deliveryMan_email' id='deliveryMan_email' />
                                </div>

                                <div className='flex w-[50%] flex-col mb-5'>
                                    <label className='mb-1' htmlFor='deliveryMan_image'>Image</label>
                                    <input accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)} className='rounded-sm text-sm p-2 text-black' type="file" name='deliveryMan_image' id='deliveryMan_image' />
                                    <img src={deliveryMan_image} alt='Profile Image'></img>
                                </div>

                                <div className='flex w-[50%] flex-col mb-5'>
                                    <label className='mb-1' htmlFor='deliveryMan_password'>Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} value={deliveryMan_password} className='rounded-sm text-sm p-2 text-black' placeholder='Enter Password' type="password" name='deliveryMan_password' id='deliveryMan_password' />
                                </div>

                                <div className='flex w-[50%] flex-col mb-5'>
                                    <label className='mb-1' htmlFor='deliveryMan_confirmPassword'>Re-type Password</label>
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} value={deliveryMan_confirmPassword} className='rounded-sm text-sm p-2 text-black' placeholder='Confirm Password' type="password" name='deliveryMan_confirmPassword' id='deliveryMan_confirmPassword' />
                                </div>

                                <button type='submit' className='w-[15%] rounded-md p-2 bg-green-500 text-white'>Submit</button>
                            </form>

                        </div>
                    }): ''
                }
            </div>
        </div>
    )
}

export default Updatedeliveryman