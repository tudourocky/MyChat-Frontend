import React from 'react'
import styled from 'styled-components';
import Deer from "../assets/welcome.gif";

export default function Welcome({currentUser}) {
  return (
  <Container>
    <div className="welcome">
      <img src={Deer} alt="deer" /><h1>Welcome, <span>{currentUser.username}!</span></h1>
      <h3>Please select a chat to start messaging.</h3>
    </div>
  </Container>
  )
}


const Container = styled.div`
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #BBE7FE;
  }
}
`;