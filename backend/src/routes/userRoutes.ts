import { Router, Request, Response } from "express";
import { User } from "../modesl/User";
import { error } from "node:console";

const router = Router();

//GET /api/users - listar todos os usuarios
router.get ('/', async (req: Request, res:Response) => {
    try {
        const usuarios = await User.findAll({
            attributes: ['id', 'nome', 'email', 'createdAt']
        })
        return res.status(200).json(usuarios);
        
    } catch (error: any) {
        return res.status(500).json({error: 'Erro ao listar os Usuario.', detalhe: error.message})        
    }
});

//GET /api/users/:id - listar um usuarios por id
router.get ('/:id', async (req: Request, res:Response) => {
    try {
        const { id } = req.params;
        
        const usuario = await User.findByPk(number(id),{
            attributes: ['id', 'nome', 'email', 'createdAt']
        });

        if(!usuario){
            return res.status(400).json({error: "usuario não cadastrado. "});
        }

        return res.status(200).json(usuario)
    } catch (error: any) {
        return res.status(500).json({error: 'Erro ao buscar Usuario.', detalhe: error.message})        
    }
    
}



// POST /api/users - Cadastrar um novo usuarios
router.post ('/', async (req: Request, res: Response) => {
    try {
        const {nome, email, senha_hash} = req.body;
        
        if(!nome || !email || !senha_hash) {
            return res.status(400).json({error: 'nome, email e senha_hash são obrigatorios.'})
        }
        
        const novoUsuario = await User.create({nome, email, senha_hash});
        return res.status(201).json(novoUsuario)

    } catch (error: any) {
        return res.status(500).json({error: 'Erro ao cadastrar Usuario.', detalhe: error.message})        
    }
});



export { router as userRoutes}