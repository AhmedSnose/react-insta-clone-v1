import {connectToDataBase} from '../../../utils/db'
import {hashPassword} from '../../../utils/auth'


async function handler(req,res){

   if(req.method !== "POST"){
     return;
   }

   const data = req.body
   const {emailValue ,passwordValue , UserNameValue , imgUrl} = data

   // server vaildition
   if(!emailValue || !passwordValue || !UserNameValue){
    res.state(422).json({message:"Send Availd Pass and Email",suc:false})
   }

   const client = await connectToDataBase()
   const db = client.db()

   // !ASS a exisiting user
   const exisitingUser = await db.collection('USERS').findOne({email:emailValue})
   
  //  console.log(exisitingUser , "exisitingUser");
  
   if(exisitingUser){
     res.status(422).json({message:"user alrady exisit" , suc:false})
     client.close()
     return;
   }

   const hashedPassword = await hashPassword(passwordValue)

  
  const result = await db.collection('USERS').insertOne({
      name:UserNameValue,
      email:emailValue,
      password:hashedPassword,
      imgUrl:imgUrl,
      any:"any",
  })

  // if succsess
  res.status(201).json({message:'Created a New Accuont',suc:true})
  client.close()
}  

export default handler