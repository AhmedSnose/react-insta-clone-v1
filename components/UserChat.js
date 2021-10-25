import React from 'react'

function UserChat(props) {
    return (
        <div>
        <span id="pic-div">
          <img id="pic" src={props.img} />
        </span>
        <div id="chat-username">
          <span id="name">{props.email}</span>
          <span id="msg">{props.message}</span>
        </div>
      </div>
    )
}

export default UserChat
