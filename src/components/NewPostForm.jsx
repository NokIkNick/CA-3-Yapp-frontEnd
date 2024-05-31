import React from 'react';
import styled from 'styled-components';

const BottomFormContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 800px;
    background: white;
    z-index: 1000;
    margin: 0;
    border-top: 1px solid #ccc;
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    resize: none;
`;

const SubmitButton = styled.button`
    padding: 8px 16px;
    cursor: pointer;
`;

export default function NewPostForm({ newPostContent, setNewPostContent, handleNewPostSubmit }) {
    return (
        <BottomFormContainer>
            <h3>Create New Post</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleNewPostSubmit(newPostContent);
                setNewPostContent('');
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
