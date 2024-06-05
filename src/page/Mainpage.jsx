import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchThreads, fetchCategories } from '../services/apiFacade';
import ThreadItem from '../components/Threaditems';

const Container = styled.div`
    color: var(--grey);
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 3rem;
    padding-bottom: 3rem;
    display: flexbox;
`

const Select = styled.select`
    color: var(--grey);
    display : block;
    margin: 1rem 1rem;
    border-radius: 0.7rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    background-color: var(--basewhite);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("/arrow-down.svg");
    background-repeat: no-repeat;
    background-position: right;
    background-blend-mode: normal;
    background-size: 2rem;
    transition: background-image 0.1s ease-in-out;

    &:focus {
        background-image: url("/arrow-up.svg");
        outline: none;
    }
`

export const Mainpage = ({search}) => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const selectRef = useRef();

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
                const categories = await fetchCategories();
                setCategories(categories);
                setItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error('fetching data error', error);
            }
        };
        fetchData();

        return () => { //Cleanup function to make sure the state is reset when the component is unmounted and resolves potential memory leaks
            setItems([]);
            setFilteredItems([]);
        }

    }, [navigate]);

    useEffect(() => {
        filterItems(search);
    }, [search]);

    function filterItems(search) {
        selectRef.current.blur();
    if (search === '') {
        setFilteredItems(items);
        return;
    }
    const lowerCaseSearch = search.toLowerCase();
    const filteredItems = items.filter((item) => {
        const titleMatch = item.title && item.title.toLowerCase().includes(lowerCaseSearch);
        const userNameMatch = item.userName && item.userName.toLowerCase().includes(lowerCaseSearch);
        const contentMatch = item.content && item.content.toLowerCase().includes(lowerCaseSearch);
        const categoryMatch = item.category && item.category.toLowerCase().includes(lowerCaseSearch);
        return titleMatch || userNameMatch || contentMatch || categoryMatch;
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
            <Select onChange={(e) => {filterItems(e.target.value)}} ref={selectRef}>
                <option value="">All Categories</option>
                {categories && categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </Select>
            <ThreadItem
                items={filteredItems}
                goToThread={goToThread}
                goToUser={goToUser}
            />
        </Container>
    );
};
