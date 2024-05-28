import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {

        /*Greens*/
        /*Background*/
        --green: #2D5A50;
        /*Accent Background*/
        --dark-green: #1E453C;

        /*Whites*/
        /*Text*/
        --offwhite: #F2F2F2;
        /*Accents*/
        --basewhite: #F3F3E4;
        

        /*Blacks*/
        /*Text*/
        --grey: #404A4F;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Roboto', 'sans-serif';
        background-color: var(--green);
    }
`;

export default GlobalStyles