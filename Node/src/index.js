const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//config mongoDB lembrar de colocar login e senha para o bando e trocar "test" pelo nome que você quer
mongoose.connect('mongodb+srv://breno:edilask666@cluster0-3cxq7.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors()); //aceita que o projeto seja aberto em outros localhost, atualmente o node roda na porta 3333, e vai aceitar que o frontend da porta 3000 possa acessar o backend também 
app.use(express.json()); //faz o express entender o JSON. importante: precisa vir antes de app.use(routes)
app.use(routes);

app.listen(3333)