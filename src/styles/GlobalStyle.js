import { createGlobalStyle } from 'styled-components';

import theme from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    color: ${theme.htmlTags.a.color};
    cursor: pointer !important;
    font-weight: ${theme.htmlTags.a.fontWeight}
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  body {
    @import url('https://fonts.googleapis.com/css?family=Alegreya+Sans:100,300,400,500,700,800,900');
    background: ${theme.htmlTags.body.background};
    color: ${theme.htmlTags.body.color};
    font-family: ${theme.htmlTags.body.fontFamily};
    font-size: ${theme.htmlTags.body.fontSize};
    height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.htmlTags.h.color};
    margin-bottom: 25px;
    margin-top: 0;
  }

  p {
    line-height: 1.4;
    margin-bottom: 25px;
    margin-top: 0;
  }
`;

export default GlobalStyle;
