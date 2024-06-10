import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); {/*create 3 columns with each taking up a fraction of the available space*/}
    gap: 20px;
`;

const GridItem = styled.div`
    background-color: lightblue;
    padding: 10px;
`;

export const Grid = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/flexbox");
    }

  return (
    <>
    <button onClick={handleOnClick}>Switch to Flexbox</button>
    <GridContainer>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
        <GridItem>7</GridItem>
        <GridItem>8</GridItem>
        <GridItem>9</GridItem>
    </GridContainer>
    </>
  )
}
