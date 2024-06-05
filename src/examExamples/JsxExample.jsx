import React from 'react'

export const JsxExample = () => {
  //This is an example of JSX vs HTML:

    const name = "Nicklas";
    //HTML
    const HtmlElement = document.createElement('h1');
    HtmlElement.className = 'greeting';
    HtmlElement.textContent = 'Hello, ' + name + '!';

    //JSX
    const JsxElement = <h1 className='greeting'>Hello, {name}!</h1>
    
    return (
    <>
        {JsxElement}
        {/*HtmlElement*/}
    </>
  )
}
