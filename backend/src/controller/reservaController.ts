import { Request, Response } from 'express'; // Para lidar com os objetos de requisição e resposta do Express
import ReservaModel from '../models/ReservaModel';


class ReservaController {
  // Método para criar uma nova reserva
  static async createReserva(req: Request, res: Response): Promise<Response> {
    // Extraindo os dados da requisição
    const { cliente, numeroMesa, date, status, contato } = req.body;

    console.log('Dados recebidos no servidor:', req.body);

    try {
      // Criando uma nova instância do modelo Reserva
      const novaReserva = new ReservaModel({
        cliente,
        numeroMesa,
        date,
        status,
        contato
      });

      console.log(novaReserva)

      // Salvando a nova reserva no banco de dados
      const reservaSalva = await novaReserva.save();

      // Retornando uma resposta de sucesso com os dados da reserva criada
      return res.status(201).json({
        message: 'Reserva criada com sucesso!',
        reserva: reservaSalva
      });
    } catch (error: any) {
      // Em caso de erro, retornando uma resposta de erro
      return res.status(500).json({
        message: 'Erro ao criar reserva',
        error: error.message
      });
    }
  }

  static async listReserva(req: Request, res: Response): Promise<Response> {
    const { numeroMesa, contato } = req.query;

    try {
      // Criando um objeto de filtro
      const filter: any = {};

      // Adicionando filtro por numeroMesa, se fornecido
      if (numeroMesa) {
        filter.numeroMesa = numeroMesa;
      }

      // Adicionando filtro por contato, se fornecido
      if (contato) {
        filter.contato = contato;
      }

      // Consultando as reservas com base no filtro
      const reservas = await ReservaModel.find(filter);

      // Verificando se há reservas encontradas
      if (reservas.length === 0) {
        return res.status(404).json({
          message: 'Nenhuma reserva encontrada com os critérios fornecidos.'
        });
      }

      // Retornando as reservas encontradas
      return res.status(200).json({
        message: 'Reservas encontradas com sucesso!',
        reservas
      });
    } catch (error: any) {
      // Em caso de erro, retornando uma resposta de erro
      return res.status(500).json({
        message: 'Erro ao listar reservas',
        error: error.message
      });
    }
  }

  static async updateReserva(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;  // Pega o _id da reserva da URL
    const { cliente, numeroMesa, date, status, contato } = req.body; // Dados para atualização

    try {
      // Tentando encontrar e atualizar a reserva com o _id fornecido
      const reservaAtualizada = await ReservaModel.findByIdAndUpdate(
        _id, // O _id da reserva
        { cliente, numeroMesa, date, status, contato }, // Dados para atualizar
        { new: true } // Retorna o documento atualizado
      );

      // Verificando se a reserva foi encontrada
      if (!reservaAtualizada) {
        return res.status(404).json({
          message: 'Reserva não encontrada.'
        });
      }

      // Retornando a resposta com a reserva atualizada
      return res.status(200).json({
        message: 'Reserva atualizada com sucesso!',
        reserva: reservaAtualizada
      });
    } catch (error: any) {
      // Em caso de erro, retornando uma resposta de erro
      return res.status(500).json({
        message: 'Erro ao atualizar reserva',
        error: error.message
      });
    }
  }

  static async deleteReserva(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;  // Pega o _id da reserva da URL

    try {
      // Tentando encontrar e excluir a reserva com o _id fornecido
      const reservaDeletada = await ReservaModel.findByIdAndDelete(_id);

      // Verificando se a reserva foi encontrada e excluída
      if (!reservaDeletada) {
        return res.status(404).json({
          message: 'Reserva não encontrada.'
        });
      }

      // Retornando a resposta com sucesso
      return res.status(200).json({
        message: 'Reserva excluída com sucesso!',
        reserva: reservaDeletada
      });
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao excluir reserva',
        error: error.message
      });
    }
  }

  static async listDistinctByContato(req: Request, res: Response): Promise<Response> {
    try {
      // Usando o método distinct para pegar os contatos únicos
      const contatosDistintos = await ReservaModel.distinct("contato");

      return res.status(200).json({
        message: 'Contatos distintos encontrados com sucesso!',
        contatos: contatosDistintos
      });
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao listar contatos distintos',
        error: error.message
      });
    }
  }

  static async listDistinctByMesa(req: Request, res: Response): Promise<Response> {
    try {
      // Usando o método distinct para pegar os contatos únicos
      const mesaDistinto = await ReservaModel.distinct("numeroMesa");

      return res.status(200).json({
        message: 'Contatos distintos encontrados com sucesso!',
        mesa: mesaDistinto
      });
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao listar contatos distintos',
        error: error.message
      });
    }
  }

}

export default ReservaController; // Exportando uma instância única da classe
