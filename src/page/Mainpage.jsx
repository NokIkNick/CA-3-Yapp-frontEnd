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
    margin-top: 3rem;
    padding-bottom: 3rem;
    //height, box sizing and overflow wrap could be removed for smoother experience. try it.
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
        // Disable scrolling on the body
        document.body.style.overflow = 'hidden';
        // Enable scrolling when the component is unmounted
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

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
    }, [navigate]);

    useEffect(() => {
        filterItems(search);
    }, [search]);

    function filterItems(search) {
    if (search === '') {
        setFilteredItems(items);
        return;
    }
    const lowerCaseSearch = search.toLowerCase();
    const filteredItems = items.filter((item) => {
        const titleMatch = item.title && item.title.toLowerCase().includes(lowerCaseSearch);
        const userNameMatch = item.userName && item.userName.toLowerCase().includes(lowerCaseSearch);
        const contentMatch = item.content && item.content.toLowerCase().includes(lowerCaseSearch);
        return titleMatch || userNameMatch || contentMatch;
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
        <Container>
            <ThreadItem
                items={filteredItems}
                goToThread={goToThread}
                goToUser={goToUser}
            />
        </Container>
    )
};
