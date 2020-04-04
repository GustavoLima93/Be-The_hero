/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';

import Input from '../../Components/Input';

import api from '../../services/api';

import { Container, Section, Formulario } from './styles';

export default function logon() {
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      history.push('/profile');
    } catch (error) {
      const err = (error.response && error.response.data) || '';
      toast.error(err.error || 'Ocorreu um erro');
    }
  }

  return (
    <Container>
      <Section>
        <Formulario>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logo} alt="Logo" />
            <h1>Faça seu logon</h1>
            <Input name="email" placeholder="Email" type="email" />
            <Input name="password" placeholder="Password" type="password" />
            <button className="button" type="submit">
              Entrar
            </button>
            <Link to="/register">
              <FiLogOut color="#e02041" size={16} /> Não tenho login
            </Link>
          </Form>
        </Formulario>
      </Section>
      <img src={heroes} alt="Heroes" />
    </Container>
  );
}
