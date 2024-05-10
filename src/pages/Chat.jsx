import React from 'react';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
import { host } from '../utils/APIRoutes';

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);
  
  useEffect(() => {
    (async () => {
      if(!localStorage.getItem('chat-app-user')) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    })();
  }, []);

  useEffect(()=> {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    (async () =>{
      if(currentUser) {
        if(currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          {
            currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          }
        </div>
      </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 1rem;
background-color: #EFE7D3;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #F8C0C8;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;

export default Chat