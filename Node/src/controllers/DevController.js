const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

//normalmente o controller só tem 5 funções
//index: mostra uma lista do bd
//show: mostrar apenas um item do bd
//store: criar um registro no bd
//update: atualizar um resgistro no bd
//destroy: deletar um registro do bd

module.exports = {

    //Métodos HTTP
    //GET: pede algo ao bd 
    //POST: faz inserções no bd
    //PUT: faz atualizações nas inforamações do bd
    //DELETE: deleta dados do bd

    //Tipos de parametros
    //Query Params: request.query (Filtros, Ordenação, Paginação, ...)
    //Route Params: request.params (Identificar um recurso na alteração ou remoção)
    //Body: request.body (dados para a criação ou alteração de um registro)

    //async quer dizer que a função pode demorar
    async index(require, response){
        const devs = await Dev.find();

        return response.json(devs)
    },

    async show(request, response){
        const { github_username } = request.query;

        const dev = await Dev.find({
            name: {
                $in: github_username, //"$in:" um dos operadores logicos do mongoDB busca por uma instrução pré definida, neste caso o techsArray (lista de tecnologias)
            },
        });

        return response.json({ dev })
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            //await vai esperar a função executar para só ai ir para a proxima linha
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            //este método entre { name = login, avatar_url, bio } é uma desestruturação para você pegar informações, pacotes, libs.
            //o {name = login} funciona como um "if" que checa se o nome existe no cadastro se não ele pega o que tem na api do Github.
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray, //coloquei os ":" pois a requisoção é techs e a variavel é techsArray por serem diferents tem que ser chamadas        
                location,
            })
        }

        return response.json({ dev });
    },    

    async put(request, response){
        const idUser = '5e30a61e09b21d28f0e19bc8';
        const att = await Dev.findByIdAndUpdate(idUser, request.body, {new : true});
        return response.json(att);
    },

    async destroy(request, response){
        const idUser = '5e30a61e09b21d28f0e19bc8';
        const dev = await Dev.findOneAndRemove(idUser);
        return response.json(dev);
    },
};