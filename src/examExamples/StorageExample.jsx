import React from 'react'

export const StorageExample = () => {
  return (
    <>
        <h1>Local and Session Storage Example:</h1>
        <button onClick={() => localStorage.setItem("Local Variable", "Local Storage")}>Set Local Storage</button>
        <button onClick={() => sessionStorage.setItem("Session Variable", "Session Storage")}>Set Session Storage</button>

        <button onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
        }}>Clear storage</button>
    </>
  )
}
