import { Router } from "express";
import { reservaController } from "../controller";


const router = Router();

router.post("/criarevento", reservaController.createReserva);
router.get("/listareserva", reservaController.listReserva);
router.get("/listacontato", reservaController.listDistinctByContato);
router.get("/listamesa", reservaController.listDistinctByMesa);
router.put("/atualizareserva/:_id", reservaController.updateReserva);
router.delete("/deletereserva/:_id", reservaController.deleteReserva);

export default router;

