import React, { useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    background: var(--green);
    padding: 16px;
    margin: 16px;
    width: 90%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    color: var(--basewhite);
    border-radius: 10px; /* Rounded corners */
    @media screen and (max-width: 400px), (max-height: 533px) {
        width: 95%; /* Adjust width for smaller screens */
    }
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    resize: none;
    border-radius: 8px; /* Rounded corners */
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Button = styled.button`
    padding: 0.25rem 0.5rem; /* Adjust button padding */
    cursor: pointer;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 0.5rem; /* More rounded corners */
    box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1); /* 4px 6px equivalent */
    transition: background-color 0.3s, transform 0.3s;
`;

const SubmitButton = styled(Button)`
    background-color: #4CAF50; /* Example background color */
    color: white;

    &:hover {
        background-color: #45a049;
        transform: translateY(-0.125rem); /* -2px equivalent */
    }

    &:active {
        background-color: #3e8e41;
        transform: translateY(0);
    }
`;

const ReplyButton = styled(Button)`
    margin-left: 10px;
    background-color: #FFA500; /* Orange color */
    color: white;

    &:hover {
        background-color: #FF8C00; /* Darker orange on hover */
        transform: translateY(-0.125rem); /* -2px equivalent */
    }

    &:active {
        background-color: #FF4500; /* Even darker orange when active */
        transform: translateY(0);
    }
`;





export default function EditForm({ editContent, setEditContent, handleSubmit, cancelEdit }) {
    useEffect(() => {
        if (editContent === '') {
            setEditContent(editContent);
        }
    }, [editContent, setEditContent]);

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <TextArea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                />
                <ButtonContainer>
                    <SubmitButton type="submit">Submit Edit</SubmitButton>
                    <ReplyButton onClick={cancelEdit}>Cancel</ReplyButton>
                </ButtonContainer>
            </form>
        </FormContainer>
    );
}
