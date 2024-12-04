// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/reserva', // URL do backend
});

export const createReserva = (data: any) => api.post('/criarevento', data);
export const listReserva = (params: any) => api.get('/listareserva', { params });
export const listDistinctByContato = () => api.get('/listacontato');
export const listDistinctByMesa = () => api.get('/listamesa');
export const updateReserva = (id: string, data: any) => api.put(`/atualizareserva/${id}`, data);
export const deleteReserva = (id: string) => api.delete(`/deletereserva/${id}`);

export default api;
