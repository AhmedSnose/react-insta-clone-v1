import Home from '../../components/Home'
import {getSession} from 'next-auth/client'

function index(props) {
  return (
    <Home props={props}/>
  )
}

export default index


export async function getServerSideProps(context){

  // take session token cockie from req and see if the user is auth and cockie is exsisit
  const session = await getSession({req:context.req})
 // if the user is auth , {session} will be a vaild user obj

  // -----------------------
  const res = await fetch('https://post-api-25a47-default-rtdb.firebaseio.com/0.json')
  const data = await res.json()
  // --------------------------


  if(!session){
    // if user not auth 
    return {
      redirect:{
        destination:'/',
        permanent: false
      }
    } 
  }

  return {props:{session
    ,stateData:data
  },}

}




