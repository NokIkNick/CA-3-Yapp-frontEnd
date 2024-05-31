import Post from './Post';
import {Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";
import * as PropTypes from "prop-types";
import {editThread, deleteThread} from "../services/apiFacade.js";


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* Media Query for smaller screens */
    @media screen and (max-width: 400px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
    }
`;

const ThreadContenData = styled.div`
    display: flex;
    background: var(--basewhite);
    min-height: 20vh;
    min-width: 100vh;
    align-items: center;
    flex-direction: column;
    margin: 16px;
    padding: 16px;
    border: 2px solid darkblue;
    border-radius: 8px;
    max-width: 400px;
    max-height: 533px;
    /* Media Query for smaller screens */
    @media screen and (max-width: 400px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: 100%;
        padding: 10px;
    }
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    resize: none;

    /* Media Query for smaller screens */
    @media screen and (max-width: 400px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        height: 40px;
    }
`;

TextArea.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default function Thread({ threadData,setThreadData, posts, setPosts, loggedInUser }) {

    const [editingThread, setEditingThread] = useState(false);
    const [editContent, setEditContent] = useState('');
    const navigate = useNavigate();

    const handleEditThreadClick = (content) => {
        setEditingThread(true);
        setEditContent(content);
    };

    const handleDeleteThreadClick = async (e) => {
        const data = await deleteThread(threadData.id);
        setThreadData([]);
        navigate('/home')
    };

    const handleEditThreadSubmit = async (e) => {
        e.preventDefault();
        if (editContent.trim() && editingThread === true) {
            const data = await editThread(editContent, threadData.id);
            setThreadData(data);
            setEditContent('');
            setEditingThread(false);
        }
    };

    return (
        <MainContainer>
            {threadData.id && (
                <>
                    {editingThread ? (
                        <ThreadContenData>
                            <p>Edit Post:</p>
                            <form onSubmit={handleEditThreadSubmit}>
                                <TextArea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                                {(loggedInUser && (loggedInUser.roles.includes("ADMIN") || threadData.userName === loggedInUser.username)) && (
                                    <>
                                        <button type="submit">Submit Edit</button>
                                        <button onClick={() => setEditingThread(false)}>Cancel</button>
                                    </>
                                )}
                            </form>
                        </ThreadContenData>
                    ) : (
                        <ThreadContenData>
                            <div><strong>{threadData.title} by {threadData.userName} </strong></div>
                            <br/>
                            {threadData.content}
                            <br/>
                            <br/>
                            {(loggedInUser && (loggedInUser.roles.includes("ADMIN") || threadData.userName === loggedInUser.username)) && (
                                <>
                                    <button onClick={() => handleEditThreadClick(threadData.content)}>Edit thread
                                    </button>
                                    <button onClick={() => handleDeleteThreadClick(threadData.id)}>Delete thread</button>
                                </>
                            )}
                        </ThreadContenData>
                    )}
                    <br/>
                    <Post posts={posts} setPosts={setPosts} threadId={threadData.id} loggedInUser={loggedInUser}/>
                </>
            )}
            <Outlet/>
        </MainContainer>
    );
}