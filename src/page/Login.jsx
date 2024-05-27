import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../services/apiFacade.js';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    `;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const StyledInput = styled.input`
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: transparent;
    color: var(--offwhite);
    font-size: 1.1rem;
    border: 0.1rem solid var(--offwhite);

    &:focus{
        outline: none;
        border-color: initial;
    }
`;

const StyledButton = styled.button`
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    background-color: var(--offwhite);
    color: var(--green);
    font-size: 1.1rem;
    cursor: pointer;

    &:hover{
        background-color: var(--dark-green);
        color: var(--offwhite);
    }
`;

const StyledTypeButton = styled.button`
    background-color: transparent;
    color: var(--offwhite);
`;

const StyledLogo = styled.img`
    width: 30%;
    height: auto;
    margin-bottom: 4rem;

    @media (max-width: 450px){
        width: 70%;
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
        width: 3rem;
        height: 2.7rem;
        border: none;
        background: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        img{
            width: 60%;
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
            setError(err.message);
            return;
        });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

  return (
    <>
        <Container>
        <StyledLogo src="src\assets\fulllogo.svg"></StyledLogo>
        {error && <ErrorText>{error}</ErrorText>}
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput name="username" type="text" placeholder="Username" onChange={handleOnChange}/>
                <InputWrapper>
                <StyledInput name="password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={handleOnChange}/>
                <button onClick={togglePasswordVisibility} type="button">
                    <img src={showPassword ? "src/assets/eye-svgrepo-com.svg" : "src/assets/circle-svgrepo-com.svg"}></img>
                </button>
                </InputWrapper>
                <StyledButton type="submit">Login</StyledButton>
                <StyledButton type="button">Forgot password?</StyledButton>
            </StyledForm>
        </Container>
        <Footer>
            <div>
                <p>Don't have an account?</p>
                <StyledTypeButton type="button" onClick={() => {navigate("/register")}}>Sign up here</StyledTypeButton>
            </div>
        </Footer>
    </>
  )
}
