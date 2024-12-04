// src/components/ReservaList.tsx
import React, { useEffect, useState } from 'react';
import { listReserva } from '../service/api';


const ReservaList = () => {
  const [reservas, setReservas] = useState<any[]>([]);
  const [contato, setContato] = useState('');
  const [numeroMesa, setNumeroMesa] = useState('');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const { data } = await listReserva({ contato, numeroMesa });
        setReservas(data.reservas);
      } catch (error) {
        console.error('Erro ao listar reservas', error);
      }
    };

    fetchReservas();
  }, [contato, numeroMesa]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por Contato"
        value={contato}
        onChange={(e) => setContato(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filtrar por Número de Mesa"
        value={numeroMesa}
        onChange={(e) => setNumeroMesa(e.target.value)}
      />
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva._id}>
            {reserva.cliente} - {reserva.numeroMesa} - {reserva.date} - {reserva.status} - {reserva.contato}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaList;
