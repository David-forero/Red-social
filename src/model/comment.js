const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const commentSchema = new Schema({
    image_id: {type: ObjectId},//con esto me refiero a commentar a la img especifica con la id de la otra coleccion
    name: {type: String},
    gravatar: {type: String},
    email: {type: String},
    comment: {type: String},
    datestamp: {type: Date, default: Date.now}
});

commentSchema.virtual('image').set(function(image) {
    this._image = image;
}).get(function () {
    return this._image
});

module.exports = mongoose.model('comments', commentSchema);