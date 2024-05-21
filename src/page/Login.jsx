import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        input{
            padding: 0.5rem;
            border-radius: 5px;
            border: none;
        }
        button{
            padding: 0.5rem;
            border-radius: 5px;
            border: none;
            background-color: var(--dark-green);
            color: var(--offwhite);
            cursor: pointer;
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


export const Login = () => {
  return (
    <>
        <Container>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
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
