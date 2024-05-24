import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const NavStyle = styled.nav`
    background-color: var(--green);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8%;
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
        background-color: #f0f0f0;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        img {
            height: 0.8rem;
        }
    }
`;


export const MainNav = () => {
const navigate = useNavigate();
const MainNav = () => {
    let button;
if (window.location.pathname === "/home") {
    button = <button onClick={() => {navigate("/createthread")}}>Create Thread</button>;
} else if (window.location.pathname === "/threads") {
    button = <button onClick={() => {navigate("/home")}}>Create Post</button>;
} else {
    button = null;
}
return (
    <div>
        {button}
    </div>
);
}
return (    
    <>
        <NavStyle>
            <Logo src="./src/assets/fulllogo.svg" alt="Logo" onClick={() => {navigate("/home")}} />
                <SearchWrapper>
                    <input type="text" placeholder="Search..." />
                        <button>
                            <img src="/src/assets/search.svg" alt="search" />
                                </button>
                                    </SearchWrapper>
                                    <Buttons>
                                        <MainNav />
                                        <button onClick={() => {navigate("/login")}}>
                                            <img src="/src/assets/user.svg" alt="user" />
                                        </button>
                                    </Buttons>
        </NavStyle>
    </>
);
}