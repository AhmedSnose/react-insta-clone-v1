import FacebookIcon from '@material-ui/icons/Facebook';
import useInput from '../hooks/use-input'
import { useState ,useEffect } from 'react';
// import { auth , db} from '../utils/firebase';
import { signIn} from 'next-auth/client';
import { useRouter } from 'next/router';
import {useSession} from 'next-auth/client'
import ChosePic from './ChosePic';

// https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png

const imgUrl = 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
const isEmail = (value) => value.includes('@');
const isPass =  (value) => value.length > 8
const isNotEmpty = (value) => value.trim() !== '';

 async function CreateUser(dataUser){
  const result = await fetch('/api/auth/sginUp',{
      method:"POST",
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

function Login(props) {
    const [isLogIn , setIsLogInn] = useState(false)
    const [disButton , setDisButton] = useState(false)
    const router = useRouter();


    

    const LoginHandler = ()=>{
        setIsLogInn(prev => !prev)
    }

    const {
        value: UserNameValue,
        isValid: UserNameIsValid,
        hasError: UserNameHasError,
        valueChangeHandler: UserNameChangeHandler,
        inputBlurHandler: UserNameBlurHandler,
        reset: resetUserName,
      } = useInput(isNotEmpty);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail,
      } = useInput(isEmail);

      const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPass,
      } = useInput(isPass);

    

    let formIsValid = false;
    if (emailIsValid && passwordIsValid) {
      formIsValid = true;
    }

    const submitHandler = async event => {
        event.preventDefault();
        if (!formIsValid) {
          return;
        }


        const userFormData = {emailValue ,passwordValue , UserNameValue:UserNameIsValid?UserNameValue:null , imgUrl}

        //signIN
        if(isLogIn && UserNameIsValid){
          try {
            setDisButton(true)

            const result = await CreateUser(userFormData)
            console.log(result.suc , "signIN res");
            resetUserName()
            resetEmail()
            resetPass()
            setIsLogInn(prev => !prev)
            setDisButton(false)

           } catch(error) {console.log(error)}

           //-------------------------------------
          // LogIN
        } else{
            console.log("Loging");
            setDisButton(true)
            const result = await signIn("credentials" ,
            {
              redirect: false,
              email:emailValue,
              password:passwordValue,
            })

            // Login Error / Pass Handeling
            if (!result.error) router.replace('/Home');
            else setDisButton(false) , alert(result.error);

        }
    }

    return (
    <form className='flex flex-col h-screen items-center bg-gray-300'
       onSubmit={submitHandler}>

           <div className='shadow-lg text-center p-5 bg-gray-100 overflow-hidden w-[350px] h-[450px] mt-7'>

               <div className='flex justify-around align-middle flex-col transform translate-x[-250px]'>
                   <h2 className='text-5xl py-3 m-3 font-mono '>instagram</h2>
                   <button className=' w-100 bg-blue-500 py-1 text-white text-r  font-bold text-sm m-2 active:opacity-50'><FacebookIcon className='mr-2' /> Log With Facebock</button>
                   <hr  />

                  {isLogIn && <input 

                    className={`outline-none py-1 m-3 border-solid border-2 ${UserNameHasError ? 'border-red-500' : 'border-0' }`}
                    id='name'
                    value={UserNameValue}
                    onChange={UserNameChangeHandler}
                    onBlur={UserNameBlurHandler}
                    placeholder='   User Name' /> }

                   <input
                    type='email'
                    required 
                    className={`outline-none py-1 m-3 border-solid border-2 ${emailHasError ? 'border-red-500' : 'border-0' }`}
                    id='name'
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    placeholder={`${isLogIn ? '   Email' :'   User name or Email'}`} />

                   <input
                    className={`outline-none py-1 m-3 border-solid border-2 ${passwordHasError ? 'border-red-500' : 'border-0' }`}
                    id='name'
                    value={passwordValue}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    type="password"
                    placeholder='   Password' />

                  
                   <button disabled={disButton} onClick={submitHandler} className={`w-100 bg-gray-900 py-1 m-3 text-gray-400 ${disButton ? 'opacity-[.5]' : '' }`}>{isLogIn ? 'Next' :'Log in'}</button>
                   <p className='py-1 m-3 text-opacity-10 text-xs'>By signing up, you agree to our Terms , Data Policy and Cookies Policy </p>
               </div>

            </div>

            
            <div className='shadow-lg text-center p-5 bg-gray-100 w-[350px] h-[130px] mt-3'>
                Have an account?<button onClick={LoginHandler} className='cursor-pointer w-100 py-1 m-2 text-gray-400'>{isLogIn ? 'Log in' : 'Sgin in'}</button>
                {emailHasError && <p className=" m-0 text-red-500">Please enter a valid User Name</p>}
                {passwordHasError && <p className=" m-0 text-red-500">Please enter a valid Password 8 CH</p>}
                {UserNameHasError && <p className=" m-0 text-red-500">Please enter a valid Password 8 CH</p>}


        </div>
    </form>
    )
}

export default Login
