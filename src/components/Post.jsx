import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';
import NewPostForm from './NewPostForm';
import { formatDate, postSubmit, replySubmit, editPost, editReply, deleteReply, deletePost } from '../services/apiFacade';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 80px;
`;

export default function Post({ posts, setPosts, threadId, loggedInUser }) {
    const [currentThreadId, setCurrentThreadId] = useState(null);
    const [loggedInUserData, setLoggedInUserData] = useState(null);
    const [visibleReplies, setVisibleReplies] = useState({});
    const [newPostContent, setNewPostContent] = useState('');
    const [newReplyContent, setNewReplyContent] = useState('');
    const [replyingToPostId, setReplyingToPostId] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        setLoggedInUserData(loggedInUser);
        setCurrentThreadId(threadId);
    }, []);

    const toggleReplies = (postId) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleNewPostSubmit = async (content) => {
        if (content.trim()) {
            const data = await postSubmit(content, loggedInUserData.username, currentThreadId);
            setPosts((prev) => [...prev, data]);
        }
    };

    const handleNewReplySubmit = async (content, postId) => {
        if (content.trim() && postId !== null) {
            const data = await replySubmit(content, postId, loggedInUserData.username);
            setPosts((prev) =>
                prev.map((post) =>
                    post.id === postId
                        ? { ...post, replies: [...post.replies, data] }
                        : post
                )
            );
        }
    };

    const handleEditPostSubmit = async (content, postId) => {
        if (content.trim() && postId !== null) {
            const data = await editPost(content, postId);
            setPosts((prev) =>
                prev.map((post) =>
                    post.id === postId
                        ? { ...post, content: data.content }
                        : post
                )
            );
        }
    };

    const handleEditReplySubmit = async (content, replyId) => {
        if (content.trim() && replyId !== null) {
            const data = await editReply(content, replyId);
            setPosts((prev) => {
                return prev.map((post) => {
                    return {
                        ...post,
                        replies: post.replies.map((reply) => {
                            return reply.id === replyId ? { ...reply, content: data.content } : reply;
                        })
                    };
                });
            });
        }
    };

    const handleDeleteReply = async (id) => {
        const data = await deleteReply(id);
        if (data) {
            setPosts((prev) => {
                return prev.map((post) => {
                    return {
                        ...post,
                        replies: post.replies.filter((reply) => reply.id !== id)
                    };
                });
            });
        }
    };

    const handleDeletePost = async (id) => {
        const data = await deletePost(id);
        if (data) {
            setPosts((prev) => prev.filter((post) => post.id !== id));
        }
    };

    return (
        <MainContainer>
            {posts && posts.map((post) => (
                <PostItem
                    key={post.id}
                    post={post}
                    loggedInUserData={loggedInUserData}
                    visibleReplies={visibleReplies}
                    toggleReplies={toggleReplies}
                    handleReplyClick={setReplyingToPostId}
                    handleEditPostClick={setEditingPostId}
                    handleEditReplyClick={setEditingReplyId}
                    handleDeleteReplyClick={handleDeleteReply}
                    handleDeletePostClick={handleDeletePost}
                    editingPostId={editingPostId}
                    editingReplyId={editingReplyId}
                    setEditContent={setEditContent}
                    editContent={editContent}
                    handleEditPostSubmit={handleEditPostSubmit}
                    handleEditReplySubmit={handleEditReplySubmit}
                    replyingToPostId={replyingToPostId}
                    newReplyContent={newReplyContent}
                    setNewReplyContent={setNewReplyContent}
                    handleNewReplySubmit={handleNewReplySubmit}
                />
            ))}
            {loggedInUserData && (
                <NewPostForm
                    newPostContent={newPostContent}
                    setNewPostContent={setNewPostContent}
                    handleNewPostSubmit={handleNewPostSubmit}
                />
            )}
        </MainContainer>
    );
}
