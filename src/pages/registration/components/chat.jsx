import React, { useState } from "react";
import '../styles/chat.css'

function ChattingInterface(){
    const[height, setHeight] = useState(0)
    const[chats, setChats] = useState([""])

    function send(text){
        let chatBox = document.getElementsByClassName("chatBox")[0];
        let value = chatBox.value
        console.log(value)
        let history = chats.concat(value)
        setChats(history)
        console.log(chats)
        chatBox.value = "";
    }

    return(
        <React.Fragment>
            <div className="mainContainer">
                <div className="leftContainer">

                </div>
                <div className="chattingContainer">
                    <div className="textContainer">
                        <input type="text" name="chatBox" className="chatBox" id="" height={height} placeholder="Enter a text"/>
                        <button type="submit" onClick={send}>Send</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChattingInterface