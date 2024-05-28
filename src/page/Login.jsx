import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../services/apiFacade.js';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        input{
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: transparent;
            color: var(--offwhite);
            font-size: 1.1rem;
            border: 0.1rem solid var(--offwhite);
        }
        input:focus{
            outline: none;
            border-color: initial;
        }
        button{
            padding: 0.5rem;
            border-radius: 5px;
            border: none;
            background-color: var(--offwhite);
            color: var(--green);
            font-size: 1.1rem;
            cursor: pointer;
        }
        button:hover{
            background-color: var(--dark-green);
            color: var(--offwhite);
        }
        button[type="button"]{
            background-color: transparent;
            color: var(--offwhite);
        }
    }
    img{
        width: 30%;
        height: auto;
        margin-bottom: 4rem;   
    }

    @media (max-width: 450px){
        img{
            width: 70%;
        }
    }
`

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 1rem;  
    button{
        background-color: transparent;
        border: none;
        color: var(--offwhite);
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
    }
    background-color: var(--dark-green);
    div{
        display: flex;
        gap: 1rem;
        margin-top: 1rem; 
        margin-bottom: 1rem;
    }
    p{
        color: var(--offwhite);
    }
`;

const InputWrapper = styled.div`
    position: relative;
    input[name="password"]{
        padding-right: 2rem;
    }
    button{
        position: absolute;
        left: 12.8rem;
        top: 0.01rem;
        width: 3rem;
        height: 3rem;
        border: none;
        background: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        img{
            width: 80%;
            height: auto;
        }
    }
`;


const ErrorText = styled.p`
    color: red;
    margin-bottom: 1rem;
`

export const Login = ({ loggedInUser, setLoggedInUser }) => {
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState({"username": "", "password": ""});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            navigate("/home");
        }
    },[navigate]);


    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        setCredentials({...credentials, [e.target.name]: e.target.value});
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(e);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(!credentials.username || !credentials.password){
            setError("Fields cannot be empty!");
            return;
        }
        console.log("Attempting to log in with these credentials: ", credentials.username, credentials.password);
        login(credentials.username, credentials.password).then((data) => {
            setError("Succesfully logged in!");
            setLoggedInUser({"username": data.username, "roles": data.roles, "email": ""});
            localStorage.setItem("token", data.token);
            navigate("/home");
        }).catch((err) => {
            setError(err.message, err.cause);
            return;
        });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

  return (
    <>
        <Container>
        <img src="\fulllogo.svg"></img>
        {error && <ErrorText>{error}</ErrorText>}
            <form onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder="Username" onChange={handleOnChange}/>
                <InputWrapper>
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={handleOnChange}/>
                <button onClick={togglePasswordVisibility} type="button">
                    <img src={showPassword ? "/eye-svgrepo-com.svg" : "/circle-svgrepo-com.svg"}></img>
                </button>
                </InputWrapper>
                <button type="submit">Login</button>
                <button type="button">Forgot password?</button>
            </form>
        </Container>
        <Footer>
            <div>
                <p>Don't have an account?</p>
                <button type="button" onClick={() => {navigate("/register")}}>Sign up here</button>
            </div>
        </Footer>
    </>
  )
}
