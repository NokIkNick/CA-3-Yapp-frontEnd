import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchThreads } from '../services/apiFacade';
import ThreadItem from '../components/Threaditems';

const Container = styled.div`
    height: 100vh;
    overflow-y: auto;
    background-color: white;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 5rem;
    box-sizing: border-box;
    overflow-wrap: break-word;
    
    @media(max-width:400px){
        width:100vw;
        padding: 0;
    }

`

export const Mainpage = ({search}) => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchThreads();
                setItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error('fetching data error', error);
            }
        };
        fetchData();
    });

    useEffect(() => {
        filterItems(search);
    }, [search]);

    function filterItems(search) {
        if (search === '') {
            setFilteredItems(items);
            return;
        }
        const filteredItems = items.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredItems(filteredItems);
    }

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
        <Container>
            <ThreadItem
                items={filteredItems}
                goToThread={goToThread}
                goToUser={goToUser}
            />
        </Container>
        </>
        
    )
};
