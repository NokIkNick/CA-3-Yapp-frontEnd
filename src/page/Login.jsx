import React, { useState } from 'react'
import styled from 'styled-components'

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

    @media (max-width: 420px){
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
    input[type="password"]{
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

        img{
            width: 80%;
            height: auto;
        }
    }
`;


const ErrorText = styled.p`
    color: red;
`

export const Login = () => {
    const [error, setError] = useState(null);

  return (
    <>
        <Container>
        <img src="src\assets\fulllogo.svg"></img>
        {error && <ErrorText>{error}</ErrorText>}
            <form>
                <input type="text" placeholder="Username" />
                <InputWrapper>
                <input type="password" placeholder="Password"/>
                <button type="button">
                    <img src="src\assets\circle-svgrepo-com.svg"></img>
                </button>
                </InputWrapper>
                <button type="submit">Login</button>
                <button type="button">Forgot password?</button>
            </form>
        </Container>
        <Footer>
            <div>
                <p>Don't have an account?</p>
                <button type="button">Sign up here</button>
            </div>
        </Footer>
    </>
  )
}
