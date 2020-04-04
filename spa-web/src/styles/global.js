import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font: 400 14px Roboto, sans-serif;
    background: #f0f0f5;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  form input {
    width: 100%;
    height: 60px;
    color: #333;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding: 0 24px;
    margin: 5px 0;
  }

  form textarea {
    width: 100%;
    min-height: 140px;
    color: #333;
    resize: vertical;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding: 16px 24px;
    margin: 5px 0px;
    line-height: 24px
  }

  .button {
    width: 100%;
    height: 60px;
    background: #e02041;
    border: 0;
    border-radius: 8px;
    color: #f0f0f5;
    font-weight: 700;
    margin-top: 6px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 60px;
    transition: filter(0.2s);

    &:hover {
      filter: brightness(90%)
    }

  }

  .error {
    color: #e02041;
    white-space: pre;
    margin: 10px 5px;
  }

`;
