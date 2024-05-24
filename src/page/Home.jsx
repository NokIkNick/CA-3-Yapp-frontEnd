import React from 'react';
import styled from 'styled-components';
import Header from '../layout/Header';
import PropTypes from 'prop-types';

export const Home = ({ loggedInUser }) => {
    const Container = styled.div`
        background-color: white;
        height: 100vh;
    `
    return (
        <Container>
        {/*For testing purposes only.*/}
        {loggedInUser ? <h1>Welcome {loggedInUser.username}</h1> : <h1>Welcome</h1>}
        <Header />
        </Container>
    )
}


Home.propTypes = {
    loggedInUser : PropTypes.object
}