const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //"$in:" um dos operadores logicos do mongoDB busca por uma instrução pré definida, neste caso o techsArray (lista de tecnologias)
            },
            location: {
                $near: { //"$near" procura no mapa por uma proximidade pré defenida
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude, longitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
};