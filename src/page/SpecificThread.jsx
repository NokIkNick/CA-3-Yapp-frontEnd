import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import styled from "styled-components";
import Thread from "../components/Thread";
import {fetchThreadData} from "../services/apiFacade";


const Container = styled.div`
    min-height: calc(100vh - 1rem); /* Minimum height of viewport minus 1rem */
    background-color: var(--green);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    width: 100%;
    @media (max-width: 400px), (max-height: 533px) {
        font-size: 0.8rem;
    }
`;

const ThreadContainer = styled.div`
    background-color: var(--offwhite); /* Light gray background color */
    border: 0.1rem solid #dddddd; /* Light gray border */
    padding: 1.5rem;
    margin: 1.5rem;
    border-radius: 0.5px;
    width: 100%;

    @media (max-width: 400px) , (max-height: 533px) {
        width: 100%;
    }
    @media (max-width: 460px) , (max-height: 533px) {
        width: 100%;
    }
`;

export default function SpecificThread({loggedInUser}){

    let {id} = useParams();
    const [threadData, setThreadData] = useState([]);
    const [posts, setPosts] = useState([]);

    
    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchThreadData(id);
            setThreadData(data);
            console.log(data.posts + "data in specific thread");
            setPosts(data.posts);
        };
        fetchAndSetData();
    }, [setPosts]);

    return(
        <Container>
            <ThreadContainer>
            <Thread threadData={threadData} setThreadData={setThreadData} posts={posts} setPosts={setPosts} loggedInUser={loggedInUser}/>
            </ThreadContainer>
        </Container>
    )
}