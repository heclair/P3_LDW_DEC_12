// src/components/ReservaForm.tsx
import { type } from 'os';
import React, { useState } from 'react';
import { createReserva } from '../service/api';


const ReservaForm = () => {
  const [cliente, setCliente] = useState('');
  const [numeroMesa, setNumeroMesa] = useState(1);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [contato, setContato] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reservaData = { cliente, numeroMesa, date, status, contato };

    try {
      await createReserva(reservaData);
      alert('Reserva criada com sucesso!');
    } catch (error) {
      alert('Erro ao criar reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Número da Mesa"
        value={numeroMesa}
        onChange={(e) => setNumeroMesa(parseInt(e.target.value))}
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Contato"
        value={contato}
        onChange={(e) => setContato(e.target.value)}
        required
      />
      <button type="submit">Criar Reserva</button>
    </form>
  );
};

export default ReservaForm;
