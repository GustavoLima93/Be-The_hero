import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Container, Header, List, Card, NextPage } from './styles';
import { FiPower, FiTrash2, FiDownload } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

const alert = withReactContent(Swal);

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const name = localStorage.getItem('name');
  const history = useHistory();

  useEffect(() => {
    async function getIncidents() {
      try {
        const data = await getInicdentsApi();
        setIncidents(data);
      } catch (error) {
        const err = (error.response && error.response.data) || '';
        toast.error(err.error || 'Ocorreu um erro');
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          history.push('/');
        }
      }
    }
    getIncidents();
  }, []);

  async function getInicdentsApi(page = 1) {
    const response = await api.get('/incidents', { params: { page } });
    setLastPage(Math.floor(response.headers['x-total-count'] / 5));
    response.data.forEach(el => {
      el.format = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(el.value);
    });

    return response.data;
  }

  async function handleDelete(id, title) {
    const { value } = await alert.fire({
      title: 'Deletar',
      text: `Gostaria de deletar o incidente ${title} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    });

    if (value) {
      try {
        await api.delete(`/incidents/${id}`);
        const data = incidents.filter(incident => incident.id !== id);
        setIncidents(data);
        toast.success('Deletado com sucesso');
      } catch (error) {
        const err = (error.response && error.response.data) || '';
        toast.error(err.error || 'Ocorreu um erro');
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          history.push('/');
        }
      }
    }
  }

  async function handleNextPage() {
    try {
      const next = page + 1;

      setPage(next);
      const data = await getInicdentsApi(next);

      setIncidents([...incidents, ...data]);
    } catch (error) {}
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <Container>
      <Header>
        <img src={logo} alt="Logo the be hero" />
        <span>Bem vinda, {name}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button
          onClick={() => {
            handleLogout();
          }}
          type="button"
        >
          <FiPower size={18} color="#e02041" />
        </button>
      </Header>
      <h1>Casos cadastrados</h1>

      <List>
        {incidents.map(incident => (
          <Card key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>Descrição:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>{incident.format}</p>
            <button
              onClick={() => handleDelete(incident.id, incident.title)}
              type="buttons"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </Card>
        ))}
      </List>
      {page < lastPage ? (
        <NextPage>
          <button onClick={() => handleNextPage()} type="button">
            <FiDownload size={50} color="#e02041" />
          </button>
          <strong> + Incidentes</strong>
        </NextPage>
      ) : null}
    </Container>
  );
}
