import { Router } from "express";
import { userRoutes } from "./userRoutes";

const router = Router();

//Registrar as rotas de usuários sob prefuxo / users
router.use('/users', userRoutes);

export { router as appRoutes};

