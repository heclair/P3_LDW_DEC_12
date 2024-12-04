// src/components/MesaList.tsx
import React, { useEffect, useState } from 'react';
import { listDistinctByMesa } from '../service/api';


const MesaList = () => {
  const [mesas, setMesas] = useState<number[]>([]);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const { data } = await listDistinctByMesa();
        setMesas(data.mesa);
      } catch (error) {
        console.error('Erro ao listar mesas', error);
      }
    };

    fetchMesas();
  }, []);

  return (
    <div>
      <h3>Mesas Distintas</h3>
      <ul>
        {mesas.map((mesa) => (
          <li key={mesa}>{mesa}</li>
        ))}
      </ul>
    </div>
  );
};

export default MesaList;
