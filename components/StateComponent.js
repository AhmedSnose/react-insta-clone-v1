import { Avatar } from "@material-ui/core"
import Image from 'next/image'
function StateComponent({stateData}) {
    return (
        <div className='bg-white p-4 w-full h-full flex items-center justify-around overflow-scroll scrollbar-hide'>

             {stateData.map((data) => (
            <div key={data.name} className='flex flex-col'>
                <div className='relative p-4 m-2 rounded-full outline-black'>
                <Image
                 src={data.url}
                 layout='fill' objectFit='cover' className='rounded-full'/>
                </div>
              <h2 className='text-center text-sm'>{data.name}</h2>
            </div>

            ))} 

        </div>
    )
}

export default StateComponent
