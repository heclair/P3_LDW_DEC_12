import mongoose, { Schema, Document } from 'mongoose';

// Definindo a interface para o Tipo TypeScript
interface IPedido extends Document {
  cliente: string;
  numeroMesa: number;
  date: Date;
  status: string;
  contato: string;
}

// Definindo o esquema de dados para o modelo "Pedido"
const ReservaSchema: Schema = new Schema({
  cliente: { 
    type: String, 
    required: true 
  },
  numeroMesa: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date 
  },
  status: { 
    type: String, 
    required: true 
  },
  contato: { 
    type: String, 
    required: true 
  }
});

// Criando o modelo baseado no esquema
const ReservaModel = mongoose.model('Reserva', ReservaSchema);

export default ReservaModel;

