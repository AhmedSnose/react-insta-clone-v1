import {modolState} from '../atomos/modolAtom'
import {useRecoilState} from 'recoil';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment , useRef ,useState} from 'react';
import CameraEnhance  from '@material-ui/icons/CameraEnhance';
import {useSession ,signOut} from 'next-auth/client'
import {db,sto} from '../utils/firebase'
import { doc, onSnapshot } from "firebase/firestore";
import { addDoc , collection, serverTimestamp, updateDoc} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from '@firebase/storage';

function Modol() {
    const [openPost , setOpenPost] = useRecoilState(modolState)
    const [sellectedImg , setSellectedImg] = useState(null)
    const [loading , setLoding] = useState(false)
    const captionRef = useRef(null)
    const filePicker = useRef(null)
    const [session , loging] = useSession()

    const uploadePost = async () => {
        if(loading) return;

        setLoding(true)
        // add data expext the img , to the firebase collection then got the id 
        const docRef = await addDoc(collection(db , 'Posts') , {
          username:session.user.name,
          email:session.user.email,
          caption:captionRef.current.value,
          profileIMG:session.user.image,
          timeStamp:serverTimestamp(),
          likes: Math.round(Math.random() * 1000)
        })

        console.log("new doc aded with id" ,docRef.id)

        // add img 
        const imgREF = ref(sto, `Posts/${docRef.id}/image`)

        await uploadString(imgREF , sellectedImg ,'data_url')
        .then(async snapshot => {
          const downloadURL =  await getDownloadURL(imgREF)

          await updateDoc(doc(db , 'Posts' , docRef.id), {
            postUrl:downloadURL
          })

        })

        setLoding(false)
        setOpenPost(false)
        setSellectedImg(null)
    }

    const addimgeToPost = (e)=>{
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent)=>{
            setSellectedImg(readerEvent.target.result)
        }
    }


    return (
        <Transition appear show={openPost} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpenPost}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-300 opacity-[.6]" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                 { sellectedImg ? (

                    <img className='w-full object-contain cursor-pointer' src={sellectedImg} alt='Pic' onClick={()=>setSellectedImg(null)}/>

                 ) :(<div onClick={()=> filePicker.current.click()} 
                    className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                  >
                      <CameraEnhance 
                      className=' w-6 text-red-600 h-6'
                      aria-hidden='true'
                      />
                  </div> )}

                    <div>
                         <div className='mt-3 text-center sm:mt-5'>
                             <Dialog.Title as='h3' className='text-lg leading-6 font-semibold text-gray-900'>
                               Upload a Photo
                             </Dialog.Title>
                        </div> 


                        <input 
                          type='file'
                          hidden
                          ref={filePicker}
                          onChange={addimgeToPost}
                          />
                    </div>

                    <div className="mt-2">
                        <input 
                        className='border-none focus:ring-0 w-full text-center'
                        type='text'
                        placeholder='Say Something...'
                        ref={captionRef}
                        />
                    </div>

                    <div className='mt-5 sm:mt-6'>
                        <button 
                        type='button'
                        disabled={!sellectedImg}
                        className='inline-flex justify-center w-full rounded-md border-transparent shadow-sm
                        p-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                        disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                         onClick={uploadePost} >
                             {loading ? 'Loding...' : 'Upload Post'}
                         </button>
                    </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    )
}

export default Modol
