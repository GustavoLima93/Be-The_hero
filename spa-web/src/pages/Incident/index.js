import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

import logo from '../../assets/logo.svg';
import Input from '../../Components/Input';
import InputMask from '../../Components/Input-Mask';
import TextArea from '../../Components/Text-Area';
import { Container, Content, Formulario } from './styles';

import api from '../../services/api';

/** Schema valdiation  */

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  value: Yup.string().required('Valor obrigatório'),
});

/** FIM Schema valdiation  */

export default function Incident() {
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      createIncident(data);
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

  async function createIncident({ title, description, value }) {
    try {
      const regex = /[0-9]/gm;
      const valueDeseralize = value.match(regex).join('');

      await api.post('/incidents', {
        title,
        description,
        value: valueDeseralize,
      });

      toast.success('Incidente cadastrado com sucesso');
    } catch (error) {
      const err = (error.response && error.response.data) || '';
      toast.error(err.error || 'Ocorreu um erro');
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        history.push('/');
      }
    }
  }

  return (
    <Container>
      <Content>
        <section>
          <img src={logo} alt="logo be the hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link to="/profile">
            <FiArrowLeft color="#e02041" size={16} /> Voltar para home
          </Link>
        </section>
        <Formulario>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="title" type="text" placeholder="Titulo do caso" />
            <TextArea name="description" type="text" placeholder="Descrição" />
            <InputMask
              mask="9999999"
              name="value"
              type="text"
              placeholder="Valor em reais"
            />

            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </Formulario>
      </Content>
    </Container>
  );
}
