import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const NavStyle = styled.nav`
    background-color: var(--green);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8%;
    
    position: fixed;
    top: 0;
    width: 100%;
`;

const Logo = styled.img`
    cursor: pointer;
    height: 50px;
`;

const SearchWrapper = styled.div`
    position: relative;
    max-width: 100%;
    width: 100%;
        input {
            width: calc(100% - 3rem); // subtract the width of the button
            margin: 0 10px;
            padding: 0.5rem 0.5rem;
            border: 1px solid gray;
            border-radius: 5px;
            background-color: var(--basewhite);
        }
        button{
            position: absolute;
            right: 0;
            top: 0.01rem;
            width: 3rem;
            height: 2.5rem;
            border: none;
            background: none;
            cursor: pointer;
            img{
                width: 60%;
                height: auto;
            }
        }
`;

const Buttons = styled.div`
    display: flex;
    button {
        padding: 0.5rem 0.7rem;
        margin: 0 0.2rem;
        background-color: var(--basewhite);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        img {
            height: 0.8rem;
        }
    }
`;


export const MainNav = ({setSearch}) => {
const navigate = useNavigate();
const MainNav = () => {
    let button;
    if (window.location.pathname === "/home") {
        if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
            button = <button>Login first</button>;
        } else {
            button = <button onClick={() => {navigate("/createthread")}}>Create Thread</button>;
        }
        
    } else if (window.location.pathname === "/threads") {
        if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
            button = <button>Login first</button>;
        } else {
        button = <button onClick={() => {navigate("/home")}}>Create Post</button>;
        }
    } else if (window.location.pathname === "/accountPage") {
        if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
            button = <button>Login first</button>;
        } else {
        button = <button onClick={() => {navigate("/createthread")}}>create thread</button>;
        }
    } else {
        button = null;
    }
return (
    <div>
        {button}
    </div>
);
}


let debounceTimer;

const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

function handleChange(event){
    const search = event.target.value;
    debounce(() => handleSearchPosts(search), 500);
}

function handleSearchPosts(search){
    setSearch(search);
}

function userButton(){
    if (localStorage.getItem("token") === null) {
        navigate("/login");
        console.log("Login first");
    } else {
        console.log("Account page");
        navigate("/accountPage");
        
    }
}

return (    
    <>
        <NavStyle>
            <Logo src="./src/assets/fulllogo.svg" alt="Logo" onClick={() => {navigate("/home")}} />
                <SearchWrapper>
                    <input type="search" placeholder="Search..." onChange={handleChange} />
                </SearchWrapper>
                <Buttons>
                    <MainNav />
                    <button onClick={userButton}>
                        <img src="/src/assets/user.svg" alt="user" />
                    </button>
                </Buttons>
        </NavStyle>
    </>
);
}