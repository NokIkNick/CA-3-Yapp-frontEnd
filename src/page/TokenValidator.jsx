import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

//we can also deconstruct props after they are passed in:
//Lets say a user is being passed in as a prop, we can deconstruct it like this:
//const {name, age} = user;

//We can also pass it in as a prop and access it like this:
//If the props are passed in like this <TokenValidator user = "{name, age}">
//const TokenValidator = (props)
//{props.user.name}
export const TokenValidator = ({tokenIsValid, children}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(tokenIsValid === false){
      navigate("/login");
      console.log("Im in the token validator!, token is invalid!");
    }
  }, [tokenIsValid, navigate])

    if(tokenIsValid) return <>{children};</>
}

TokenValidator.propTypes = {
    children: PropTypes.node.isRequired,
    tokenIsValid: PropTypes.bool
}
