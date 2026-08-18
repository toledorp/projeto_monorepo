import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from './config/database';
import { User } from "./modesl/User";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000

//Middleware
app.use(cors());
app.use(express.json());

//Routes de health check
app.get("/api/health",  (req: Request, res: Response) => {
    res.status(200).json({ 
        status: 'OK',
        message: 'Servidor Backend rodando com sucesso',
        timestamp: new Date().toISOString()
    });
});

//Rota Cadastro novo Usuario
app.post ('/api/users', async (req: Request, res: Response) => {
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

//Rota Listar todos os usuarios
app.get ('/api/users', async (req: Request, res:Response) => {
    try {
        const usuarios = await User.findAll({
            attributes: ['id', 'nome', 'email', 'createdAt']
        })
        return res.status(200).json(usuarios);
        
    } catch (error: any) {
        return res.status(500).json({error: 'Erro ao listar os Usuario.', detalhe: error.message})        
    }
})

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o PostgreSQL no supabase realizada com sucesso.')

        app.listen(port, () =>{
            console.log(`Servidor rodando na porta ${port}`);
            console.log(`Healt Check disponivel em? http://localhost:${port}/api/health`);
        });

    } catch (error) {
        console.log('Erro ao conectar com o banco de dados: ', error);
    }
}


main();
