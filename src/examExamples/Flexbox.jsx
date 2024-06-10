import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';


const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FlexItem = styled.div`
    width: 30%;
    background-color: lightblue;
    padding: 10px;
    margin: 10px;
`;

export const Flexbox = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/grid");
    }

    return (
    <>
    <button onClick={handleOnClick}>Switch to Grid</button>
    <FlexContainer>
        <FlexItem>1</FlexItem>
        <FlexItem>2</FlexItem>
        <FlexItem>3</FlexItem>
        <FlexItem>4</FlexItem>
        <FlexItem>5</FlexItem>
        <FlexItem>6</FlexItem>
        <FlexItem>7</FlexItem>
        <FlexItem>8</FlexItem>
        <FlexItem>9</FlexItem>
    </FlexContainer>
    </>
    )
}
