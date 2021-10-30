import { getSession } from "next-auth/client"
import Chat from "../../components/Chat"


function index(props) {
  return (
    <Chat session={props.session}/>
  )
}

export default index

export async function getServerSideProps(context){

  // take session token cockie from req and see if the user is auth and cockie is exsisit
  const session = await getSession({req:context.req})
 // if the user is auth , {session} will be a vaild user obj




  if(!session){
    // if user not auth 
    return {
      redirect:{
        destination:'/',
        permanent: false
      }
    } 
  }

  return {props:{session},}

}

