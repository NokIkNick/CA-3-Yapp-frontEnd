import React from 'react'
import styled from 'styled-components'
import { Header } from '../layout/Header'

export const Home = () => {
    const Container = styled.div`
        background-color: white;
        height: 100vh;
    `
    return (
        <Container>
        <Header />
        </Container>
    )
}