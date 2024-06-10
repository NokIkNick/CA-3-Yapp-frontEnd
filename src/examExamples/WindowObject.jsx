import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
    box-shadow:inset 0 0 0 2rem #f1f1e5;
    background-color: #f3f3e4;
    text-align: left;
    margin: 1rem 1rem; 
    padding:2rem ;
    border-radius: 2rem;
    
`

export const WindowObject = () => {
  return (
    <>
        <Container>
            <h1>Window Object</h1>
            <p>The window object represents an open window in a browser.</p>
            <button onClick={() => window.alert("Alert!")}>Alert Button</button>
            <button onClick={() => window.confirm("Confirm?")}>Confirm Button</button>
            <button onClick={() => window.prompt("Prompt")}>Prompt Button</button>
            <br/>
            <br/>
            <p>Window size: {window.innerWidth} x {window.innerHeight}</p>
            <p>Screen size: {window.screen.width} x {window.screen.height}</p>
            <p>URL: {window.location.href}</p>
            <p>Hostname: {window.location.hostname}</p>
            <p>Pathname: {window.location.pathname}</p>
            <p>Protocol: {window.location.protocol}</p>
            <p>Port: {window.location.port}</p>
            <p>Reload page: <button onClick={() => window.location.reload()}>Reload</button></p>
            <p>Go back: <button onClick={() => window.history.back()}>Back</button></p>
            <p>Go forward: <button onClick={() => window.history.forward()}>Forward</button></p>
        </Container>
    </>
  )
}
