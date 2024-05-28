import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import styled from "styled-components";
import Thread from "../components/Thread";

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
    const localhost = true;
    const url = localhost ? 'http://localhost:7080/api' : "";

    const fetchData = async () => {
        try {
            const response = await fetch(url + `/public/getThreadById/${id}`)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('fetching data error', error);
        }
    };
    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchData();
            setThreadData(data);
            setPosts(data.posts);
        };
        fetchAndSetData();
    }, [setPosts]);

    return(
        <Container>
            <ThreadContainer>
            <Thread threadData={threadData} posts={posts} setPosts={setPosts} loggedInUser={loggedInUser}/>
            </ThreadContainer>
        </Container>
    )
}