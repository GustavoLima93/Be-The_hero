import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 030px;
  margin: 32px auto;

  h1 {
    margin-top: 80px;
    margin-bottom: 24px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    margin-left: 24px;
  }

  img {
    height: 64px;
  }

  a {
    width: 260px;
    margin-left: auto;
    margin-top: 0;
  }

  button {
    height: 60px;
    width: 60px;
    border-radius: 4px;
    border: 1px solid #dcdce6;
    background: transparent;
    margin-left: 16px;
    transition: border-color 0.2s;

    &:hover {
      border-color: #999;
    }
  }
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  list-style: none;
`;

export const Card = styled.li`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;

  button {
    position: absolute;
    right: 24px;
    top: 24px;
    border: 0;
    transition: opacity 0.2s;
    background: transparent;

    &:hover {
      opacity: 0.8;
    }
  }

  strong {
    display: block;
    margin-bottom: 16px;
    color: #41414d;
  }

  p + strong {
    margin-top: 32px;
  }

  p {
    color: #737380;
    line-height: 21px;
    font-size: 16px;
  }
`;

export const NextPage = styled.div`
  background: transparent;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #fff;
    border: none;
    margin: 20px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
      background: #41414d;
      svg {
        color: #fff !important;
      }
    }
  }

  strong {
    display: block;
    font-size: 22px;
    color: #41414d;
    font-weight: 400;
  }
`;
