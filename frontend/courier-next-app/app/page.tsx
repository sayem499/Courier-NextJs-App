
import Header from '../components/header';


export default function Home() {


  return (
    <>

      <Header />
      <div className="flex w-full h-full flex-col justify-center md:justify-start">
        <div className='flex w-full h-screen md:justify-start 
        justify-center sm:flex-row flex-col'>

          <div className='xl:flex w-screen sm:w-3/5 h-1/2 sm:h-screen justify-center 
        md:flex '>

          </div>

          <div className='flex w-full h-1/2 sm:h-screen justify-center 
        md:justify-end sm:w-2/5 '>

            <div className='flex flex-col w-full sm:w-3/5 h-full sm:h-4/5 
            md:mr-10 bg-slate-400 dark:bg-slate-600 rounded-b-2xl 
            items-center text-slate-600 dark:text-slate-300 overflow-auto'>

              <span className='sm:mt-10 text-xl'>Sign up</span>

              <div className='flex w-full flex-col 
              items-center mt-2 justify-center'>

                <input className='text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Email'
                  type='text' name='user_email'></input>

                <input className='text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Phonenumber'
                  type='text' name='user_phonenumber'></input>

                <input className='text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Password'
                  type='text' name='user_password'></input>

                <input className='text-sm m-2 p-2 w-4/5 rounded'
                  placeholder='Retype password'
                  type='text' name='user_passwordR'></input>

                <button className="bg-blue-500 mt-2 ml-2 mr-2 mb-5 w-4/5 
                hover:bg-blue-700 text-white  py-2 px-4 rounded">
                  Sign up
                </button>
              </div>
              <div className='flex items-center w-4/5 h-fit-content mt-3 mb-3'>
                <span className='border border-slate-300 w-1/2'></span>
                <span className='mr-2 ml-2'>or</span>
                <span className='border border-slate-300 w-1/2'></span>
              </div>
              
              <span className='sm:mt-3 text-lg'>Track your package.</span>
              <div className='flex items-center w-4/5 '>
              
                <input className='text-sm mt-2 mb-2 p-2 w-4/5 rounded-l'
                  placeholder='Track courier'
                  type='text' name='track_id'></input>

                  <button className="bg-blue-500  w-1/5 
                  hover:bg-blue-700 text-white text-sm p-2 item-center  rounded-r">
                    Track
                  </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </>
  )
}