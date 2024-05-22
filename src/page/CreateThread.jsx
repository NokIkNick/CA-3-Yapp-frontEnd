import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

export const CreateThread = ({ loggedInUser }) => {
    const [categories, setCategories] = useState(null);


    const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        background-color: var(--offwhite);
        form{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        textarea{
            resize: none;
            width: 60rem;
            height: 30rem;
        }
        input[type='submit']{
            margin-top: 1rem;
            background-color: var(--green);
            color: var(--offwhite);
            border: none;
        }
        input[id='author']{
            margin-bottom: 1rem;
            width:16rem;
            height: 2rem;
        }
    `;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
    <>
        <Container>
            <form onSubmit={handleSubmit}>
                Author:
                <input id='author' type='text' readOnly value={loggedInUser.username}></input>
                Title:
                <input id='title' type='text'></input>
                Category: 
                <select id='category'>
                    {categories ? categories.map((category) => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    }) : <option value=''>Loading...</option>}
                </select>
                <textarea id='content'></textarea>
                <input type='submit' value='Create Thread'></input>

            </form>
        </Container>
    </>
  )
}

CreateThread.propTypes = {
    loggedInUser: PropTypes.object
}