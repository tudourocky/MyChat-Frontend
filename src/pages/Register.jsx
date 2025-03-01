import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toastOptions = {position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,};

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            console.log("in validation", registerRoute);
            const {password, confirmPassword, username, email} = values;
            const {data} = await axios.post(registerRoute, {username, email, password});
            if(data.status === false){
                toast.error(data.message, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                toast.success("User registered successfully", toastOptions);
            }
            navigate("/Chat");
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        const {password, confirmPassword, username, email} = values;
        if(password !== confirmPassword){
            toast.error("Passwords do not match", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username must be at least 4 characters long", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters long", toastOptions);
            return false;
        } else if(email===""){
            toast.error("Email cannot be empty", toastOptions);
            return false;
        }
        return true;
    };
  return (
    <>
        <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>MyChat</h1>
                </div>
                <input 
                    type="text" 
                    placeholder="Username" 
                    name="username"
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit">Register</button>
                <span>Already have an account ? <Link to="/login">Login</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #EFE7D3;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #F8C0C8;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #D3B5E5;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #D3B5E5;
    outline: none;
  }
}
button {
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
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #b463e6;
    text-decoration: none;
    font-weight: bold;
  }
}
`;

export default Register