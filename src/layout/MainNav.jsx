
                import React from 'react';
                import styled from 'styled-components';
                import { NavLink, useNavigate } from 'react-router-dom';

                export const MainNav = () => {
                    const NavStyle = styled.nav`
                        background-color: var(--green);
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        height: 20%;

                    `;

                    const Logo = styled.img`
                        height: 50px;
                    
                    `;

                    const SearchBar = styled.input`
                        flex: 1;
                        margin: 0 10px;
                        padding: 0.5rem 0.5rem;
                        border: 1px solid gray;
                        border-radius: 5px;
                    `;

                    const Button = styled.button`
                        padding: 0.5rem 0.5rem;
                        margin: 0 0.5rem;
                        background-color: #f0f0f0;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        img {
                            height: 0.8rem;
                            
                        }
                    `;

                        const navigate = useNavigate();
                    return (    
                        <>
                            <NavStyle>
                                <Logo src="./src/assets/fulllogo.svg" alt="Logo" />
                                <SearchBar type="text" placeholder="Search..." />
                                <div>
                                    <Button onClick={() => {navigate("/createThread")}}>CreatePost</Button>
                                    <Button >
                                        <NavLink to="/login" />
                                        <img src="/src/assets/user.svg" alt="user" />
                                    </Button>
                                </div>
                            </NavStyle>
                        </>
                    );
                };
            