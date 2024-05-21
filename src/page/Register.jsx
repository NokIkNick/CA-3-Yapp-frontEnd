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
    &:hover {
        background: var(--dark-green);
        color: white;
    }
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

export const Register = ({registerUser}) => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            {registerUser}
        }
    }


    return (
        <>
            <Container>
                <A href='/'>
                    <Logo src = 'src/assets/fulllogo.svg' alt='logo' />
                </A>
                <FormContainer onSubmit={handleSubmit}>
                    <Input type="text" id='email' placeholder="Email" />
                    <Input type="text" id='name' placeholder="Name" />
                    <Input type="text" id='username' placeholder="Username" />
                    <Input type="password" id='password' placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <Input type="password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)}/>
                    <Button type="submit">Register</Button>
                </FormContainer>
            </Container>
        </>
    )
  }