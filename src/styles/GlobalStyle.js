import { createGlobalStyle } from 'styled-components';

import { transitions } from '.';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ::selection {
    background: ${({ theme }) => theme.global.textSelectionColor};
  }

  ::-moz-selection {
    background: ${({ theme }) => theme.global.textSelectionColor};
  }

  .grecaptcha-badge {
    z-index: 2000;
  }

  a, .linkStyle {
    color: ${({ theme }) => theme.htmlTags.a.color};
    cursor: pointer !important;
    display: inline-block;
    font-weight: ${({ theme }) => theme.htmlTags.a.fontWeight};
    text-decoration: none;
    transition: transform ${transitions.speed.superfast} linear;

    &:focus {
      outline: none;
    }

    &:focus,
    &:hover {
      text-decoration: underline;
    }

    &:active {
      transform: translateY(2px);
    }
  }

  blockquote {
    background-color: ${({ theme }) => theme.htmlTags.blockquote.bgColor};
    border: 0;
    border-color: ${({ theme }) => theme.htmlTags.blockquote.borderLeftColor};
    border-left-width: ${({ theme }) =>
      theme.htmlTags.blockquote.borderLeftWidth};
    border-style: solid;
    color: ${({ theme }) => theme.htmlTags.blockquote.textColor};
    font-family: Arial;
    font-size: ${({ theme }) => theme.htmlTags.blockquote.textFontSize};
    font-style: italic;
    margin: 0;
    padding: 20px 5px 20px 60px;
    position: relative;
  }

  blockquote::before {
    color: ${({ theme }) => theme.htmlTags.blockquote.quoteColor};
    content: '“';
    font-size: ${({ theme }) => theme.htmlTags.blockquote.quoteFontSize};
    left: 10px;
    position: absolute;
    top: 5px;
  }

  blockquote::after {
    content: '';
  }

  body {
    background: ${({ theme }) => theme.htmlTags.body.background};
    background-attachment: fixed;
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.htmlTags.body.color};
    filter: ${({ theme }) => theme.htmlTags.body.filter};
    font-family: ${({ theme }) => theme.htmlTags.body.fontFamily};
    font-size: ${({ theme }) => theme.htmlTags.body.fontSize};
    height: 100%;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.htmlTags.h.color};
    margin-bottom: 25px;
    margin-top: 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.htmlTags.h1.fontSize};
  }

  h2 {
    font-size: ${({ theme }) => theme.htmlTags.h2.fontSize};
  }

  h3 {
    font-size: ${({ theme }) => theme.htmlTags.h3.fontSize};
  }

  h4 {
    font-size: ${({ theme }) => theme.htmlTags.h4.fontSize};
  }

  h5 {
    font-size: ${({ theme }) => theme.htmlTags.h5.fontSize};
  }

  h6 {
    font-size: ${({ theme }) => theme.htmlTags.h6.fontSize};
  }

  html {
    height: 100%;
  }

  input {
    color: ${({ theme }) => theme.htmlTags.input.color};
  }

  p {
    line-height: 1.5;
    margin-bottom: 25px;
    margin-top: 0;
  }

  textarea {
    color: ${({ theme }) => theme.htmlTags.textarea.color};
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 15px;
  }

  ul li::before {
    content: '•';
    display: inline-block;
    font-size: 1.4em;
    font-weight: bold;
    line-height: 0.8em;
    position: absolute;
  }

  ul li > * {
    padding-left: 1em;
  }
`;

export default GlobalStyle;
