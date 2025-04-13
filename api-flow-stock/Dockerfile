# Node.js com alpine por ser mais leve
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

#copiando dependencias para aproveitar o cache do docker
COPY package*.json ./

# instalando dependencias de produção
# --production para não instalar dependências de desenvolvimento
RUN npm install --production

# copiando o restante do código
COPY . .

# buildando o projeto
RUN npm run build

# Expondo a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]