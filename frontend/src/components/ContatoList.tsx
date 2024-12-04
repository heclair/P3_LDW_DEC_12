// src/components/ContatoList.tsx
import React, { useEffect, useState } from 'react';
import { listDistinctByContato } from '../service/api';


const ContatoList = () => {
  const [contatos, setContatos] = useState<string[]>([]);

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const { data } = await listDistinctByContato();
        setContatos(data.contatos);
      } catch (error) {
        console.error('Erro ao listar contatos', error);
      }
    };

    fetchContatos();
  }, []);

  return (
    <div>
      <h3>Contatos Distintos</h3>
      <ul>
        {contatos.map((contato) => (
          <li key={contato}>{contato}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContatoList;
