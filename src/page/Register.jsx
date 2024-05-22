import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { register } from '../services/apiFacade'

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

export const Register = () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({"email": "", "name": "", "username": "", "password": ""});


    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        setCredentials({...credentials, [e.target.name]: e.target.value});
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
           {handleRegister(e)}
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(!credentials.email || !credentials.name || !credentials.username || !credentials.password){
            setError("Fields cannot be empty!");
            return;
        }
        console.log("Attempting to register with these credentials: ", credentials.email, credentials.name, credentials.username, credentials.password);
        register(credentials.email, credentials.name, credentials.username, credentials.password).then((data) => {
            setError("Succesfull register!");
        }).catch((err) => {
            setError(err.message);
        });
    }


    return (
        <>
            <Container>
                <A onClick={() => {navigate("/login")}}>
                    <Logo src = 'src/assets/fulllogo.svg' alt='logo' />
                </A>
                <FormContainer onSubmit={handleSubmit}>
                    <Input type="text" id='email' placeholder="Email" onChange={handleOnChange} />
                    <Input type="text" id='name' placeholder="Name" onChange={handleOnChange}/>
                    <Input type="text" id='username' placeholder="Username" onChange={handleOnChange}/>
                    <Input type="password" id='password' placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <Input type="password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)}/>
                    <Button type="submit">Register</Button>
                </FormContainer>
            </Container>
        </>
    )
  }