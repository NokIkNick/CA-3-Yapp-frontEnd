import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { createThread } from '../services/apiFacade.js';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem, auto;
        background-color: var(--offwhite);
        height: calc(100vh - 0rem);

    `;

    const StyledForm = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60%;
        background-color: var(--basewhite);
        border-radius: 0.4rem;
        padding: 1rem;
        margin-top: 1rem;
        border: solid var(--green) 0.2rem;
        
        @media (max-width: 1000px){
            width: 90%;
            margin-top: 2rem;
        }
    `;

    const StyledTitleInput = styled.input`
        width: 50%;
        height: 8%;
        margin-right: 40%;
        font-size: 1.5rem;
        border-radius: 0.4rem;
        border: solid var(--green) 0.2rem;
        padding-left: 0.5rem;
        
        &:focus{
            outline: none;
            border-color: initial;
        }

        @media (max-width: 1000px){
            width: 80%;
            margin-right: 10%;
        }
    `;

    const StyledAuthorInput = styled.input`
        margin-bottom: 1rem;
        width: 20%;
        height: 5%;
        margin-right: 70%;
        font-size: 1.5rem;
        pointer-events: none;
        padding: 0.5rem;

        border-radius: 0.4rem;
        border: solid var(--green) 0.2rem;

        @media (max-width: 1000px){
            width: 60%;
            margin-right: 30%;
            
        }
    `;


    const StyledSubmitInput = styled.input`
            margin-top: 1rem;
            background-color: var(--green);
            color: var(--offwhite);
            border: solid var(--dark-green) 0.1rem;
            margin-right: 60%;
            width: 30%;
            height: 10%;
            font-size: 1.5rem;
            cursor: pointer;

        &:hover{
            background-color: var(--dark-green);
            color: var(--offwhite);
            border: solid var(--offwhite) 0.1rem;
            border-radius: 0.4rem;
            outline: none;
        }


        @media (max-width: 1000px){
            width: 60%;
            margin: 1rem auto;
        }

    `;

    const TextArea = styled.textarea`
        box-sizing: border-box;
        resize: none;
        width: 90%;
        height: 30rem;
        margin: auto;
        padding: 1;
        margin-top: 1rem;
        border-radius: 0.4rem;
        border: solid var(--green) 0.2rem;
        padding: 0.5rem;
        font-size: 1.5rem;

        &:focus{
            outline: none;
            border-color: initial;
        }

    `;

    const StyledSelect = styled.select`
        width: 20%;
        height: 5%;
        margin-right: 70%;
        margin-top: 1rem;
        font-size: 1rem;
        background-color: var(--green);
        color: var(--offwhite);
        border: none;
        padding-left: 0.5rem;
        border-radius: 5px;
        cursor: pointer;

        &:hover{
            background-color: var(--dark-green);
            color: var(--offwhite);
        }

        @media (max-width: 1000px){
            width: 60%;
            margin-right: 30%;
        }
    `;

    const StyledOption = styled.option`
        color: var(--offwhite);
        background-color: var(--green);
        font-weight: bold;
        
    `;

    const ErrorText = styled.p`
        color: red;
        font-size: 1.5rem;
        `;


export const CreateThread = ({ loggedInUser }) => {
    const [categories, setCategories] = useState(null);
    const [createdThread, setCreatedThread] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setCreatedThread({...createdThread, author: loggedInUser.id});
        attempCreatingThread(createThread, token);
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setCreatedThread({...createdThread, [e.target.id]: e.target.value});
    }

    const attempCreatingThread = (e) => {
        e.preventDefault();
        if(!loggedInUser){
            setError('You need to be logged in to create a thread');
            return;
        }
        if(createdThread.title === '' || createdThread.content === '' || createdThread.category === ''){
            setError('All fields must be filled out');
            return;
        }

        createThread(createdThread, loggedInUser.token).catch((error) => {
            setError("Error creating thread");
            console.log(error);
            return;
        });
        navigate('/home');
    }

    return (
    <>
        <Container>
            <StyledForm onSubmit={handleSubmit}>
                <StyledAuthorInput id='author' type='text' readOnly value={loggedInUser ? loggedInUser.username : "No User"}></StyledAuthorInput>
                <StyledTitleInput id='title' type='text' onChange={handleOnChange}></StyledTitleInput> 
                <StyledSelect id='category' onChange={handleOnChange}>
                    {categories ? categories.map((category) => {
                        return <StyledOption key={category.id} value={category.id}>{category.name}</StyledOption>
                    }) : <StyledOption value=''>Loading...</StyledOption>}
                </StyledSelect>
                <TextArea id='content' onChange={handleOnChange}></TextArea>
                {error && <ErrorText>{error}</ErrorText>}
                <StyledSubmitInput type='submit' value='Publish Thread'></StyledSubmitInput>
            </StyledForm>
        </Container>
    </>
    )
}


CreateThread.propTypes = {
    loggedInUser: PropTypes.object
}