import React from 'react';
import styled from 'styled-components';

const BottomFormContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 50rem; /* 800px equivalent */
    background: white;
    z-index: 1000;
    margin: 0;
    border-top: 0.0625rem solid #ccc; /* 1px equivalent */
    padding: 1rem; /* Add padding to keep textarea away from edges */
    border-radius: 1rem; /* Make corners more round */

    @media (max-width: 800px) {
        max-width: 37.5rem; /* 600px equivalent */
    }

    @media (max-width: 600px) {
        max-width: 25rem; /* 400px equivalent */
    }

    @media (max-width: 400px) {
        max-width: 100%;
    }

    @media (max-width: 400px) and (max-height: 544px) {
        bottom: 10px;
        left: 10px;
        transform: none;
        width: calc(100% - 20px);
        font-size: 0.8rem;
    }
`;

const TextArea = styled.textarea`
    margin-bottom: 0.625rem; /* 10px equivalent */
    padding: 0.5rem; /* 8px equivalent */
    width: calc(100% - 2rem); /* Reduce width to respect container padding */
    height: 3.125rem; /* 50px equivalent */
    box-sizing: border-box;
    resize: none;
    border-radius: 0.5rem; /* Add border radius to textarea */

    @media (max-width: 600px) {
        height: 2.5rem; /* 40px equivalent */
    }

    @media (max-width: 400px) {
        height: 1.875rem;
        font-size: 0.8rem;
    }
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem; /* 8px 16px equivalent */
    cursor: pointer;
    background-color: #4CAF50;
    border: none;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 1rem; /* Increase border radius for rounder corners */
    box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1); /* 4px 6px equivalent */
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #45a049;
        transform: translateY(-0.125rem); /* -2px equivalent */
    }

    &:active {
        background-color: #3e8e41;
        transform: translateY(0);
    }

    @media (max-width: 600px) {
        padding: 0.375rem 0.75rem; /* 6px 12px equivalent */
    }

    @media (max-width: 400px) {
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
    }
`;


export default function NewPostForm({ newPostContent, setNewPostContent, handleNewPostSubmit }) {
    return (
        <BottomFormContainer>
            <h3>Create New Post</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleNewPostSubmit(e);
            }}>
                <TextArea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Post content"
                />
                <SubmitButton type="submit">Submit Post</SubmitButton>
            </form>
        </BottomFormContainer>
    );
}
