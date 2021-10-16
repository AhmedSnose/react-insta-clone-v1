import { Button } from '@material-ui/core';
import {useState ,useEffect} from 'react'
import { useRouter  } from 'next/router';
import {getSession ,signOut} from 'next-auth/client'


const img1 = 'https://www.kindpng.com/picc/m/699-6997553_wealtg-manager-avatar-illustration-hd-png-download.png' 
const img2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0hdrY8JPa6KVVvEo0uKO68yOoVt_-xBzsw&usqp=CAU'

async function CreateUser(dataUser){
    const result = await fetch('/api/user/change-pic',{
        method:"PATCH",
        body: JSON.stringify(dataUser),
        headers:{
          'Content-Type': 'application/json',
        }
      })
  
     const data = await result.json()  
     if(!result.ok){
       throw new Error(data.message || 'SomeThing Went Wrong')
     }
     return data;
  
  }
function ChosePic(props) {


    const [ImgUrl , setImgUrl] = useState('')
    const router = useRouter()
    const submitHandler = (e)=> {
        e.preventDefault()
        if(ImgUrl=='') {
         alert('ImgUrl is empty') 
         return
        } else {
          CreateUser(ImgUrl)
          signOut()
          router.replace('/')
          console.log("Done UPlode new-img");
        }


    }


 const [loding , isLoding] = useState(true)
  useEffect(()=>{
    getSession().then(session => {
          
      if(!session){
        router.replace('/')
      } else isLoding(false)

    })
  },[])

  if(loding){ 
    return <p className='text-5xl text-center'>make combonnent with insta logo</p>
  }


    return (
        <div className='flex flex-col'>
            <h2 className=' text-center m-7 text-gray-800 text-3xl'>Chose url img For your Profile</h2>
             <form onSubmit={submitHandler} className='flex justify-center items-center'>
               <h5 className=' mr-4 font-semibold'>Pick Url Photo</h5>
               <input className='outline-none' onChange={(e)=>setImgUrl(e.target.value)} type='url' placeholder=' URL' />
               <Button type='submit'>OK </Button>
            </form>

            <hr className='m-20'/>

            <h2 className='text-center my-5 text-gray-800 text-2xl'>Or Chose Default Avata From Those ⬇</h2>
            <div className='flex justify-center items-center'>
                <span className={`rounded-full cursor-pointer ${ImgUrl.includes(img1) ? 'bg-green-400' : null}`}><img onClick={(e)=>setImgUrl(e.target.src)} className=' w-[150px] m-4 rounded-full object-fill' src={img1} /></span>
                <span className={`rounded-full cursor-pointer ${ImgUrl.includes(img2) ? 'bg-green-400' :null}`}><img onClick={(e)=>setImgUrl(e.target.src)} className=' w-[150px] h-[150px] m-4 rounded-full object-fill' src={img2} /></span>
            </div>
            <button onClick={submitHandler} className='bg-gray-200 mt-10 p-5 text-[20px] active:bg-green-400 hover:bg-gray-700' type='submit'>Done 👍</button>
        </div>
    )
}

export default ChosePic
