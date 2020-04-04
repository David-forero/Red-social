const path = require('path');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now}
});

imageSchema.virtual('uniqueId')//esto me pertira obtener la extension para obtener la imagen por la url
    .get(function() {
        return this.filename.replace(path.extname(this.filename), ''); //para traerme la extension del arhivo
    })

module.exports = mongoose.model('imagenes', imageSchema);