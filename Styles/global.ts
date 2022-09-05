import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background: ${(props) => props.theme['background']};
        color: ${(props) => props.theme['black']};
        -webkit-font-smoothing: antialised;
    }
    
    body, input-security, textarea, button{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 0.875rem;
    }
    
    button{
        background: ${(props) => props.theme['_dds__button-base']};
    }
    
    h1{
        font-size: 1.5rem;
    }

    h2{
        font-size: 1rem;
    }
    
`
