import styled from "styled-components";
import { useEffect, useState } from "react";
import {
    formatDate,
    postSubmit,
    replySubmit,
    editPost,
    editReply,
    deleteReply,
    deletePost
} from "../services/apiFacade";
import PostItem from "./PostItem";
import NewPostForm from "./NewPostForm";

// Styled components
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 20px; /* Optional: add padding to the top */
    padding-bottom: 80px; /* Make space for the fixed form at the bottom */
`;

export default function Post({ posts, setPosts, threadId, loggedInUser }) {
    const [currentThreadId, setCurrentThreadId] = useState(null); // threadId is passed as a prop from the parent component [Thread.jsx]
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
        console.log("threadId: " + threadId + " from post.jsx");
    }, [threadId, loggedInUser]);

    const toggleReplies = (postId) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleReplyClick = (postId) => {
        setReplyingToPostId(postId);
    };

    const handleEditPostClick = (postId, content) => {
        console.log('handleEditPostClick called with:', postId, content);
        setEditingPostId(postId);
        setEditContent(content);
        setEditingReplyId(null);
    };

    function handleEditReplyClick(replyId, content) {
        setEditingReplyId(replyId);
        setEditContent(content);
        setEditingPostId(null);
    }

    const handleNewPostSubmit = async (event) => {
        event.preventDefault();
        if (newPostContent.trim()) {
            const data = await postSubmit(newPostContent, loggedInUserData.username, currentThreadId);
            console.log(data);
            setPosts((prev) => [...prev, data]);
            setNewPostContent('');
        }
    };

    const handleNewReplySubmit = async (newReplyContent, replyingToPostId) => {
        if (newReplyContent.trim() && replyingToPostId !== null) {
            const data = await replySubmit(newReplyContent, replyingToPostId, loggedInUserData.username);
            setPosts((prev) =>
                prev.map((post) =>
                    post.id === replyingToPostId
                        ? { ...post, replies: [...post.replies, data] }
                        : post
                )
            );
            console.log(data + " from post.jsx");
            setNewReplyContent('');
            setReplyingToPostId(null);
        }
    };

    const handleEditPostSubmit = async (e) => {
        e.preventDefault();
        if (editContent.trim() && editingPostId !== null) {
            const data = await editPost(editContent, editingPostId);
            setPosts((prev) =>
                prev.map((post) =>
                    post.id === editingPostId
                        ? { ...post, content: data.content }
                        : post
                )
            );
            setEditContent('');
            setEditingPostId(null);
        }
    };

    const handleEditReplySubmit = async (e) => {
        e.preventDefault();
        if (editContent.trim() && editingReplyId !== null) {
            const data = await editReply(editContent, editingReplyId);
            setPosts((prev) => {
                return prev.map((post) => {
                    return {
                        ...post,
                        replies: post.replies.map((reply) => {
                            return reply.id === editingReplyId ? { ...reply, content: data.content } : reply;
                        })
                    };
                });
            });
            setEditContent('');
            setEditingReplyId(null);
        }
    };

    function handleDeleteReplyClick(id) {
        handleDeleteReply(id);
    }

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

    function handleDeletePostClick(id) {
        handleDeletePost(id);
    }

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
                    toggleReplies={toggleReplies}
                    handleReplyClick={handleReplyClick}
                    handleEditPostClick={handleEditPostClick}
                    handleDeletePostClick={handleDeletePostClick}
                    replyingToPostId={replyingToPostId}
                    newReplyContent={newReplyContent}
                    setNewReplyContent={setNewReplyContent}
                    handleNewReplySubmit={handleNewReplySubmit}
                    visibleReplies={visibleReplies}
                    handleEditReplyClick={handleEditReplyClick}
                    handleDeleteReplyClick={handleDeleteReplyClick}
                    editingReplyId={editingReplyId}
                    editingPostId={editingPostId}
                    setEditContent={setEditContent}
                    editContent={editContent}
                    handleEditPostSubmit={handleEditPostSubmit}
                    handleEditReplySubmit={handleEditReplySubmit}
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
