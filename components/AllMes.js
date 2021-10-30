import React, { useEffect, useState } from 'react'

function AllMes({MSreceiver , MSender}) {


    const data = [...MSreceiver , ...MSender].sort((a, b) => a.timeStamp?.toDate() - b.timeStamp?.toDate())

    return (
        <div className='w-full'>

        {data.map((e,i )=> (
         <>
         <div key={i} className="p-2 m-2 bg-red-400 odd:ml-auto even:text-right even:bg-yellow-300">{e.message}</div>
        </>
        ))}
        {data.timeStamp?.toDate()}
        </div>
    )
}

export default AllMes;
