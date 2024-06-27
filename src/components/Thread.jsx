import Post from './Post';
import {Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";
import * as PropTypes from "prop-types";
import {editThread, deleteThread} from "../services/apiFacade.js";


const MainContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    @media(max-width:400px){
        width: 100%;
    }
    @media(max-width:460px){
        width: 100%;
    }
    @media(max-width:800px){
        width: 100%;
    }
    @media(max-width:900px){
        width: 100%;
    }
`;

const ThreadContenData = styled.div`
    display: flex;
    background: var(--basewhite);
    min-height: 20vh;
    min-width: 40%;
    align-items: center;
    flex-direction: column;
    margin: 1rem;
    padding: 1rem;
    border: 0.2rem solid var(--green);
    border-radius: 0.5rem;
    /*max-width: 400px;
    max-height: 533px;*/

    @media screen and (max-width: 400px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
    }
    @media screen and (max-width: 460px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
    }
    @media screen and (max-width: 800px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
    }
    @media screen and (max-width: 900px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
    }
    
`;

const TextArea = styled.textarea`
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 25rem;
    height: 9rem;
    box-sizing: border-box;
    resize: none;
    border-radius: 0.5rem; /* Rounded corners */

    @media screen and (max-width: 400px), (max-height: 533px) {
        height: 4rem;
        width: 20rem;
    }
    @media screen and (max-width: 460px), (max-height: 533px) {
        height: 4rem;
        width: 20rem;
    }
    @media screen and (max-width: 800px), (max-height: 533px) {
        height: 4rem;
        width: 20rem;
    }
    @media screen and (max-width: 900px), (max-height: 533px) {
        height: 4rem;
        width: 20rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    margin-top: 1rem;
    @media screen and (max-width: 400px), (max-height: 533px) {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
    @media screen and (max-width: 460px), (max-height: 533px) {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
    @media screen and (max-width: 800px), (max-height: 533px) {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow-x: auto; /* Add horizontal scrolling for smaller screens */
    }
    @media screen and (max-width: 900px), (max-height: 533px) {
        flex-direction: row;
        justify-content: center;
        align-items: center;
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

const SubmitButton = styled(Button)`
    background-color: #4CAF50; /* Example background color */
    color: black;

    &:hover {
        background-color: #45a049;
        transform: translateY(-0.125rem); /* -2px equivalent */
    }

    &:active {
        background-color: #3e8e41;
        transform: translateY(0);
    }
`;

const CancelButton = styled(Button)`
    margin-left: 0.7rem;
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

const EditButton = styled(Button)`
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
        //min-width: 5rem; /* Adjusted min-width */
    }
    @media screen and (max-width: 460px), (max-height: 533px) {
        padding: 0.25rem 0.4rem; /* Adjusted padding */
        //min-width: 5rem; /* Adjusted min-width */
    }
`;

const StyledImage = styled.img`
    width: 60vh;
    height: auto;

    @media screen and (max-width: 400px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
    }
    @media screen and (max-width: 460px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
    }
    @media screen and (max-width: 800px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
    }
    @media screen and (max-width: 900px), (max-height: 533px) {
        /* Adjust styles for smaller screens */
        width: 100%;
        height: auto;
        padding: 0.5rem;
        min-width: 95%;
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
                            <p><strong>Edit Post:</strong> </p>
                            <form onSubmit={handleEditThreadSubmit}>
                                <TextArea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                                {(loggedInUser && (loggedInUser.roles.includes("admin") || threadData.userName === loggedInUser.username)) && (
                                    <ButtonContainer>
                                        <SubmitButton type="submit">Submit Edit</SubmitButton>
                                        <CancelButton onClick={() => setEditingThread(false)}>Cancel</CancelButton>
                                    </ButtonContainer>
                                )}
                            </form>
                        </ThreadContenData>
                    ) : (
                        <ThreadContenData>
                            <div><strong>{threadData.title} by {threadData.userName} -- {threadData.roleNames} </strong></div>
                            <br/>
                            {threadData.content}
                            <StyledImage src='https://placehold.co/600x400'></StyledImage>
                            <br/>
                            <br/>
                            {(loggedInUser && (loggedInUser.roles.includes("admin") || threadData.userName === loggedInUser.username)) && (
                                <ButtonContainer>
                                    <EditButton onClick={() => handleEditThreadClick(threadData.content)}>Edit thread
                                    </EditButton>
                                    <DeleteButton onClick={() => handleDeleteThreadClick(threadData.id)}>Delete thread</DeleteButton>
                                </ButtonContainer>
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