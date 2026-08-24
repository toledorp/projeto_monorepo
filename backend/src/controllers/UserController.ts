import { Request, Response } from "express";
import { User} from "../models/User";

export class UserController{
    // GET /api/users - Lista todos os usuários
    public static async index(req: Request, res: Response): Promise<Response>{
        try{
            const users = await User.findAll({
                attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt']
            });
            return res.status(200).json(users);

        } catch(error: any){
            return res.status(500).json({erro: 'Erro ao listar usuários.', detalhe: error.message})
        }
    }

    // GET /api/users/:id - Busca um usuário
    public static async show(req: Request, res: Response): Promise<Response>{
        try{
            const {id} = req.params;

            const user = await User.findByPk(Number(id), {
                attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt']
            });

            if(!user){
                return res.status(404).json({erro: 'Usuário não encontrado.'})
            } else{
                return res.status(200).json(user);
            }

        } catch(error: any){
            return res.status(500).json({erro: 'Erro ao buscar usuário.', detalhe: error.message})
        }
    }

    // POST /api/users/ - Cria um usuário
    public static async create(req: Request, res: Response): Promise<Response>{
        try{
            const {nome, email, senha_hash} = req.body;

            if(!nome || !email || !senha_hash){
                return res.status(400).json({erro: 'Os campos nome, email e senha são obrigatórios.'})
            }

            const novoUser = await User.create({
                nome, email, senha_hash
            });

            return res.status(201).json({
                nome: novoUser.nome, 
                email: novoUser.email, 
                senha_hash: novoUser.senha_hash
            });

        } catch(error: any){
            return res.status(500).json({erro: 'Erro ao criar usuário.', detalhe: error.message})
        }
    }

    // PUT /api/users/:id - Atualiza um usuário
    public static async update(req: Request, res: Response): Promise<Response>{
        try{
            const {id} = req.params;
            const {nome, email, senha_hash} = req.body;

            const user = await User.findByPk(Number(id));

            if(!user){
                return res.status(404).json({erro: 'Usuário não encontrado.'});
            }

            if(nome) user.nome = nome;
            if(email) user.email = email;
            if(senha_hash) user.senha_hash = senha_hash;

            await user.save();

            return res.status(200).json({
                id: user.id,
                nome: user.nome,
                email: user.email,
                senha_hash: user.senha_hash
            })

        } catch(error: any){
            return res.status(500).json({erro: 'Erro ao editar usuário.', detalhe: error.message})
        }
    }

    // DELETE /api/users/:id - deleta um usuário
    public static async delete(req: Request, res: Response): Promise<Response>{
        try{
            const {id} = req.params;

            const user = await User.findByPk(Number(id));

            if(!user){
                return res.status(404).json({erro: 'Usuário não encontrado.'})
            }
            await user.destroy();

            return res.status(204).send();
        } catch(error: any){
            return res.status(500).json({erro: 'Erro ao excluir usuário.', detalhe: error.message})
        }
    }


}