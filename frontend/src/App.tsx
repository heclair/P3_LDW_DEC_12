import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Atualizado para versão 6
import ContatoList from './components/ContatoList';
import MesaList from './components/MesaList';

import ReservaList from './components/ReservaList';
import RegisterReserva from './pages/reservaPages/reservaPages';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="title">Gestão de Reservas</h1>

        <Routes>  {/* Substituindo o Switch por Routes */}
          <Route path="/reservas" element={<ReservaList />} />
          <Route path="/contatos" element={<ContatoList />} />
          <Route path="/mesas" element={<MesaList />} />
          <Route path="/" element={<RegisterReserva />} />  {/* Ajustado para usar a nova tela de registro de reserva */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
