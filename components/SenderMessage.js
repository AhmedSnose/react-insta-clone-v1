import React from 'react'

function SenderMessage(props) {
    return (
        <>
           <div className="sender">{props.messageSender}</div><div id="heart">❤️</div>
        </>
    )
}

export default SenderMessage
