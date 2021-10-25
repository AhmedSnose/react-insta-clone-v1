import SettingsIcon from '@material-ui/icons/Settings';
import Nav from './Nav';
import { useEffect , useState} from 'react'
import { getSession, session} from 'next-auth/client'
import { useRouter } from 'next/router';
import { db } from '../utils/firebase';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { async } from '@firebase/util';
import {idState , modolState} from '../atomos/modolAtom'
import {useRecoilState} from 'recoil';
import Gallery from './Gallery';
import Modol from './Modol';



function index() {

  
    const router = useRouter()
    const [loding , isLoding] = useState(true)
    const [loddingSession , setisLoddingSession] = useState()
    const [posts , setPosts]=useState([])
    const [openPost , setOpenPost] = useRecoilState(modolState)

    // const [postId , setPostID]=useRecoilState(idState)
    // const [comments , setComments]=useState()
    useEffect(async ()=>{
      getSession().then(session => {
        setisLoddingSession(session)

        if(!session){
            router.replace('/')
        } else isLoding(false)
  
      })
    },[])
  
console.log(loddingSession,"loddingSession.user.email");


    useEffect(
        ()=> onSnapshot(
            query(collection(db,'Posts') , orderBy("timeStamp","desc")) , 
            (snapshot) =>{
                const data = snapshot.docs.map((dat)=>{
                    return dat.data()
                })
                const filterd = data.filter((data)=> data.email === loddingSession.user.email)
                setPosts(filterd)   

                // console.log(filterd);
            }) 

        , [db,loddingSession])

        // useEffect(
        //     ()=> onSnapshot(
        //         query(collection(db,'Posts',postId,'comments')) , 
        //         (snapshot) =>{
        //             setComments(snapshot.docs)
        //             const data = snapshot.docs.map((dat)=>{
        //                 return dat.data()
        //             })
                    
        //             // const filterd = data.filter((data)=> data.profileIMG === loddingSession.user.image)
        //             console.log(data);
        //         }) 
    
        //     ,[db, postId])

            // console.log(postId ,"postIdpostId");

console.log(openPost);
    if(loding){ 
      return <div className="loader"></div>

    }
// console.log(posts);
    return (
        <>
{/* if you want used <Nav /> use await */}
<header>

<div className="container">

    <div className="profile">

        <div className="profile-image">

            <img className='object-contain' src={loddingSession.user.image} alt="" />

        </div>

        <div className="profile-user-settings">

            <h1 className="profile-user-name">{loddingSession.user.name}</h1>

            <button onClick={()=>router.replace('/setting/changePic')} className="btn profile-edit-btn active:opacity-5 outline-none">Edit Profile</button>

            <button className="btn profile-settings-btn" aria-label="profile settings"><SettingsIcon /></button>

        </div>

        <div className="profile-stats">

            <ul>
                <li><span className="profile-stat-count">164</span> posts</li>
                <li><span className="profile-stat-count">188</span> followers</li>
                <li><span className="profile-stat-count">206</span> following</li>
            </ul>

        </div>

        <div className="profile-bio">

            <p><span className="profile-real-name">{loddingSession.user.name}</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p>

        </div>

    </div>

</div>

</header>

<main>
{posts=='' && <p className='my-5 text-center font-bold text-gray-600'>you don't have any Post yet !! <span className='cursor-pointer text-red-600 ' onClick={()=>setOpenPost(true)}>Create One</span> </p>}     

    <div className="container"> 
    
    {posts.map(p=>(
        <Gallery key={p.likes} postUrl={p.postUrl} caption={p.caption}/>
      ))}



</div>

</main>
<Modol />

</>
    )
}

export default index
