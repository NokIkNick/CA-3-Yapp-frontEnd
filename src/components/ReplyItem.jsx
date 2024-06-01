import React from 'react';
import styled from 'styled-components';
import EditForm from './EditForm';
import { formatDate } from '../services/apiFacade';


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--green);
    border-radius: 1rem;
`;

const Text = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    overflow: hidden; /* Prevent overflow */
    word-wrap: break-word; /* Ensure long words break to fit within the container */
`;

const ReplyContainer = styled.div`
    background: var(--basewhite);
    min-height: 10vh;
    padding: 12px;
    margin: 8px 16px;
    width: 90%;
    box-sizing: border-box;
    position: relative;
    align-self: center;
    margin-left: 20px;
    margin-bottom: 1rem;
    border: 2px var(--green) solid;
    border-radius: 1rem;
`;

const TextWithColorWhite = styled.p`
    color: var(--offwhite);
    margin-top: 0.5rem;
    margin-left: 0.5rem
`;

const ButtonContainer = styled.div`
    display: flex;
    max-height: 2rem;
    max-width: 10rem;
    align-self: flex-start;
    justify-content: flex-start;
    @media screen and (max-width: 400px), (max-height: 533px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
    @media screen and (max-width: 460px), (max-height: 533px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
    @media screen and (max-width: 800px), (max-height: 533px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
    @media screen and (max-width: 900px), (max-height: 533px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
`;

const DateContainer = styled.p`
    position: absolute;
    top: 8px;
    right: 16px;
    margin: 0;
    font-size: 0.9em;
    color: var(--green);
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

const EditButton = styled(Button)`
    background-color: #4CAF50; /* Example background color */
    color: white;
    width: 5rem;
    &:hover {
        background-color: #45a049;
        transform: translateY(-0.125rem); /* -2px equivalent */
    }

    &:active {
        background-color: #3e8e41;
        transform: translateY(0);
    }
`;

const DeleteButton = styled(Button)`
    background-color: #FF0000;
    width: 5rem;
    &:hover {
        background-color: #CD5C5C;
        transform: translateY(-0.125rem);
    }
    &:active {
        background-color: #8B0000;
        transform: translateY(0);
    }
    @media screen and (max-width: 400px), (max-height: 533px) {
        padding: 0.25rem 0.4rem; /* Adjusted padding */
        //max-width: 4rem; /* Adjusted min-width */
    }
    @media screen and (max-width: 460px), (max-height: 533px) {
        padding: 0.25rem 0.4rem; /* Adjusted padding */
        //max-width: 4rem; /* Adjusted min-width */
    }
`;

export default function ReplyItem({
                                      reply,
                                      loggedInUserData,
                                      handleEditReplyClick,
                                      handleDeleteReplyClick,
                                      editingReplyId,
                                      setEditContent,
                                      editContent,
                                      handleEditReplySubmit,
                                      handleClickToUser
                                  }) {
    return (
        <MainContainer>
            <TextWithColorBlack>
                <strong onClick={()=>{handleClickToUser(reply.userName)}}>User: {reply.userName}</strong>
            </TextWithColorBlack>
            <ReplyContainer>
            {editingReplyId === reply.id ? (
                <EditForm
                    editContent={editContent}
                    setEditContent={setEditContent}
                    handleSubmit={handleEditReplySubmit}
                    cancelEdit={() => handleEditReplyClick(null, '')}
                />
            ) : (
                <>
                    <Text>{reply.content}</Text>
                    {(loggedInUserData && (loggedInUserData.roles.includes("admin") || reply.userName === loggedInUserData.username)) && (
                        <ButtonContainer>
                            <EditButton onClick={() => handleEditReplyClick(reply.id, reply.content)}>Edit</EditButton>
                            <DeleteButton onClick={() => handleDeleteReplyClick(reply.id)}>Delete</DeleteButton>
                        </ButtonContainer>
                    )}
                    <DateContainer><strong>Created Date:</strong> {formatDate(reply.createdDate)}</DateContainer>
                </>
            )}
            </ReplyContainer>
        </MainContainer>
    );
}
