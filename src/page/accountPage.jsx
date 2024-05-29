import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
    `;

    const PostUnderYourName = styled.div`

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


export const AccountPage = ({loggedInUser}) => {
    const [threads, setThreads] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [filteredThreads, setFilteredThreads] = useState([]);
    const [filteredposts, setFilteredPosts] = useState([]);
    const [search, setSearch] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(loggedInUser.email, loggedInUser.username, loggedInUser.roles);
                const threads = await fetchThreadsByUserId(loggedInUser.username);
                const posts = await fetchPostsByUserId(loggedInUser.username);
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
            return post.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredPosts(filteredPosts);
    }

    function filterThreads(search) {
        if (search === '') {
            setFilteredThreads(threads);
            return;
        }
        const filteredThreads = threads.filter((thread) => {
            return thread.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredThreads(filteredThreads);
    }


return (
    <Container>
            
            <PersonalInformation>
                <button onClick={handleLogout}>Logout</button>
                <h1>Account Page</h1>
                <p>Here you can see your account information</p>
                <p>Username: {loggedInUser.username}</p>
                <p>Roles: {loggedInUser.roles}</p>
                <p>Email: {loggedInUser.email}</p>
                <form>
                    <input type="seach" placeholder="filter topics" onChange={handleSearch}/>
                </form>

                
                <ThreadsUnderYourName>
                <p>Threads under your name :</p>
                    {filteredThreads && filteredThreads.map((thread) => (
                        <div key={thread.id} onClick={() => {navigate(`/thread/${thread.id}`);}}>
                            <h1>{thread.title}</h1>
                            <p>{thread.content}</p>
                        </div>
                    ))}
                </ThreadsUnderYourName>
                <p>Posts under your name : </p>
                <PostUnderYourName>
                    {filteredposts && filteredposts.map((post) => (
                    <div key={post.id} onClick={() => {navigate(`/post/${post.id}`);}}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>    
                    </div>
                    ))}
                </PostUnderYourName>
            </PersonalInformation>
    </Container>
);


}