import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import styled from "styled-components";
import Thread from "../components/Thread";
import {fetchThreadData} from "../services/apiFacade";


const Container = styled.div`
    height: calc(100vh - 1rem);
    overflow-y: auto;
    background-color: white;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-top: 4rem;

    @media(max-width:400px){
        width: 70%;
    }
`;

const ThreadContainer = styled.div`
    background-color: #f8f9fa; /* Light gray background color */
    border: 1px solid #ddd; /* Light gray border */
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
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