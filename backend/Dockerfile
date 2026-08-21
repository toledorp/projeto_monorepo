#define a imagem de origem base
FROM node:24-alpine

#Define diretorio de trabalho interno do container
WORKDIR /app

#Instalar o pnpm globalmente para genrenciaer as dependencias
RUN npm install -g pnpm@11.20

#Desativa a restrição do pnpm 11
RUN echo "strictDepBuilds: false" > pnpm-workspace.yaml

#Copiar apenas o manifesto de dependencias
COPY package.json ./

#instalar as dependencia do projeto
RUN pnpm install

#Copiar todo o restante do codigo
COPY . .

# Expor a porta padrão LDW
EXPOSE 3000

#Comando para inicializar a aplicação
CMD ["pnpm", "dev"]
