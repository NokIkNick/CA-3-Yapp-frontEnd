import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  background: var(--offwhite);
  padding: 1rem;
  border-radius: 0.5rem;
`;

const StyledHeader = styled.h1`
  color: var(--grey);
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--grey);
  font-size: 1rem;
`;

const StyledHeader2 = styled.h2`
  color: var(--grey);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  align-item: left;
  justify-content: left;
  text-align: left;
`;

const StyledHeader3 = styled.h3`
  color: var(--grey);
  font-size: 1rem;
  margin-bottom: 1rem;
  align-item: left;
  justify-content: left;
  text-align: left;
`;

const StyledP = styled.p`
  color: var(--grey);
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const Questions2 = () => {
  return (
    <>
      <Container>
        <StyledHeader>Question 2</StyledHeader>
        <StyledContent>
          <StyledHeader2>Callback functions and where we used them:</StyledHeader2>
          <StyledHeader3>Examples of where we used them:</StyledHeader3>
          <StyledP>Map, Filter, UseEffect, Fetch</StyledP>
          <br/>
          <StyledHeader2>What is JSX? Provide an example:</StyledHeader2>
          <StyledP>JSX is a syntax extension for JavaScript. It was written to be used with React. Makes XML usable in Javascript</StyledP>
          <br/>
          <StyledHeader2>Flexbox and grid:</StyledHeader2>
          <StyledP>Flexbox is a 1 dimensional layout model that allows elements to align and distribute space within a container. It is used to design a responsive layout structure.</StyledP>
          <StyledP>Grid is a 2 dimensional layout model that allows elements to align and distribute space within a container. It is used to design a responsive layout structure.</StyledP>
        </StyledContent>
      </Container>
    </>
  )
}
