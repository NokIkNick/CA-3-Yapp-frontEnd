import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--basewhite);
    padding: 1rem;
`;

const StyledSelect = styled.select`
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid var(--grey);
`;

export const Questions = () => {
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        navigate(`/questions/${e.target.value}`);
    }
  
    return (
    <>
        <Container>
        <form>
            <StyledSelect onChange={handleOnChange}>
                <option value="1">Question 1</option>
                <option value="2">Question 2</option>
                <option value="3">Question 3</option>
                <option value="4">Question 4</option>
                <option value="5">Question 5</option>
                <option value="6">Question 6</option>
                <option value="7">Question 7</option>
                <option value="8">Question 8</option>
                <option value="9">Question 9</option>
                <option value="10">Question 10</option>
                <option value="11">Question 11</option>
                <option value="12">Question 12</option>
                <option value="13">Question 13</option>
            </StyledSelect>
        </form>
        </Container>
        <Outlet />
    </>
  )
}
