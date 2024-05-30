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
    width: 100%;
    margin-top: 1rem;
    margin: 1rem auto;
    height: 100vh;

    @media (min-width: 360px) {
        margin: 1rem auto;
    }

`;

    const StyledForm = styled.form`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 1rem auto;
        height: 100%;
    `;

    const StyledTitleInput = styled.input`
        width: 100%;
        height: 100%;
    `;

    const StyledAuthorInput = styled.input`
        width: 100%;
        height: 100%;
    `;


    const StyledSubmitInput = styled.input`
        width: 100%;
        height: 100%;
    `;

    const TextArea = styled.textarea`
        width: 100%;
        height: 100%;
    `;

    const StyledSelect = styled.select`
        width: 100%;
        height: 100%;
    `;

    const StyledOption = styled.option`
        width: 100%;
        height: 100%;
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
                <StyledAuthorInput id='author' type='text' readOnly value={loggedInUser ? loggedInUser.username : "No User"}></StyledAuthorInput>
                <StyledTitleInput id='title' type='text' onChange={handleOnChange} placeholder="Who's hype about.."></StyledTitleInput> 
                <StyledSelect id='category' onChange={handleOnChange}>
                    {categories ? categories.map((category) => {
                        return <StyledOption key={category.id} value={category.id}>{category.name}</StyledOption>
                    }) : <StyledOption value=''>Loading...</StyledOption>}
                </StyledSelect>
                <TextArea id='content' onChange={handleOnChange} placeholder="I cannot believe that.."></TextArea>
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