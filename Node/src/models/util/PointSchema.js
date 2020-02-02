const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'], //enum serve para passar uma variável que não pode ser chamado daquela forma, obrigando sempre ser assim
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;