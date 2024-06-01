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

    
`
const Logo = styled.img`
    width: 30%;
    height: auto;
    margin-bottom: 4rem;
    @media (max-width: 700px) {
        width: 50%;
        height: auto;
        margin-bottom: 2rem;   

}
`

const ErrorText = styled.p`
    color: red;
    margin-bottom: 1rem;
`

const Input = styled.input`
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: transparent;
    color: var(--offwhite);
    font-size: 1.1rem;
    border: 0.1rem solid var(--offwhite);
    
`
const Button = styled.button`
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    background: var(--offwhite);
    font-family: 'Roboto', 'sans-serif';
    color: var(--green);
    font-size: 1.1rem;
    &:hover {
        background: var(--dark-green);
        color: white;
    }
`
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`
    
export const Register = ({setLoggedInUser, setTokenIsValid}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState({"email": "","username": "","password": ""});
    const navigate = useNavigate();
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
        if(!credentials.email || !credentials.username || !credentials.password){
            setError("Fields cannot be empty!");
            return;
        }
        console.log("Attempting to register with these credentials: ", credentials.email, credentials.username, credentials.password);
        register(credentials.email, credentials.username, credentials.password).then((dataOne) => {
            setError("Succesfully registered!");
            login(credentials.username, credentials.password).then((dataTwo) => {
                setLoggedInUser({"username": dataTwo.username, "roles": dataTwo.roles, "email": dataTwo.email});
                localStorage.setItem("token", dataTwo.token);
                setTokenIsValid(true);
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
                <Logo src = '/fulllogo.svg' alt='logo' onClick={() => {navigate("/login")}}/>
                <FormContainer onSubmit={handleSubmit}>
                {error && <ErrorText>{error}</ErrorText>}
                    <Input type="email" id='email' placeholder="Email" onChange={handleOnChange} />
                    <Input type="text" id='username' placeholder="Username" onChange={handleOnChange} />
                    <Input type="password" id='password' placeholder="Password" onChange={handleOnChange}/>
                    <Input type="password" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)}/>
                    <Button type="submit">Register</Button>
                </FormContainer>
            </Container>
        </>
    )
  }