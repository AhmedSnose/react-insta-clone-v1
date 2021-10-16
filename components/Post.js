import MenuOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import Favorite from '@material-ui/icons/Favorite';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import Comments from './Comments';
import { useEffect, useState } from 'react';
import { addDoc, collection , deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from '../utils/firebase';
import {useSession} from 'next-auth/client'

import {idState} from '../atomos/modolAtom'
import {useRecoilState} from 'recoil';


function Post({id, postUrl ,caption , avaUrl , userName , place , timeStamp}) {

    const [comments , setComments ] = useState([])
    const [comment , setComment ] = useState("")
    const [session , loging] = useSession()
    const [likes , setLikes] = useState([])
    const [hasLiked , setHasLiked] = useState(false)
    const [openPost , setOpenPost] = useRecoilState(idState)


    useEffect(_=>setOpenPost(id),[])


    useEffect(
        ()=> onSnapshot(
            query(collection(db,'Posts',id,'comments') , orderBy("timeStamp")) , 
            (snapshot) =>{
                setComments(snapshot.docs)
            }) 

        ,[db, id])


        useEffect(
            ()=> onSnapshot(
                query(collection(db,'Posts',id,'likes')) , 
                (snapshot) =>{
                    const dataLikes = snapshot.docs.map(e=>e.data())
                    setLikes(snapshot.docs)
                }) 
    
            ,[db, id])


        useEffect(()=> setHasLiked(
                likes.findIndex(
                    (like)=> like.id === session?.user?.email) !== -1
                
            ),[likes])


    const addComment = async (e) =>{
        e.preventDefault()
        const commentToSend = comment
        setComment('')
        // Notes about development stage here you cant for example able to user 
        // to change his email cuz you counting on email in eaxample underbeneath here as a id for FireBase
        await addDoc(collection(db , 'Posts', id, 'comments') , {
            comment:commentToSend,
            username:session.user.name,
            userIMG:session.user.image,
            userEmail:session.user.email,
            timeStamp:serverTimestamp(),
        })

    }

        const addlike = async ()=>{
            console.log(hasLiked, "hasLiked");

        if(hasLiked){

            await deleteDoc(doc(db , 'Posts', id , 'likes' ,session.user.email))

        } else {
        await setDoc(doc(db , 'Posts', id , 'likes' ,session.user.email) , {
            username:session.user.name,
            userIMG:session.user.image,
            userEmail:session.user.email,

        })
     }
    }
    return (

        <div className='POST_CONT flex flex-col m-2 shadow-lg bg-white '>
            {/* header */}

        <div className='flex justify-items-center  w-full'>

          <div className='justify-self-star  m-3 rounded-full'>
           <img src={avaUrl}  className='w-[40px] h-[40px] rounded-full'/>
            </div>

            <div className='flex flex-col'>
                <h3 className='mt-2 mx-3'>{userName}</h3>
                <h5 className='text-[10px] font-bold mx-3'>{place}</h5>
            </div>

            <div className='flex justify-items-center items-center mr-2 ml-auto hover:cursor-pointer'>
             <MenuOutlinedIcon />
            </div>

        </div>


            {/* Photo */}
            <div onDoubleClick={addlike} className='flex items-center justify-center w-full mt-3 rounded-full'>
             <img src={postUrl} className='cursor-pointer object-center'/>
            </div>


            {/* comments */}
            <div className='flex flex-col w-full'>
                {/* icons */}
                <ul className='flex'>

                    {hasLiked ? (
                    <Favorite onClick={addlike} className=' cursor-pointer text-red-700 mx-3 mt-3' />
                    ):(
                        <FavoriteBorderOutlinedIcon onClick={addlike} className='cursor-pointer mx-3 mt-3' />
                    )}

                    <ChatBubbleOutlineOutlinedIcon className=' mx-3 mt-3'/>
                    <SendOutlinedIcon className=' mx-3 mt-3'/>
                    <TurnedInNotOutlinedIcon className='mx-3 mt-3 ml-auto' />
                </ul>
               {likes.length > 0 && <h3 className='font-bold text-[13px] mx-3 my-3'>{likes.length} Likes</h3> }
                {/* Caption */}
                <div className='mx-3 flex'>
                    <h4 className=' text-sm font-bold mx-1'>{userName}</h4>
                    <p className='text-xs mx-1'>{caption}</p>
                </div>

                {/* comments */}
                <hr className='m-3'/>
                {/* <Comments name='ahmed' comm='Coment : What a creative work😍😍😍 '/>
                <Comments name='samy' comm='😎😎😋' />
                <Comments name='Mostaf' comm='🤩🤩'/>
                <h3 className='font-bold text-[10px] mx-3 my-3 text-gray-400'>{timeStamp}</h3>
                 */}
                {comments.map((post)=>(
                  <Comments key={post.id} name={post.data().username} userEmail={post.data().userEmail} comm={post.data().comment} userIMG={post.data().userIMG} timeStamp={post.data().timeStamp}/>
                ))}
                {/* {comments.map(post => console.log(post.data() ,"sss"))} */}


                {/* add comment */}
                <form className='flex items-center w-full border-t-[1px] border-opacity-5 border-black'>
                   <SentimentSatisfiedOutlinedIcon className='m-3' />
                   <input 
                   value={comment} 
                   onChange={e=>setComment(e.target.value)}
                   className='w-full outline-none' type="text" placeholder='Add a comment' />
                   <button 
                   type='submit'
                   disabled={!comment.trim()}
                   onClick={addComment}
                   className='text-blue-600 disabled:opacity-[.5] mr-3'>Post</button>
                   {/* type='submit' */}
                </form>
            </div>


        </div>
    )
}

export default Post
