import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchThreadsByUserId } from "../services/apiFacade";


const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: var(--offwhite);
    `;

    const PersonalInformation = styled.div`
    background-color: var(--basewhite);
    margin: 10% auto;
    padding: 2%;
    border-radius: 5px;
    width: 70%;
    text-align: center;
    color: var(--grey);
    `;

    const PostUnderYourName = styled.div`

    `;

    const ThreadsUnderYourName = styled.div`

    `;


export const AccountPage = ({loggedInUser}) => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        Navigate("/login")
        localStorage.removeItem("token");
        
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchThreadsByUserId(loggedInUser.username);
                setItems(data);
            } catch (error) {
                console.error('fetching data error', error);
            }
        };
        fetchData();
    }, []);


return (
    <Container>
            <PersonalInformation>
                <button onClick={handleLogout}>Logout</button>
                <h1>Account Page</h1>
                <p>Here you can see your account information</p>
                <p>Username: {loggedInUser.username}</p>
                <p>Email: {loggedInUser.email}</p>
                <p>Threads under your name :</p>
                <ThreadsUnderYourName>
                    {items && items.map((item) => (
                        <div key={item.id} onClick={() => {navigate(`/thread/${item.id}`);}}>
                            <h1>{item.title}</h1>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </ThreadsUnderYourName>
                <p>Posts under your name : </p>
                <PostUnderYourName>
                    
                </PostUnderYourName>
            </PersonalInformation>
    </Container>
);


}