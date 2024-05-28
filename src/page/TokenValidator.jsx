import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const TokenValidator = ({tokenIsValid, children}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(tokenIsValid === false){
      navigate("/login");
    }
  }, [tokenIsValid, navigate])

    if(tokenIsValid) return <>{children};</>
}

TokenValidator.propTypes = {
    children: PropTypes.node.isRequired,
    tokenIsValid: PropTypes.bool
}
