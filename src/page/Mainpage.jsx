import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Items from '../components/Items';
import Header from '../layout/Header';

const Container = styled.div`
    height: 100vh;
    overflow-y: auto;
    background-color: white;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    @media(max-width:400px){
        width:70%;
           
        
    }

`

export const Mainpage = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const localhost = true;
    const url = localhost ? 'http://localhost:7070/api' : "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url + '/public/getAllThreads');
                const data = await response.json();
                console.log(data);
                setItems(data);
            } catch (error) {
                console.error('fetching data error', error);
            }
        };
        fetchData();
    }, []);

    function goToThread(item) {
        console.log(item.id);
        navigate(`/thread/${item.id}`);
    }

    function goToUser(id) {
        console.log(id);
        navigate(`/user/${id}`); 
    }

    return (
        <>
        <Header/>
              
        <Container>
            <Items
                items={items}
                goToThread={goToThread}
                goToUser={goToUser}
            />
        </Container>
        </>
        
    )
};
