import { createGlobalStyle } from 'styled-components';

import theme from './theme';
import { transition } from '.';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${theme.global.textSelectionColor};
  }

  ::-moz-selection {
    background: ${theme.global.textSelectionColor};
  }

  a {
    color: ${theme.htmlTags.a.color};
    cursor: pointer !important;
    font-weight: ${theme.htmlTags.a.fontWeight}
    text-decoration: none;
    transition: transform ${transition.speed.superfast} linear;

    &:active {
      transform: translateY(2px);
    }

    &:hover {
      text-decoration: underline;
    }
  }

  body {
    @import url('https://fonts.googleapis.com/css?family=Alegreya+Sans:100,300,400,500,700,800,900');
    background: ${theme.htmlTags.body.background};
    background-attachment: fixed;
    background-repeat: no-repeat;
    color: ${theme.htmlTags.body.color};
    font-family: ${theme.htmlTags.body.fontFamily};
    font-size: ${theme.htmlTags.body.fontSize};
    height: 100%;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.htmlTags.h.color};
    margin-bottom: 25px;
    margin-top: 0;
  }

  h1 {
    font-size: ${theme.htmlTags.h1.fontSize};
  }

  h2 {
    font-size: ${theme.htmlTags.h2.fontSize};
  }

  h3 {
    font-size: ${theme.htmlTags.h3.fontSize};
  }

  h4 {
    font-size: ${theme.htmlTags.h4.fontSize};
  }

  h5 {
    font-size: ${theme.htmlTags.h5.fontSize};
  }

  h6 {
    font-size: ${theme.htmlTags.h6.fontSize};
  }

  html {
    height: 100%;
  }

  input {
    color: ${theme.htmlTags.input.color};
  }

  p {
    font-size: ${theme.htmlTags.p.fontSize};
    line-height: 1.5;
    margin-bottom: 25px;
    margin-top: 0;
  }

  textarea {
    color: ${theme.htmlTags.textarea.color};
  }
`;

export default GlobalStyle;
