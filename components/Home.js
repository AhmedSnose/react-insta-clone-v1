import Head from 'next/head'
import Nav from './Nav'
import StateComponent from './StateComponent'
import TimeLine from './TimeLine'
import { useEffect , useState} from 'react'
// import { getSession} from 'next-auth/client'
import { useRouter } from 'next/router';
import Modol from './Modol'



export default function Home(props) {
  const router = useRouter()
  const stateData = props.props.stateData

//   const [loding , isLoding] = useState(true)
//   const [loddingSession , setisLoddingSession] = useState()

//   useEffect(()=>{
//     getSession().then(session => {
//       // you nededd later
//       setisLoddingSession(session)
//       // isLoding(false) if you putted herer first will stop load then the content page will flashes
//       // becuse betwwen [isLoding(false) and if(!session) will flash]

//       if(!session){
//         window.location.href = '/'
//       } else isLoding(false)

//     })
//   },[])

//   if(loding){ // اول ملصفحه ترندر لغايت ملاقي سيشون
//     return <p className='text-5xl text-center'>make combonnent with insta logo</p>
//   }
//   console.log(loddingSession.user, "loddingSession");
  return (
    
    <div>
      <Head>
        <title>instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
       {/* if no user homePage => history.push(./Login) */}
       <StateComponent stateData={stateData}/>
       <p className='m-10 hover:text-blue-600 cursor-pointer' onClick={()=> router.push('/setting/changePic')}>Change your img ▶</p>
       <TimeLine />
       <Modol />
    </div>
  )
}


