import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';


const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem, auto;
        background-color: var(--offwhite);
        height: calc(100vh - 0rem);
        form{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 60%;
        }
        textarea{
            box-sizing: border-box;
            resize: none;
            width: 90%;
            height: 30rem;
            margin: auto;
            padding: 1;
            margin-top: 1rem;
        }
        input[type='submit']{
            margin-top: 1rem;
            background-color: var(--green);
            color: var(--offwhite);
            border: none;
            margin-right: 60%;
            width: 30%;
            height: 10%;
            font-size: 1.5rem;
        }
        input[id='author']{
            margin-bottom: 1rem;
            width: 20%;
            height: 5%;
            margin-right: 70%;
            font-size: 1.5rem;
            pointer-events: none;
        }
        input[id='title']{
            width: 50%;
            height: 8%;
            margin-right: 40%;
            font-size: 1.5rem;
        }
        select{
            width: 20%;
            height: 5%;
            margin-right: 70%;
            margin-top: 1rem;
        }

        @media (max-width: 450px){
            form{
                width: 90%;
            }
            input[id='author']{
                width: 60%;
                margin-right: 30%;
            
            }
            input[id='title']{
                width: 80%;
                margin-right: 10%;
            }
            select{
                width: 60%;
                margin-right: 30%;
            }
            input[type='submit']{
                width: 60%;
                margin: 1rem auto;
            }
        }

    `;


export const CreateThread = ({ loggedInUser }) => {
    const [categories, setCategories] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
    <>
        <Container>
            <form onSubmit={handleSubmit}>
                <input id='author' type='text' readOnly value={loggedInUser.username}></input>
                <input id='title' type='text'></input> 
                <select id='category'>
                    {categories ? categories.map((category) => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    }) : <option value=''>Loading...</option>}
                </select>
                <textarea id='content'></textarea>
                <input type='submit' value='Publish Thread'></input>

            </form>
        </Container>
    </>
  )
}

CreateThread.propTypes = {
    loggedInUser: PropTypes.object
}