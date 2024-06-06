import React from 'react'
import { render } from 'react-dom'




export const EventBubblingExample = () => {
  return (
    <>
        <ParentComponent />
    </>
  )
}


const ParentComponent = () => {

    const handleClickParent = () => {
        console.log('Parent Component clicked');
    }

    return (
        <>
        <div className='parent' onClick={handleClickParent}>
        <h1>Parent Component</h1>
        <ChildComponent />
        </div>
        <ListComponent />
        </>
    )
}

const ChildComponent = () => {

    const handleClickChild = (e) => {
        //e.stopPropagation();
        console.log('Child Component clicked');
    }

    return (
        <div className='child' onClick={handleClickChild}>
        <h1 className='child'>Child Component</h1>
        </div>
    )
}

const ListComponent = () => {
    const handleClickList = (e) => {
        console.log(`You clicked on ${e.target.textContent}`)
    }


    return (
        <ul onClick={handleClickList}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        </ul>
    )
}