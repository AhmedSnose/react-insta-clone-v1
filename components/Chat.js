// import Nav from "./Nav"
import { useEffect , useState , useRef} from 'react'
import { useRouter } from 'next/router';
// import { getSession, session} from 'next-auth/client'
// import {useSession } from 'next-auth/client'
import { db } from "../utils/firebase";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "@firebase/firestore";
import UserChat from "./UserChat";

import AllMes from "./AllMes";


function index({session}) {
  const [loding , isLoding] = useState(true)
  const [loddingSession , setisLoddingSession] = useState()
  const router = useRouter()
  const {email , receverImg} = router.query
  // const [session , loging] = useSession()
  const messageRef = useRef()
  const [MSender , setMSender] = useState([])
  const [MSreceiver , setMSreceiver] = useState([])
  const [All , setAll] = useState([])

  // const [TextMessages , setTextMessages]=useState([])

  


     useEffect(
      ()=> 
        
        onSnapshot(
        // query(collection(db , 'Users', session.user.email,'messages'), where("email", "==", email)) ,         
          query(collection(db , 'Users','messges',session.user.email), where("email", "==", email)) , 
           (snapshot) =>{
            const data = snapshot.docs.map(e=>e.data())
              // const filterd = data.filter(com => com.email === email)
                setMSreceiver(data)
              }
          )
        
         ,[db])
  

         // get all messages
         useEffect(
          ()=> onSnapshot(
              query(collection(db, "Users")) , 
              (snapshot) =>{
                setAll(snapshot.docs)
                console.log(snapshot.docs);
              }) 
              ,[db])




  // useEffect(async ()=>{
  // await getSession().then(session => {
  //     setisLoddingSession(session)

  //     if(!session){
  //       router.replace('/')
  //     } else isLoding(false)

  //   })
  // },[])







  useEffect(
    ()=> {onSnapshot(
        // query(collection(db , 'Users', email,'messages'),orderBy("timeStamp")) , 
        query(collection(db , 'Users','messges',email), where("email", "==", session.user.email)) , 
         (snapshot) =>{
            const data = snapshot.docs.map(e=>e.data())
              setMSender(data)

            }
        ) 

      },[db])




  const SendMessage = async (e)=>{
    console.log(All);

    const message = messageRef.current.value;
    e.preventDefault()
    await addDoc(collection(db , 'Users','messges',email), 
    {email:session.user.email,photoUrl:session.user.image,timeStamp:serverTimestamp(),message:message}
    ); 

  }

  if(!loding){ 
    return <p className='text-5xl text-center'>make combonnent with insta logo</p>
  }


    return (
        <>
  {/* <Nav /> */}
    
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

       <AllMes MSender={MSender} MSreceiver={MSreceiver}/>
        

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
