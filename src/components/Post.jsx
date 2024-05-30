
import styled from "styled-components";
import {useEffect, useState} from "react";
import {formatDate, postSubmit, replySubmit, editPost, editReply , deleteReply , deletePost} from "../services/apiFacade.js";

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
    border-left: 1rem solid var(--green);
    border-right: 1rem solid var(--green);
    border-bottom: 1rem solid var(--green);
    border-top: 2.5rem solid var(--green); /* Larger top border */
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

const TextWithColorWhite = styled.p`
    color: white;
    //position: absolute;
  /*  top: 8px; !* Adjust to be inside the padding and border *!
    left: 8px; !* Adjust to be inside the padding and border *!
    margin: 0; !* Optional: Remove default margin *!*/
    `;

const TextWithColorBlack = styled.p`
    color: black;
    //position: absolute;
  /*  top: 8px; !* Adjust to be inside the padding and border *!
    left: 8px; !* Adjust to be inside the padding and border *!
    margin: 0; !* Optional: Remove default margin *!*/
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
        console.log("threadId: "+threadId +"from post.jsx");
    }, []);

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
        setEditingPostId(postId);
        setEditContent(content);
        setEditingReplyId(null);
    };

    function handleEditReplyClick(replyId,content) {
        setEditingReplyId(replyId);
        setEditContent(content);
        setEditingPostId(null);
    }

    const handleNewPostSubmit = async (event) => {
        event.preventDefault();
        if (!newPostContent.trim().valueOf("")) {
            const data = await postSubmit(newPostContent, loggedInUserData.username, currentThreadId);
            console.log(data);
            setPosts((prev) => [...prev, data]);
            setNewPostContent('');
        }

        const handleNewReplySubmit = async (e) => {
            e.preventDefault();
            if (newReplyContent.trim() && replyingToPostId !== null) {
                const data = await replySubmit(newReplyContent, replyingToPostId, loggedInUserData.username, currentThreadId);
                setPosts((prev) =>
                    prev.map((post) =>
                        post.id === replyingToPostId
                            ? {...post, replies: [...post.replies, data]}
                            : post
                    )
                );
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
                            ? {...post, content: data.content}
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
                                return reply.id === editingReplyId ? {...reply, content: data.content} : reply;
                            })
                        };
                    });
                });
                setEditContent('');
                setEditingReplyId(null);
            }
        }

        function handleDeleteReplyClick(id) {
            // const data = await deleteReply(id);
        }

        function handleDeletePostClick(id) {

        }

        return (
            <MainContainer>
                {posts && posts.map((post) => (
                    <PostContainer key={post.id} className="post">
                        <TextWithColorBlack>
                            <strong>By: {post.userName}:</strong>
                        </TextWithColorBlack>
                        <br/>
                        {editingPostId === post.id ? (
                            <FormContainer>
                                <TextWithColorWhite>Edit Post:</TextWithColorWhite>
                                <form onSubmit={handleEditPostSubmit}>
                                    <TextArea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                    <SubmitButton type="submit">Submit Edit</SubmitButton>
                                    <ReplyButton onClick={() => setEditingPostId(null)}>Cancel</ReplyButton>
                                </form>
                            </FormContainer>
                        ) : (
                            <>
                                <p>{post.content}</p>
                                <DateContainer><strong>Created Date:</strong> {formatDate(post.createdDate)}
                                </DateContainer>
                                {(loggedInUserData && (loggedInUserData.roles.includes("ADMIN") || post.userName === loggedInUserData.username)) && (
                                    <>
                                        <button onClick={() => handleEditPostClick(post.id, post.content)}>Edit post
                                        </button>
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
                                            <ReplyContainer key={reply.id} className="reply">
                                                {editingReplyId === reply.id ? (
                                                    <FormContainer>
                                                        <TextWithColorWhite>Edit Reply</TextWithColorWhite>
                                                        <form onSubmit={handleEditReplySubmit}>
                                                            <ReplyTextArea
                                                                value={editContent}
                                                                onChange={(e) => setEditContent(e.target.value)}
                                                            />
                                                            <SubmitButton type="submit">Submit Edit</SubmitButton>
                                                            <ReplyButton
                                                                onClick={() => setEditingReplyId(null)}>Cancel</ReplyButton>
                                                        </form>
                                                    </FormContainer>
                                                ) : (
                                                    <>
                                                        <strong>User: {reply.userName}:</strong>
                                                        <p>{reply.content}</p>
                                                        {(loggedInUserData && (loggedInUserData.roles.includes("ADMIN") || reply.userName === loggedInUserData.username)) && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleEditReplyClick(reply.id, reply.content)}>Edit
                                                                    reply
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteReplyClick(reply.id)}>Delete
                                                                    reply
                                                                </button>
                                                            </>
                                                        )}
                                                        <DateContainer><strong>Created
                                                            Date:</strong> {formatDate(reply.createdDate)}
                                                        </DateContainer>
                                                    </>
                                                )}
                                            </ReplyContainer>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                        {loggedInUserData && (
                            <ReplyButton onClick={() => handleReplyClick(post.id)}>Reply To Post</ReplyButton>
                        )}
                        {replyingToPostId === post.id && (
                            <>
                                <FormContainer>
                                    <TextWithColorWhite>Write Reply: </TextWithColorWhite>
                                    <form onSubmit={handleNewReplySubmit}>
                                        <ReplyTextArea
                                            value={newReplyContent}
                                            onChange={(e) => setNewReplyContent(e.target.value)}
                                            placeholder="Write your reply..."
                                        />
                                        <SubmitButton type="submit">Submit Reply</SubmitButton>
                                        <ReplyButton onClick={() => setReplyingToPostId(null)}>Cancel</ReplyButton>
                                    </form>
                                </FormContainer>
                            </>
                        )}
                    </PostContainer>
                ))}
                {loggedInUserData && (
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
                )}
            </MainContainer>
        );

    }
}