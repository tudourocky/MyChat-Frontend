import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    
    const handleEmojiClick = (emoji, event) => {
        console.log(emoji);
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }

    return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                {
                    showEmojiPicker && <Picker className="emoji-picker-react" onEmojiClick={handleEmojiClick} height={350} width={300}/>
                }
            </div>
        </div>
        <form className="input-container" onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder="type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)} />
            <button className="submit">
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
display:grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: #F8C0C8;
padding: 0 2rem;
padding-bottom: 0.3rem;
@media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
}
.button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
        position: relative;
        svg {
            font-size: 1.5rem;
            color: #F7E951;
            cursor: pointer;
        }
        .emoji-picker-react {
            position: absolute;
            top: -370px;
        }
    }
}
.input-container {
    display: flex;
    width: 100%;
    border-radius: 2rem;
    align-items: center;
    gap: 2rem;
    background-color: #ECE3F0;
    input {
        width: 90%;
        background-color: transparent;
        color: black;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection {
            background-color: #F7E951;
        }
        &:focus {
            outline: none;
        }
    }
    button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #D3BBDD;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 0.3rem 1rem;
            svg {
                font-size: 1rem;
            }
        }
        svg {
            font-size: 2rem;
            color: white;
        }
    }
}
`;