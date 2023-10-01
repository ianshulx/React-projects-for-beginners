import { createGlobalStyle } from 'styled-components';
import 'typeface-open-sans';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.typography.mainFont};
        font-size: ${({ theme }) => theme.typography.baseFont};
    }

    body {
        color: ${({ theme }) => theme.typography.colorFont};
        background: ${({ theme }) => theme.typography.backColor}
    }

    img{
        max-width: 100%;
    }
`;

export default GlobalStyle;
