import React, { useState, useEffect } from 'react';
import { Container, Title, Form, Input, Button, DeleteModal, ModalContent, ModalButton, ModalButtonContainer } from './styles';
import { createReserva, listReserva, deleteReserva, updateReserva, listDistinctByContato, listDistinctByMesa } from '../../service/api';
import moment from 'moment';

const RegisterReserva: React.FC = () => {
  const [cliente, setCliente] = useState('');
  const [contato, setContato] = useState('');
  const [mesa, setMesa] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('Confirmada'); // Novo estado para status da reserva
  const [reservas, setReservas] = useState<any[]>([]);
  const [filteredReservas, setFilteredReservas] = useState<any[]>([]); // Estado para armazenar as reservas filtradas
  const [distinctContatos, setDistinctContatos] = useState<string[]>([]); // Para armazenar os contatos distintos
  const [distinctMesas, setDistinctMesas] = useState<number[]>([]); // Para armazenar as mesas distintas
  const [editingReserva, setEditingReserva] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchReservas() {
      try {
        const response = await listReserva({});
        setReservas(response.data.reservas);
        setFilteredReservas(response.data.reservas); // Inicializa as reservas filtradas
      } catch (error) {
        console.error("Erro ao carregar as reservas", error);
      }
    }
    fetchReservas();
  }, []);


  

  // Função para adicionar nova reserva
  const handleAddReserva = async () => {
    if (cliente && contato && mesa && data) {
      const formattedDate = moment(data).format('YYYY-MM-DD');
      const reservaData = { cliente, numeroMesa: mesa, date: formattedDate, status, contato };

      try {
        const response = await createReserva(reservaData);
        if (response.status === 201) {
          setMessage('Reserva criada com sucesso!');
          setReservas([...reservas, response.data.reserva]);
          resetForm();
        }
      } catch (error) {
        console.error('Erro ao adicionar reserva:', error);
        setMessage('Erro ao criar a reserva. Tente novamente.');
      }
      setModalVisible(true);
    }
  };

  // Função para editar reserva
  const handleEditReserva = (reserva: any) => {
    setEditingReserva(reserva);
    setCliente(reserva.cliente);
    setContato(reserva.contato);
    setMesa(reserva.numeroMesa);
    setData(reserva.date);
    setStatus(reserva.status); // Preenche o campo de status com o valor da reserva
  };

  // Função para atualizar a reserva
  const handleUpdateReserva = async () => {
    if (editingReserva && cliente && contato && mesa && data) {
      const formattedDate = moment(data).format('YYYY-MM-DD');
      const updatedReserva = { cliente, numeroMesa: mesa, date: formattedDate, status, contato };

      try {
        const response = await updateReserva(editingReserva._id, updatedReserva);
        if (response.status === 200) {
          const updatedReservas = reservas.map((reserva) =>
            reserva._id === editingReserva._id ? { ...reserva, ...updatedReserva } : reserva
          );
          setReservas(updatedReservas);
          setMessage('Reserva atualizada com sucesso!');
          setModalVisible(true);
          resetForm();
        }
      } catch (error) {
        console.error('Erro ao atualizar reserva:', error);
        setMessage('Erro ao atualizar a reserva. Tente novamente.');
        setModalVisible(true);
      }
    }
  };

  // Função para excluir reserva
  const handleDelete = async (id: string) => {
    try {
      await deleteReserva(id);
      setReservas(reservas.filter((reserva) => reserva._id !== id));
      setMessage('Reserva excluída com sucesso!');
      setModalVisible(true);
    } catch (error) {
      setMessage('Erro ao excluir a reserva. Tente novamente.');
      setModalVisible(true);
    }
  };

  // Função para resetar o formulário
  const resetForm = () => {
    setCliente('');
    setContato('');
    setMesa('');
    setData('');
    setStatus('Confirmada'); // Resetando o status
    setEditingReserva(null);
  };

  // Função para aplicar os filtros
  const applyFilters = () => {
    let filtered = reservas;

    // Filtrar por contato
    if (contato) {
      filtered = filtered.filter((reserva) => reserva.contato === contato);
    }

    // Filtrar por mesa
    if (mesa) {
      filtered = filtered.filter((reserva) => reserva.numeroMesa === parseInt(mesa));
    }

    setFilteredReservas(filtered);
  };

  useEffect(() => {
    // Aplicar filtro sempre que 'contato' ou 'mesa' mudar
    applyFilters();
  }, [contato, mesa]);

  return (
    <Container>
      <Title>Registrar Reserva</Title>
      <Form>
        <Input
          type="text"
          placeholder="Nome do Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        
        {/* Dropdown para contato */}
        <select value={contato} onChange={(e) => setContato(e.target.value)}>
          <option value="">Selecione o Contato</option>
          {distinctContatos.map((contatoItem) => (
            <option key={contatoItem} value={contatoItem}>
              {contatoItem}
            </option>
          ))}
        </select>

        {/* Dropdown para o número da mesa */}
        <select value={mesa} onChange={(e) => setMesa(e.target.value)}>
          <option value="">Selecione a Mesa</option>
          {distinctMesas.map((mesaNum) => (
            <option key={mesaNum} value={mesaNum}>
              Mesa {mesaNum}
            </option>
          ))}
        </select>

        <Input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        {/* Dropdown para o status */}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Reservado">Reservado</option>
          <option value="Ocupado">Ocupado</option>
          <option value="Disponível">Disponível</option>
        </select>
        {editingReserva ? (
          <Button onClick={handleUpdateReserva}>Atualizar Reserva</Button>
        ) : (
          <Button onClick={handleAddReserva}>Cadastrar Reserva</Button>
        )}
      </Form>

      {modalVisible && (
        <DeleteModal>
          <ModalContent>
            <h2>{message}</h2>
            <ModalButtonContainer>
              <ModalButton onClick={() => setModalVisible(false)}>Fechar</ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </DeleteModal>
      )}

      <Title>Reservas Existentes</Title>
      <div>
        {filteredReservas.map((reserva) => (
          <div key={reserva._id}>
            <p><strong>{reserva.cliente}</strong> - Mesa {reserva.numeroMesa}</p>
            <p>Data: {moment(reserva.date).format('YYYY-MM-DD')}</p> {/* Exibindo a data formatada */}
            <p>Status: {reserva.status}</p>
            <p>Contato: {reserva.contato}</p>

            {/* Botões para Excluir e Editar */}
            <Button onClick={() => handleDelete(reserva._id)}>Excluir</Button>
            <Button onClick={() => handleEditReserva(reserva)}>Editar</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RegisterReserva;
