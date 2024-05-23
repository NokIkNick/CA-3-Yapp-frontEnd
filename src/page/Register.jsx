import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { login, register } from '../services/apiFacade.js'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    img{
        width: 50%;
        height: auto;
        margin-bottom: 4rem;   
    }
`

const ErrorText = styled.p`
    color: red;
    margin-bottom: 1rem;
`

const Input = styled.input`

    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: transparent;
    color: var(--offwhite);
    font-size: 1.1rem;
    border: 0.1rem solid var(--offwhite);
    
`
const Button = styled.button`
    padding: 0.5rem;
    margin: 0.4rem ;
    border-radius: 0.5rem;
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
    width: 40%;
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
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState({"email": "", "name": "","username": "","password": ""});
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({"email": "", "name": "", "username": "", "password": ""});


    const handleOnChange = (e) => {
        console.log(e.target.id, e.target.value);
        if (e.target.id === "password") {
            setPassword(e.target.value);
        }
        setCredentials({...credentials, [e.target.id]: e.target.value});
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            handleRegister(e);      
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
            setError("Succesfully registered!");
            login(credentials.username, credentials.password).then((data) => {
                localStorage.setItem("token", data.token);
                navigate("/home");
            }).catch((err) => {
                setError(err.message);
            });
        }).catch((err) => {
            setError(err.message);
        });
    }


    return (
        <>
            <Container>
                <img src = 'src/assets/fulllogo.svg' alt='logo' onClick={() => {navigate("/login")}}/>
                <FormContainer onSubmit={handleSubmit}>
                {error && <ErrorText>{error}</ErrorText>}
                    <Input type="text" id='email' placeholder="Email" onChange={handleOnChange} />
                    <Input type="text" id='name' placeholder="Name" onChange={handleOnChange} />
                    <Input type="text" id='username' placeholder="Username" onChange={handleOnChange} />
                    <Input type="password" id='password' placeholder="Password" onChange={handleOnChange}/>
                    <Input type="password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)}/>
                    <Button type="submit">Register</Button>
                </FormContainer>
            </Container>
        </>
    )
  }