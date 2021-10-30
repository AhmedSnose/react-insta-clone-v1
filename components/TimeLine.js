import Post from "./Post"
import {db} from '../utils/firebase'
import {useSession} from 'next-auth/client'
import { onSnapshot,collection, orderBy, query, doc, getDoc, getDocs } from "@firebase/firestore";



import { useState , useEffect } from "react"
function TimeLine(props) {
    const [Posts, setPosts] = useState([])
    const [session , loging] = useSession()

    useEffect(
        ()=> onSnapshot(
            query(collection(db,'Posts') , orderBy("timeStamp","desc")) , 
            (snapshot) =>{
              setPosts(snapshot.docs)
            // console.log(snapshot.docs);
            }) 
            ,[db])

    return (
    <div>
        
      {Posts.map((post)=>
       <Post key={post.id}
        id={post.id}
        avaUrl={post.data().profileIMG}
        postUrl={post.data().postUrl} 
        userName={post.data().username}
        caption={post.data().caption}
        place={post.data().place ? post.data().place :'Egypt'}
        timeStamp={'7:46:45 AM'}
        likes={post.data().likes}
        />

      )}
     </div>
    )
}

export default TimeLine

