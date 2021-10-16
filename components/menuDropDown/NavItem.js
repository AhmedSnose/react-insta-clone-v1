import {useState} from 'react'


function NavItem(props) {
    const [open , setOpen] = useState(false)

    return (
        <li className='nav-item'>
           <a onClick={
               e=>{e.preventDefault() 
                setOpen(!open)
            }} href='#' className="icon-button">
               {props.icon} 
               {/* Put icon here */}
           </a>


           {open && props.children}

        </li>
    )
    
}

export default NavItem
