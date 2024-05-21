import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
const Logo = styled.img`
    width: 30%;
    height: auto;
    margin-bottom: 1rem;
    @media (max-width: 400px) {
     width: 70%;
    }
    `

const Input = styled.input`
    margin: 0.2rem 0;
    padding: 0.2rem;
    color: white;
    background: transparent;
    border: 0.1rem solid white;
    border-radius: 0.2rem;
    font-family: 'Roboto', 'sans-serif';
    
`
const Button = styled.button`
    width: 100%;
    padding: 0.2rem;
    margin: 0.4rem ;
    border-radius: 0.2rem;
    border-style: none;
    background: white;
    font-family: 'Roboto', 'sans-serif';
    color: var(--green);
`
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const A = styled.a`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const Register = () => {
    return (
        <>
            <Container>
                <A href='/'>
                    <Logo src = 'src/assets/fulllogo.svg' alt='logo' />
                </A>
                <FormContainer>
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Input type="Confirm password" placeholder="Confirm password" />
                    <Button type="submit" onSubmit>Register</Button>
                </FormContainer>
            </Container>
        </>
    )
  }