import React from 'react';
import styled from 'styled-components';
import EditForm from './EditForm';
import { formatDate } from '../services/apiFacade';

const ReplyContainer = styled.div`
    background: var(--basewhite);
    min-height: 10vh;
    padding: 12px;
    margin: 8px 16px;
    width: 90%;
    box-sizing: border-box;
    position: relative;
    margin-left: 20px;
    border: 2px var(--green) solid;
`;

const TextWithColorBlack = styled.p`
    color: black;
`;

const DateContainer = styled.p`
    position: absolute;
    top: 8px;
    right: 16px;
    margin: 0;
    font-size: 0.9em;
    color: var(--green);
`;

export default function ReplyItem({
                                      reply,
                                      loggedInUserData,
                                      handleEditReplyClick,
                                      handleDeleteReplyClick,
                                      editingReplyId,
                                      setEditContent,
                                      editContent,
                                      handleEditReplySubmit
                                  }) {
    return (
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
                    <TextWithColorBlack>
                        <strong>User: {reply.userName}</strong>
                    </TextWithColorBlack>
                    <p>{reply.content}</p>
                    {(loggedInUserData && (loggedInUserData.roles.includes("ADMIN") || reply.userName === loggedInUserData.username)) && (
                        <>
                            <button onClick={() => handleEditReplyClick(reply.id, reply.content)}>Edit reply</button>
                            <button onClick={() => handleDeleteReplyClick(reply.id)}>Delete reply</button>
                        </>
                    )}
                    <DateContainer><strong>Created Date:</strong> {formatDate(reply.createdDate)}</DateContainer>
                </>
            )}
        </ReplyContainer>
    );
}
