import React, { useCallback, useState, useEffect } from "react";
import "../styles/chattingInterface.css";
import emptyPic from '../../../assets/emptyPic.jpeg';
import { json } from "react-router-dom";

function ChattingInterface() {
  const [height, setHeight] = useState(0);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [chatBox, setChatBox] = useState(new Array(friends.length).fill([]));
  const [currentFriendIndex, setCurrentFriendIndex] = useState(0);
  const username = localStorage.getItem("username");

  useEffect(() => {
    setChatBox(new Array(friends.length).fill([]));
  }, [friends]);

  const fetchFriends = useCallback(async () => {
    const url = "http://127.0.0.1:8000/register/";
        try {
            const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
            if (resp.ok) {
                const data = await resp.json();
                setFriends(data);
            } else {
                console.log(resp);
            }
        } catch (error) {
            console.log(error.message);
        }
        }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const sendMessage = useCallback(async()=> {
    if (message.trim() === "") {
      return;
    }
    
    const url = "http://127.0.0.1:8000/chatBox/";

    const chatRequest = {
        'sender_username': username,
        'recipient_username': friends[currentFriendIndex].username,
        'message': message.trim()
    }
    const updatedChatBox = [...chatBox];
    updatedChatBox[currentFriendIndex] = [...updatedChatBox[currentFriendIndex], chatRequest];
    setChatBox(updatedChatBox);
    
    setMessage("");
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatRequest)
        })
        if (response.ok) {
            const data = await response.json();
        }
        else{
            console.log(response);
        }
    } catch (error) {
        console.log(error.message);
    }
  })

  function handleHover(button){

    button.target.style.backgroundColor = "#c2cfec";
    }

    function handleUnHover(button){
        button.target.style.backgroundColor = "#d5dceb";
    }

    function getUsername(username){
        
        let length = username.length;
        let firstLetter = username.charAt(0).toUpperCase();
        username = firstLetter.concat(username.slice(1, length));
        return username;
    }

    const openChatBox = useCallback( async (index)=> {
        console.log(index)
        console.log(friends[index])
        let friend = friends[index];
        let friendChatBox = chatBox[index];
        console.log(friendChatBox.length)
        if (friendChatBox.length == 0) {
            console.log("Yes")
            const request = {
                'friendUsername': friend.username,
                'username': username
            };
            try {
                const url = "http://127.0.0.1:8000/chatBox/";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(request)
                    
                })
                if (response.ok) {
                    const data = await response.json();
                    chatBox[index]= data;
                }
                else{
                    console.log(response);
                }
                
            } catch (error) {
                console.log(error.message);
            }
        }
        console.log(friendChatBox)
        setCurrentFriendIndex(index);
    })

  return (
    <div className="chatMainContainer">
      <div className="chatLeftContainer">
        <h2>Friends List</h2>
        <div className="friendsList">
            {friends.map((friend, index) => {
                if (String(friend.username).toLocaleLowerCase() != String(username).toLowerCase()) {
                    return(
                        <button key={index} className="friendItem" onMouseEnter={handleHover} onMouseLeave={handleUnHover} onClick={()=>openChatBox(index)}>
                            <img className="profilePic" src={emptyPic} alt="" />
                            {getUsername(friend.username)}
                        </button>
                    )
                }
            }
            )}
    </div>
      </div>
      <div className="chatRightContainer">
        <div className="chatContainer">
          {chatBox[currentFriendIndex]?.map((chat, index) => {
            if (chat.sender_username == username) {
                return(
                    <div className="senderMessage">
                        {chat.message}
                    </div>
                    )
            }
            else {
                return(
                    <div key={index} className="recipientMessage">
                      {chat.message}
                    </div>
                )
            }
          })}
        </div>
        <div className="inputContainer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chatBox"
            placeholder="Enter a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChattingInterface;
