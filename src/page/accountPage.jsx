import React from "react";
import styled from "styled-components";

export const AccountPage = ({loggedInUser}) => {
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

    const PostUnderName = styled.div`

    `;

return (
    <Container>
            <PersonalInformation>
                <h1>Account Page</h1>
                <p>Here you can see your account information</p>
                <p>Username: {loggedInUser.username}</p>
                <p>Email: {loggedInUser.email}</p>
                <p>Posts under your name : </p>
                <PostUnderName>

                </PostUnderName>
            </PersonalInformation>
    </Container>
);


}