import { Router, Request, Response } from "express";
import  Reserva  from "./Reserva";

const router = Router();

router.use("/reserva", Reserva)

router.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default router;
