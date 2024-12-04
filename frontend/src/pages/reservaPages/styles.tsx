import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
`;

export const Button = styled.button<{ red?: boolean }>`
  padding: 8px 12px;
  font-size: 16px;
  color: #fff;
  background-color: ${(props) => (props.red ? '#ff4d4f' : '#28a745')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.red ? '#e04a4d' : '#218838')};
  }
`;

export const ExpenseList = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ExpenseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-top: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const TotalExpenses = styled.h2`
  font-size: 20px;
  margin-top: 20px;
`;

// Estilos para o Modal de Confirmação de Exclusão
export const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  min-width: 300px;
  padding-left: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalButton = styled(Button)`
  margin: 10px;
  padding-left: 20px;
  margin-left: 20px;
`;

// Ajuste para os botões dentro do modal, para ficarem distantes
export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;  /* Espaco entre os botões */
  width: 100%;
`;

