import React from 'react';
import styled from 'styled-components';
import ReplyItem from './ReplyItem';
import EditForm from './EditForm';
import NewReplyForm from './NewReplyForm';
import { formatDate } from '../services/apiFacade';

const MainContainer = styled.div`
    display: flex;
    border: crimson;
    background-color: var(--green);
    width: 40rem; /* 640px equivalent */
    align-content: center;
    align-self: center;
    flex-direction: column;
    margin: 1rem;
    border-radius: 1rem; /* Rounded corners */
    overflow: hidden; /* Ensure child elements don't overflow */
    @media screen and (max-width: 400px), (max-height: 533px) {
        height: auto;
        width: 95%;
    }
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: var(--basewhite);
    align-self: center;
    min-height: 20vh;
    padding: 1rem; /* 16px equivalent */
    margin: 1rem; /* 16px equivalent */
    width: 95%;
    box-sizing: border-box;
    position: relative;
    border-radius: 1rem; /* Rounded corners */
    overflow: hidden; /* Ensure text doesn't overflow */
    @media screen and (max-width: 400px), (max-height: 533px) {
        height: 90%;
        width: 95%;
    }
`;

const TextWithColorWhite = styled.p`
    color: var(--offwhite);
    margin-top: 1rem;
    margin-left: 1rem;
`;

const TextWithColorBlack = styled.p`
    color: black;
`;

const Text = styled.div`
    margin-bottom: 1rem;
    padding: 0.5rem;
    overflow: hidden; /* Prevent overflow */
    word-wrap: break-word; /* Ensure long words break to fit within the container */
`;

const DateContainer = styled.p`
    position: absolute;
    top: 0.5rem; /* 8px equivalent */
    right: 1rem; /* 16px equivalent */
    margin: 0;
    font-size: 0.9rem; /* Slightly smaller text */
    color: var(--green);
`;

const ButtonContainer = styled.div`
    display: flex;
    max-height: 2rem;
    max-width: 10rem;
    align-self: flex-end;
    justify-content: flex-end;
    @media screen and (max-width: 400px), (max-height: 533px) {
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
`;
const ButtonContainerReply = styled.div`
    display: flex;
    max-height: 2rem;
    max-width: 10rem;
    justify-content: flex-start;
    align-items: flex-start;
    @media screen and (max-width: 400px), (max-height: 533px) {
        flex-direction: row;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
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


const ReplyButton = styled(Button)`
    background-color: #4CAF50;
    &:hover {
        background-color: #45a049;
        transform: translateY(-0.125rem);
    }
    &:active {
        background-color: #3e8e41;
        transform: translateY(0);
    }
    @media screen and (max-width: 400px), (max-height: 533px) {
        padding: 0.25rem 0.4rem; /* Adjusted padding */
        min-width: 5rem; /* Adjusted min-width */
    }
`;

const EditButton = styled(Button)`
    background-color: #FFA500;
    &:hover {
        background-color: #FF8C00;
        transform: translateY(-0.125rem);
    }
    &:active {
        background-color: #FF4500;
        transform: translateY(0);
    }
    @media screen and (max-width: 400px), (max-height: 533px) {
        padding: 0.25rem 0.4rem; /* Adjusted padding */
        min-width: 5rem; /* Adjusted min-width */
    }
`;

const DeleteButton = styled(Button)`
    background-color: #FF0000;
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
        min-width: 5rem; /* Adjusted min-width */
    }
`;


const ToggleRepliesLink = styled.p`
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent overflow */
    word-wrap: break-word; /* Ensure long words break to fit within the container */
`;



export default function PostItem({
                                     post,
                                     loggedInUserData,
                                     toggleReplies,
                                     handleReplyClick,
                                     handleEditPostClick,
                                     handleDeletePostClick,
                                     replyingToPostId,
                                     newReplyContent,
                                     setNewReplyContent,
                                     handleNewReplySubmit,
                                     visibleReplies,
                                     handleEditReplyClick,
                                     handleDeleteReplyClick,
                                     editingReplyId,
                                     editingPostId,
                                     setEditContent,
                                     editContent,
                                     handleEditPostSubmit,
                                     handleEditReplySubmit
                                 }) {
    return (
        <MainContainer>
            <TextWithColorWhite>
                <strong>User: {post.userName}</strong>
            </TextWithColorWhite>
            <PostContainer>
            <br/>
            {editingPostId === post.id ? (
                <EditForm
                    editContent={editContent}
                    setEditContent={setEditContent}
                    handleSubmit={handleEditPostSubmit}
                    cancelEdit={() => handleEditPostClick(null, '')}
                />
            ) : (
                <>
                    <Text>{post.content}</Text>
                    <DateContainer><strong>Created Date:</strong> {formatDate(post.createdDate)}</DateContainer>
                    {(loggedInUserData && (loggedInUserData.roles.includes("admin") || post.userName === loggedInUserData.username)) && (
                        <ButtonContainer>
                            <EditButton onClick={() => handleEditPostClick(post.id, post.content)}>Edit</EditButton>
                            <DeleteButton onClick={() => handleDeletePostClick(post.id)}>Delete</DeleteButton>
                        </ButtonContainer>
                    )}
                    <br/>
                </>
            )}
            {post.replies.length > 0 && (
                <>
                    <ToggleRepliesLink onClick={() => toggleReplies(post.id)}>
                        {visibleReplies[post.id] ? "Hide replies" : `Show replies (${post.replies.length})`}
                    </ToggleRepliesLink>
                    <br/>
                    {visibleReplies[post.id] && (
                        <div className="replies">
                            <h4>Replies:</h4>
                            {post.replies.map((reply) => (
                                <ReplyItem
                                    key={reply.id}
                                    reply={reply}
                                    loggedInUserData={loggedInUserData}
                                    handleEditReplyClick={handleEditReplyClick}
                                    handleDeleteReplyClick={handleDeleteReplyClick}
                                    editingReplyId={editingReplyId}
                                    setEditContent={setEditContent}
                                    editContent={editContent}
                                    handleEditReplySubmit={handleEditReplySubmit}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
            {loggedInUserData && (
                <ButtonContainerReply>
                <ReplyButton onClick={() => handleReplyClick(post.id)}>Reply To Post</ReplyButton>
                </ButtonContainerReply>
            )}
            {replyingToPostId === post.id && (
                <NewReplyForm
                    newReplyContent={newReplyContent}
                    setNewReplyContent={setNewReplyContent}
                    handleSubmit={(e) => {
                        e.preventDefault();
                        handleNewReplySubmit(newReplyContent, post.id);
                    }}
                    cancelReply={() => handleReplyClick(null)}
                />
            )}
            </PostContainer>
        </MainContainer>
    );
}
