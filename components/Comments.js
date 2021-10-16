import { useState } from "react"
import Moment from "react-moment"
function Comments(props) {
    const [focus , setFocus] = useState(false)
    return (
    
        <div className=' relative ml-5 my-[2px] flex'>
            <h4 onMouseEnter={()=>setFocus(true)} onMouseLeave={()=>setFocus(false)}  className=' cursor-pointer text-sm font-bold mx-1'>{props.name}</h4>
            <p className='text-xs mx-1'>{props.comm}</p>
            <Moment className='text-xs mx-1 ml-auto font-bold text-gray-300' fromNow>
              {props.timeStamp?.toDate()}
            </Moment>

            { focus && props.userIMG && <div className=' z-10 flex bg-gray-100 absolute top-0 left-20 p-6 drop-shadow-lg'>
             <img className='mr-3 rounded-full w-10 h-10' src={props.userIMG} alt="Pic" />
              <div className=" space-x-2 flex flex-col">
              <h5 className='font-semibold text-sm'>{props.userEmail}</h5>
              <h5 className='font-semibold text-sm'>Follow <span className='font-semibold text-sm text-yellow-400'>62M</span></h5>
              </div>
            </div> }
        </div>
    )
}

export default Comments
