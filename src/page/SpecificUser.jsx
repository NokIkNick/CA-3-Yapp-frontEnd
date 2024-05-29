import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostsByUserId, fetchThreadsByUserId } from "../services/apiFacade";


const Container = styled.div`
    display: flex;
    height: 100vh;
    `;

    const PersonalInformation = styled.div`
    background-color: var(--basewhite);
    margin-top: 15%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
    padding: 2%;
    border-radius: 5px;
    width: 90%;
    text-align: center;
    color: var(--grey);

    input {
        background-color: var(--green);
        color: var(--basewhite);
        padding: 1.5%;
        border-radius: 5px;
        margin: 1% 0;
        width: 100%;
        text-align: center;
        border: none;
    }
    `;

    const PostUnderYourName = styled.div`
    background-color: var(--basewhite);
    border-radius: 5px;
    padding: 1%;
        div {
            background-color: var(--green);
            color: var(--basewhite);
            border-radius: 5px;
            padding: 1%;
            margin: 1% 0;
            cursor: pointer;
        }
    `;

    const ThreadsUnderYourName = styled.div`
    background-color: var(--basewhite);
    border-radius: 5px;
    padding: 1%;
        div {
            background-color: var(--green);
            color: var(--basewhite);
            border-radius: 5px;
            padding: 1%;
            margin: 1% 0;
            cursor: pointer;
        }
    `;

    const Threads = styled.div`
    overflow-y: auto;
    max-height: 40%;
    `;


export const SpecificUser = () => {
    const params = useParams();
    const [threads, setThreads] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [filteredThreads, setFilteredThreads] = useState([]);
    const [filteredposts, setFilteredPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const threads = await fetchThreadsByUserId(params.id);
                const posts = await fetchPostsByUserId(params.id);
                setThreads(threads);
                setPosts(posts);
                setFilteredPosts(posts);
                setFilteredThreads(threads);
            } catch (error) {
                console.error('fetching data error', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        filterThreads(search);
        filterPosts(search);
    }, [search]);


    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    function filterPosts(search) {
        if (search === '') {
            setFilteredPosts(posts);
            return;
        }
        const filteredPosts = posts.filter((post) => {
            return post.title && post.title.toLowerCase().includes(search.toLowerCase());
        });
        
        setFilteredPosts(filteredPosts);
    }

    function filterThreads(search) {
        if (search === '') {
            setFilteredThreads(threads);
            return;
        }
        const filteredThreads = threads.filter((thread) => {
            return thread.title && thread.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredThreads(filteredThreads);
    }


return (
    <Container>
            <PersonalInformation>
                <h1>Account Page of {params.id}</h1>
                <p>Here you can see your account information</p>
                <input type="seach" placeholder="Filter threads and posts" onChange={handleSearch}/>
                <Threads>
                <ThreadsUnderYourName>
                <p>Threads under your name :</p>
                    {filteredThreads && filteredThreads.map((thread) => (
                        <div key={thread.id} onClick={() => {navigate(`/thread/${thread.id}`);}}>
                            <h1>{thread.title}</h1>
                            <p>{thread.content}</p>
                        </div>
                    ))}
                </ThreadsUnderYourName>
                </Threads>
                <Threads>
                <p>Posts under your name : </p>
                <PostUnderYourName>
                    {filteredposts && filteredposts.map((post) => (
                    <div key={post.id} onClick={() => {navigate(`/thread/${post.threadId}`);}}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>    
                    </div>
                    ))}
                </PostUnderYourName>
                </Threads>
                
            </PersonalInformation>
    </Container>
);


}