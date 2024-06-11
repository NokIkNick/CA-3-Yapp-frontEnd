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


export const Questions3 = () => {
  return (
    <>
      <Container>
        <StyledHeader>Question 3</StyledHeader>
        <StyledContent>
          <StyledHeader2>Package.json</StyledHeader2>
          <StyledHeader3>What is package.json?</StyledHeader3>
          <StyledP>Package.json is a file that gives the necessary information to npm which allows it to identify the project as well as handle the project's dependencies. It can also contain other metadata such as a project description, version, license, and configuration data.</StyledP>
          <StyledHeader2>React Props</StyledHeader2>
          <StyledHeader3>What are React Props?</StyledHeader3>
          <StyledP>Props are short for properties and they are used to pass data from one component to another. They are read-only and help to make components reusable.</StyledP>
          <StyledHeader2>Props children</StyledHeader2>
          <StyledHeader3>What is the props children?</StyledHeader3>
          <StyledP>Props children is a special prop that allows you to pass components as data to other components.</StyledP>
          <StyledHeader2>State in React</StyledHeader2>
          <StyledHeader3>What is state in React?</StyledHeader3>
          <StyledP>State is a built-in React object that allows components to create and manage their own data. It is mutable and can be changed by calling the setState() method.</StyledP>
          <StyledP>Updating State triggers a rerender everywhere the state is being used.</StyledP>
          <StyledHeader3>Role of State in react</StyledHeader3>
          <StyledP>State is used to store data that can be changed over time. It is used to manage the data that the component needs to render and respond to user input.</StyledP>
          <StyledHeader3>How we deploy a React frontend APP to a docker container on a virtual machine:</StyledHeader3>
        </StyledContent>
      </Container>
    </>
  )
}
