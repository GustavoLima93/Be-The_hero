import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Input from '../../Components/Input';
import InputMask from '../../Components/Input-Mask';

import logo from '../../assets/logo.svg';
import { Container, Content, Formulario, Group, UF, State } from './styles';

import api from '../../services/api';

/** Schema valdiation  */

const schema = Yup.object().shape({
  name: Yup.string().required('Nome da ONG é obrigatório'),
  email: Yup.string()
    .email()
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Mínima 6 caracteres')
    .required('Password é obrigatório'),
  whatsapp: Yup.string().required('Whatsapp é obrigatório'),
  city: Yup.string().required('Cidade é obrigatório'),
  uf: Yup.string().required('UF é obrigatório'),
});

/** FIM Schema valdiation  */

export default function Register() {
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      createOngAccount(data);
    } catch (error) {
      const validationErrors = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  async function createOngAccount({
    name,
    email,
    password,
    whatsapp,
    city,
    uf,
  }) {
    try {
      const response = await api.post('/ongs', {
        name,
        email,
        password,
        whatsapp,
        city,
        uf,
      });
      toast.success(`Cadastro com ID ${response.data.id} criado com sucesso.`);
      history.push('/');
    } catch (error) {
      const err = (error.response && error.response.data) || '';
      toast.error(err.error || 'Ocorreu um erro');
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={logo} alt="logo be the hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ong
          </p>
          <Link to="/">
            <FiLogIn color="#e02041" size={16} /> Já tenho login
          </Link>
        </section>
        <Formulario>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" type="text" placeholder="Nome da ONG" />
            <Input name="email" type="email" placeholder="E-mail" />
            <Input name="password" type="password" placeholder="Senha" />

            <InputMask
              mask="(99)99999-9999"
              name="whatsapp"
              type="text"
              placeholder="Whatsapp"
            />

            <Group>
              <State>
                <Input
                  name="city"
                  className="state"
                  type="text"
                  placeholder="Cidade"
                />
              </State>
              <UF>
                <Input name="uf" className="uf" type="text" placeholder="UF" />
              </UF>
            </Group>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </Formulario>
      </Content>
    </Container>
  );
}
