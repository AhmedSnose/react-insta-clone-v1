import {useState} from 'react'


function DopDown(props) {

    const [activeMenu , setActiveMenu] = useState('main')

    return (
        <div className='dropdown'>
            {props.children}
        </div>
    )
}

export default DopDown
