const mongoose = require('mongoose');
const PointSchema = require('./util/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema, //chamada do método
        index: '2dsphere' //quando se trabalha com latitude e longitude se coloca esse comando que siginifica o eixo x/y    
    }
});

module.exports = mongoose.model('Dev', DevSchema);