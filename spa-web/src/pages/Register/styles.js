import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Content = styled.div`
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  section {
    width: 100%;
    max-width: 380px;

    img {
      margin-bottom: 40px;
      display: flex;
      align-items: flex-start;
    }

    h1 {
      margin: 64px 0 32px;
      font-size: 32px;
    }

    p {
      font-size: 18px;
      color: #737380;
      line-height: 32px;
    }

    a {
      display: flex;
      align-items: center;
      margin-top: 40px;
      color: #41414d;
      font-size: 18px;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s;
      margin-bottom: 10px;

      &:hover {
        opacity: 0.8;
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const Formulario = styled.div`
  max-width: 500px;
`;

export const Group = styled.div`
  display: flex;
`;

export const State = styled.div`
  margin-right: 20px;
  width: 100%;

  input {
    width: 100%;
  }
`;

export const UF = styled.div`
  width: 100px;

  input {
    width: 100%;
  }
`;
