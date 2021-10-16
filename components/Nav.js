import Image  from "next/image"
import HomeIcon from '@material-ui/icons/Home';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Avatar } from "@material-ui/core";
import NavItem from "./menuDropDown/NavItem";
import DopDown from "./menuDropDown/DopDown";
import DropdownItem from "./menuDropDown/DropDownItem";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import {CSSTransition} from 'react-transition-group'
// import {signOut} from 'next-auth/client'
import {useSession ,signOut, getSession} from 'next-auth/client'
import { useRouter } from 'next/router';
import {modolState} from '../atomos/modolAtom'
import {useRecoilState} from 'recoil';
import { useEffect , useState } from "react";
 
function Nav() {
    const router = useRouter()
    const [session , loging] = useSession()
    const [openPost , setOpenPost] = useRecoilState(modolState)
    const [loddingSession , setisLoddingSession] = useState()



    useEffect(()=>{
       getSession().then(session => {
          setisLoddingSession(session)
        })
      },[])


      const url = session.user.image
      const name = session.user.name
    // console.log(session,'s');

    // console.log(session.user , openPost, "ssssssssssss");
    const signOutHanler = (e)=>{
        e.preventDefault() 
        signOut()
        router.push('/');
    }

    const addPostHandler = (e)=>{
        e.preventDefault()
        setOpenPost(true)
        console.log("Add post");
    }

    return (
        <header className='sticky top-0 z-50 grid grid-cols-2 md:grid-cols-3 bg-white shadow-md py-5 px-5
        md:px-10'>
            {/* left */}
            <div className='relative flex items-center h-7 cursor-pointer my-auto'>
                <Image
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                objectPosition="left"
                objectFit="contain"
                layout="fill"
                onClick={()=>router.push('/Home')}
                />
            </div>

            <div className='hidden md:flex'>Serash</div>

            <ul className='dropDownContiner flex items-center justify-self-end space-x-3'>
                <HomeIcon className={`${router.pathname === "/profile" ? 'text-green-100' : ''}`}/>
                <WhatsAppIcon className='hover:cursor-pointer hover:text-blue-600' onClick={(e)=>{e.preventDefault(), router.push('/chat')}} />
                <AddCircleOutline className='hover:cursor-pointer hover:text-blue-600' onClick={addPostHandler} />
                <FavoriteBorderIcon />

                <NavItem icon={<Avatar src={url} className='hover:cursor-pointer max-h-[25px] max-w-[25px]'/>}>
                      <DopDown>
                          <DropdownItem onClick={(e)=>{e.preventDefault(),router.push('/profile')}} leftIcon={<PersonOutlineIcon />}  rightIcon={<ArrowRightIcon />}>
                              My Profile
                          </DropdownItem>
                          <DropdownItem leftIcon={<BookmarkBorderIcon />}  rightIcon={<ArrowRightIcon />}>
                              Saved
                          </DropdownItem>
                          <DropdownItem leftIcon={<SettingsIcon />}  rightIcon={<ArrowRightIcon />}>
                             Settings
                          </DropdownItem>
                          <hr className="bg-gray-300"/>
                          <DropdownItem onClick={signOutHanler} leftIcon={<ExitToAppIcon />}  rightIcon>
                             Log Out
                          </DropdownItem>
                      </DopDown>
                </NavItem>
            </ul>
        </header>
    )
}


export default Nav
