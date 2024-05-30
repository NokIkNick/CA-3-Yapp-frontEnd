import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { createThread, fetchCategories } from '../services/apiFacade.js';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.1rem solid red;
    width: calc(100% - 1rem - 2 * 0.6rem);
    margin: 1rem;
    height: calc(100vh - 4rem);
    box-sizing: border-box;
    margin-top: 2rem;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
        /* Styles for desktop */
        width: calc(100% - 1rem - 2 * 0.6rem);
        height: calc(100vh - 4rem);
        margin: 1rem;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        /* Styles for tablet */
        width: 90%;
        margin: 2rem auto;
        flex-direction: row;
    }

`;

    const StyledForm = styled.form`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 1rem auto;
        height: calc(100% - 4rem);
        background-color: var(--basewhite);
        padding: 1rem;
        border: 1rem solid var(--green);
        border-radius: 3rem;
        box-sizing: border-box;
        @media (min-width: 768px) {
        /* Styles for desktop */
        width: 70%;
        margin: 1rem auto;
    }
        @media (min-width: 768px) and (max-width: 1023px) {
        /* Styles for tablet */
        width: 90%;
        margin: 2rem auto;
        flex-direction: row;
    }
    `;

    const StyledTitleInput = styled.input`
        width: 85%;
        height: 15%;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        padding-left: 0.2rem;
        border: 0.1rem solid var(--green);
        border-radius: 0.5rem;
        &:focus {
            outline: 0.1rem inset var(--green);
        }

        @media (min-width: 768px) {
        /* Styles for desktop */
        margin-right: 40rem;
        width: 40%;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        /* Styles for tablet */
        width: 90%;
        height: 20%;
        margin: 2rem auto;
        padding: 1rem;

    }
    `;

    const StyledAuthorInput = styled.input`
        width: 65%;
        height: 15%;
        margin-bottom: 1rem;
        margin-top: 2rem;
        font-size: 1.1rem;
        text-align: center;
        color: var(--green);
        font-weight: bold;
        &:focus {
            outline: none;
        }
        &:hover {
            cursor: not-allowed;
        }

        @media (min-width: 768px) {
        /* Styles for desktop */
        width: 20%;
        margin-right: 55.5rem;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        /* Styles for tablet */
        width: 90%;
        margin: 2rem auto;
        display: none;
    }

    `;


    const StyledSubmitInput = styled.input`
        width: 100%;
        height: 20%;
        margin: 1rem auto;
        font-size: 1.5rem;
        background-color: var(--green);
        color: var(--offwhite);
        border: none;
        border-radius: 0.5rem;
        &:hover {
            background-color: var(--dark-green);
            cursor: pointer;
        }
        @media (min-width: 768px) {
        /* Styles for desktop */
        width: 20%;
        
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        /* Styles for tablet */
        width: 10%;
        margin: 2rem auto;
        height: 30%;
        font-size: 1rem;
        white-space: normal;
        padding: 0.5rem;
        border-radius: 2rem;
        margin-left: 1rem;
    }
    `;

    const TextArea = styled.textarea`
        width: 100%;
        height: 100%;
        resize: none;
        border: 0.1rem solid var(--green);
        border-radius: 0.5rem;
        font-size: 1rem;
        padding: 0.5rem;
        &:focus {
            outline: 0.1rem inset var(--green);
        }
        @media (min-width: 768px) {
        /* Styles for desktop */
        width: 91%;
        height: 100%;
        
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        /* Styles for tablet */
        width: 90%;
        margin: 2rem auto;
    }
    `;

    const StyledSelect = styled.select`
        width: 40%;
        height: 10%;
        margin-bottom: 1rem;
        font-size: 1rem;
        @media (min-width: 768px) {
        /* Styles for desktop */
        width: 20%;
        margin-right: 55.5rem;
        
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        /* Styles for tablet */
        width: 90%;
        margin: 2rem auto;
    }
    `;

    const StyledOption = styled.option`
        width: 80%;
        height: 80%;
        
    `;

    const ErrorText = styled.p`
        color: red;
        font-size: 1.5rem;
        `;


export const CreateThread = ({ loggedInUser }) => {
    const [categories, setCategories] = useState(null);
    const [createdThread, setCreatedThread] = useState({title: '', content: '', category: 1});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        handleCategories();
    }, []);

    const handleCategories = () => {
        fetchCategories().then((data) => {
            setCategories(data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loggedInUser.username);
        const thread = {...createdThread, author: loggedInUser.username};
        console.log(thread);
        attempCreatingThread(thread);
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setCreatedThread({...createdThread, [e.target.id]: e.target.value});
        console.log([e.target.id], e.target.value);
    }

    const attempCreatingThread = (thread) => {
        if(!loggedInUser){
            setError('You need to be logged in to create a thread');
            return;
        }
        if(thread.title === '' || thread.content === '' || thread.category === ''){
            setError('All fields must be filled out');
            return;
        }
        console.log(localStorage.getItem('token'));
        createThread(thread, localStorage.getItem('token')).catch((error) => {
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
                <StyledAuthorInput name='author' id='author' type='text' readOnly value={loggedInUser ? loggedInUser.username : "No User"}></StyledAuthorInput>
                <StyledTitleInput required name='title' id='title' type='text' onChange={handleOnChange} placeholder="Who's hype about.."></StyledTitleInput> 
                <StyledSelect name='category' id='category' onChange={handleOnChange}>
                    {categories ? categories.map((category) => {
                        return <StyledOption key={category.id} value={category.id}>{category.name}</StyledOption>
                    }) : <StyledOption value=''>Loading...</StyledOption>}
                </StyledSelect>
                <TextArea required id='content' onChange={handleOnChange} placeholder="I cannot believe that.."></TextArea>
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