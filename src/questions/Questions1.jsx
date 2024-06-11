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

export const Questions1 = () => {
  return (
    <>
      <Container>
        <StyledHeader>Question 1</StyledHeader>
        <StyledContent>
          <StyledHeader2>High-Order Functions:</StyledHeader2>
          <StyledP>Function that takes other functions (callbacks) as arguments or return functions</StyledP>
          <StyledHeader3>Example:</StyledHeader3>
          <StyledP>Map, Filter, Reduce, useEffect</StyledP>
          <StyledHeader3>Benefits:</StyledHeader3>
          <StyledP>Enhanced code modulatiry and reusability</StyledP>
          <StyledP>More expressive and declarative code. Easier to read and understand.</StyledP>
          <StyledP>Functional programming with pure functions (Return value is only depending on parameters and no side effects)</StyledP>
          <br/>
          <StyledHeader2>React Component:</StyledHeader2>
          <StyledP>Self contained module that renders JSX based on input via props and state</StyledP>
          <StyledHeader3>Building blocks:</StyledHeader3>
          <StyledP>JSX: Syntax extension for writing XML in Javascript</StyledP>
          <StyledP>Props: Input data for the component</StyledP>
          <StyledP>State: Internal data for the component</StyledP>
          <StyledP>Lifecycle methods: Methods that are called during the lifecycle of the component. Now using hooks instead.</StyledP>
          <StyledP>Hooks: Functions that let you use state and other React features without having to make classes</StyledP>
          <StyledHeader3>Benefits:</StyledHeader3>
          <StyledP>Reusability: Components can be reused across the application</StyledP>
          <StyledP>Modularity: Components can be composed of other components</StyledP>
          <StyledP>Separation of concerns: Components can be focused on a single task</StyledP>
          <StyledP>Enhanced Maintenence: Isolated Components make debugging and updates easier</StyledP>
          <StyledP>Performance: React uses Virtual DOM to optimize rendering</StyledP>
          <br/>
          <StyledHeader2>React-Router:</StyledHeader2>
          <StyledP>Library for handling routing in React applications</StyledP>
          <StyledHeader3>Problems solved:</StyledHeader3>
          <StyledP>Handling navigation between different pages without reloads</StyledP>
          <StyledP>Handling dynamic urls and parameters</StyledP>
          <StyledP>Conditional rendering based on the route</StyledP>
          <StyledHeader3>Components:</StyledHeader3>
          <StyledP>BrowserRouter: Wrapper component for enabling routing</StyledP>
          <StyledP>Route: Component for defining a route</StyledP>
          <StyledP>Link: Component for creating links</StyledP>
          <StyledP>Outlet: Placeholder for rendering child routes</StyledP>
          <StyledP>Path: URL</StyledP>
          <StyledP>Element: The component to render</StyledP>
        </StyledContent>
      </Container>
    </>
  )
}
