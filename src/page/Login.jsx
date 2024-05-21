import React from 'react'

const Container = div.styled`
    display: flex;
    justify-content: center;
    align-items: center;
`


export const Login = () => {
  return (
    <>
        <div>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
                <button type="button">Forgot password?</button>
            </form>
            <div>
                <p>Don't have an account?</p>
                <button type="button">Sign up here</button>
            </div>
        </div>
    </>
  )
}
