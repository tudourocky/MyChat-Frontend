import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';
import loader from "../assets/loader.gif";
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

export default function SetAvatar() {
    // opensource api that generates avatars
    const api = "https://api.multiavatar.com";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };

    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login");
    }});

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar", toastOptions);
            return;
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            });

            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate("/chat");
            } else {
                toast.error("Error setting profile picture. Please try again", toastOptions);
            }
        }
    };

    useEffect(() => {
        getImages();
      }, []);

      const getImages = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}?apikey=sctaAw1uUn6hqp`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      };

  return (
    <> 
    {isLoading ? <Container><img src={loader} alt="loader" className="loader" /></Container> : <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index)=>{
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? "selected":""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                                onClick={() => {setSelectedAvatar(index)}}
                                />
                            </div>
                        )
                    })}
                </div>
                <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>}
        <ToastContainer />
    </>
  )
}

const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #EFE7D3;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #D3BBDD;
    }
  }
  .submit-btn {
    background-color: #D3B5E5;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
        background-color: #b463e6;
    }
  }
`;