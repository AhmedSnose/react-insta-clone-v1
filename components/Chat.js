import Nav from "./Nav"
import { useEffect , useState , useRef} from 'react'
import { useRouter } from 'next/router';
import { getSession, session} from 'next-auth/client'
import {useSession } from 'next-auth/client'
import { db } from "../utils/firebase";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "@firebase/firestore";
import UserChat from "./UserChat";

import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";


function index() {
  const [loding , isLoding] = useState(true)
  const [loddingSession , setisLoddingSession] = useState()
  const router = useRouter()
  const {email , receverImg} = router.query
  const [session , loging] = useSession()
  const messageRef = useRef()
  const [MSender , setMSender] = useState([])
  const [MSreceiver , setMSreceiver] = useState([])


  // useEffect(
  //   async ()=> {
  //    const refw = collection(db,'Users',session.user.email,'messages')

  //    const querySnapshotw = await getDocs(refw);

  //   const data2 = querySnapshotw.forEach((doc) => {
  //    console.log(doc.id, " => ", doc.data());
     
  //  });
  //     }
     
  //    ,[db])



     useEffect(
      ()=> onSnapshot(
          query(collection(db , 'Users', session.user.email,'messages'),orderBy("timeStamp")) , 
           (snapshot) =>{
              const data = snapshot.docs.map(e=>e.data())
              const filterd = data.filter(com => com.email === email)
                setMSreceiver(filterd)
                console.log(filterd,'data revev')
  
              }
          ) ,[db])
  


  // useEffect(async ()=>{
  // await getSession().then(session => {
  //     setisLoddingSession(session)

  //     if(!session){
  //       router.replace('/')
  //     } else isLoding(false)

  //   })
  // },[])






  //true

  useEffect(
    ()=> onSnapshot(
        query(collection(db , 'Users', email,'messages'),orderBy("timeStamp")) , 
         (snapshot) =>{
            const data = snapshot.docs.map(e=>e.data())
            const filterd = data.filter(com => com.email === session.user.email)
              setMSender(filterd)
              console.log(filterd,'data fillterd')

            }
        ) ,[db])




  const SendMessage = async (e)=>{

    const message = messageRef.current.value;
    e.preventDefault()
    // console.log(message);
    //send
    // await addDoc(collection(db , 'Users',email,'messages','message',session.user.email), 

    await addDoc(collection(db , 'Users',email,'messages'), 
      {email:session.user.email,photoUrl:session.user.image,timeStamp:serverTimestamp(),message:message}
    ); 

  }

  if(!loding){ 
    return <p className='text-5xl text-center'>make combonnent with insta logo</p>
  }

    return (
        <>
  <Nav />
    
  <div className='chat'>
   <div className='chat-inner'>

    <div className="preview">
      <div id="user-name">Chat <i className='fas fa-angle-down'></i></div>
      <UserChat  img={receverImg} email={email} message='OnSnapShot' />
      {/* <UserChat  img={receverImg} email={email} message='OnSnapShot' />
      <UserChat  img={receverImg} email={email} message='OnSnapShot' />
      <UserChat  img={receverImg} email={email} message='OnSnapShot' /> */}


  </div>

    <div className="chats">

      <div className="chat-banner">
        <div>
            <span id="chat-pic"> 
            <img id="pic" src={receverImg}/>
          </span>
          <span>
            {email}
          </span>
        </div>
        <div><i className='fas fa-info'></i></div>
      </div>

        {MSender.map((mes,id)=>(
        <SenderMessage key={id} messageSender={mes.message}/>
        ))}

       {MSreceiver.map((mes,id)=>(
         <ReceiverMessage key={id} messageReceiver={mes.message} />
        ))}
        

      <div className="user-input"></div>

      <form onSubmit={SendMessage} className="input-msg">
        <input type="text" ref={messageRef} id="send-input" placeholder="type something"/>
        <button type='submit' className='hover:cursor-pointer'>Send</button>
      </form>

    </div>

   </div>
  </div>
        </>
    )
}

export default index
