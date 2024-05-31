import React from 'react';
import styled from 'styled-components';
import ReplyItem from './ReplyItem';
import EditForm from './EditForm';
import NewReplyForm from './NewReplyForm';
import { formatDate } from '../services/apiFacade';

const PostContainer = styled.div`
    background: var(--basewhite);
    min-height: 20vh;
    padding: 16px;
    margin: 16px;
    width: 33%;
    box-sizing: border-box;
    position: relative;
    border-left: 1rem solid var(--green);
    border-right: 1rem solid var(--green);
    border-bottom: 1rem solid var(--green);
    border-top: 2.5rem solid var(--green);
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

const ReplyButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
`;

const ToggleRepliesLink = styled.p`
    cursor: pointer;
    color: blue;
    text-decoration: underline;
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
        <PostContainer>
            <TextWithColorBlack>
                <strong>By: {post.userName}:</strong>
            </TextWithColorBlack>
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
                    <p>{post.content}</p>
                    <DateContainer><strong>Created Date:</strong> {formatDate(post.createdDate)}</DateContainer>
                    {(loggedInUserData && (loggedInUserData.roles.includes("ADMIN") || post.userName === loggedInUserData.username)) && (
                        <>
                            <button onClick={() => handleEditPostClick(post.id, post.content)}>Edit post</button>
                            <button onClick={() => handleDeletePostClick(post.id)}>Delete post</button>
                        </>
                    )}
                    <br/>
                </>
            )}
            {post.replies.length > 0 && (
                <>
                    <ToggleRepliesLink onClick={() => toggleReplies(post.id)}>
                        {visibleReplies[post.id] ? "Hide replies" : `Show replies (${post.replies.length})`}
                    </ToggleRepliesLink>
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
                <ReplyButton onClick={() => handleReplyClick(post.id)}>Reply To Post</ReplyButton>
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
    );
}
