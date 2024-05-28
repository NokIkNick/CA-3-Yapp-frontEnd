
import styled from "styled-components";
import {useEffect, useState} from "react";
import {formatDate} from "../services/apiFacade.js";

// Styled components
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 20px; /* Optional: add padding to the top */
    padding-bottom: 80px; /* Make space for the fixed form at the bottom */
`;

const PostContainer = styled.div`
    background: var(--basewhite);
    min-height: 20vh;
    padding: 16px;
    margin: 16px;
    width: 33%;
    box-sizing: border-box;
    position: relative;
    border: 10px var(--green) solid
    // border-top: 15px var(--green) solid;
`;

const ReplyContainer = styled.div`
    background: var(--baseWhite);;
    min-height: 10vh;
    padding: 12px;
    margin: 8px 16px;
    width: 90%;
    box-sizing: border-box;
    position: relative;
    margin-left: 20px;
    border: 2px var(--green) solid
`;

const DateContainer = styled.p`
    position: absolute;
    top: 8px;
    right: 16px;
    margin: 0;
    font-size: 0.9em;
    color: var(--green);
`;

const TextWithColor = styled.p`
    color: white;
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

const FormContainer = styled.div`
    background: var(--green);
    padding: 16px;
    margin: 16px;
    width: 90%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    color: var(--baseWhite);
    
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 50px; /* Larger default height for post text area */
    box-sizing: border-box;
    resize: none;
`;

const ReplyTextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 50px; /* Larger default height for reply text area */
    box-sizing: border-box;
    resize: none;
`;

const SubmitButton = styled.button`
    padding: 8px 16px;
    cursor: pointer;
`;

const BottomFormContainer = styled(FormContainer)`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 800px;
    background: white; /* Ensure it's visible */
    z-index: 1000; /* Ensure it's above other content */
    margin: 0; /* Remove margin to fit at the bottom */
    border-top: 1px solid #ccc; /* Optional: add a top border for separation */
`;


export default function Post({ posts ,setPosts, threadId, loggedInUser }) {

    // const [posts, setPosts] = useState([]);
    const [currentThreadId, setCurrentThreadId] = useState(null); // threadId is passed as a prop from the parent component [Thread.jsx
    const [loggedInUserData, setLoggedInUserData] = useState({});
    const [visibleReplies, setVisibleReplies] = useState({});
    const [newPostContent, setNewPostContent] = useState('');
    const [newReplyContent, setNewReplyContent] = useState('');
    const [replyingToPostId, setReplyingToPostId] = useState(null);
    const localhost = true;
    const url = localhost ? 'http://localhost:7080/api' : "";

    useEffect(() => {
        setLoggedInUserData(loggedInUser);
        setCurrentThreadId(threadId);
        console.log("threadId: "+threadId +"from post.jsx");
    }, []);

    const toggleReplies = (postId) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };
    const handleNewPostSubmit = async (event) => {
        event.preventDefault();
        console.log(loggedInUser)
        if (newPostContent.trim()) {
            const response = await fetch("http://localhost:7080/api/protected/createPost", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content: newPostContent,
                    userName: "PatrickUser3", // loggedInUserData.username,
                    threadId: currentThreadId,
                })
            });
            const data = await response.json();
            console.log(data);
            setPosts((prev) => [...prev, data]);
            setNewPostContent('');
        }
    }

    const handleNewReplySubmit = async (e) => {
        e.preventDefault();
        if (newReplyContent.trim() && replyingToPostId !== null) {
            const response = await fetch('http://localhost:7080/api/protected/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content: newReplyContent,
                    userName: "PatrickUser3", // loggedInUserData.username,
                    threadId: currentThreadId,
                    parentReplyId: replyingToPostId
                })
            });
            const data = await response.json();
            setPosts((prev) =>
                prev.map((post) =>
                    post.id === replyingToPostId
                        ? { ...post, replies: [...post.replies, data] }
                        : post
                )
            );
            setNewReplyContent('');
            setReplyingToPostId(null);
        }
    };

    const handleReplyClick = (postId) => {
        setReplyingToPostId(postId);
    };
    const handlePostChange = (e) => {
        setNewPostContent(e.target.value);
        console.log(newPostContent);
    }

    return (
        <MainContainer>
            {posts && posts.map((post) => (
                <PostContainer key={post.id} className="post">
                    <div>
                        <strong>Post by User: {post.userName}:</strong>
                        <p>{post.content}</p>
                    </div>
                    <DateContainer><strong>Created Date:</strong> {formatDate(post.createdDate)}</DateContainer>
                    {post.replies.length > 0 && (
                        <>
                            <ToggleRepliesLink onClick={() => toggleReplies(post.id)}>
                                {visibleReplies[post.id] ? "Hide replies" : `Show replies (${post.replies.length})`}
                            </ToggleRepliesLink>
                            {visibleReplies[post.id] && (
                                <div className="replies">
                                    <h4>Replies:</h4>
                                    {post.replies.map((reply) => (
                                        <ReplyContainer key={reply.id} className="reply">
                                                <strong>Reply by User: {reply.userName}:</strong>
                                            <p>{reply.content}</p>
                                            <DateContainer><strong>Created Date:</strong> {formatDate(reply.createdDate)}</DateContainer>
                                            </ReplyContainer>
                                    ))}
                        </div>
                            )}
                        </>
                    )}
                    <ReplyButton onClick={() => handleReplyClick(post.id)}>Reply</ReplyButton>
                    {replyingToPostId === post.id && (
                        <FormContainer>
                            <TextWithColor>Write a Reply: </TextWithColor>
                            <form onSubmit={handleNewReplySubmit}>
                                <ReplyTextArea
                                    value={newReplyContent}
                                    onChange={(e) => setNewReplyContent(e.target.value)}
                                    placeholder="Write your reply..."
                                />
                                <SubmitButton type="submit">Submit Reply</SubmitButton>
                            </form>
                        </FormContainer>
                    )}
                </PostContainer>
            ))}
            <BottomFormContainer>
                <h3>Create New Post</h3>
                <form onSubmit={handleNewPostSubmit}>
                    <TextArea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Post content"
                    />
                    <SubmitButton type="submit">Submit Post</SubmitButton>
                </form>
            </BottomFormContainer>
        </MainContainer>
    );
}