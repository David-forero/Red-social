const { Comments, Image } = require('../model');

module.exports = {
    async newest(){
        const comments = await Comments.find().limit(5).sort({timestamp: -1}) //traeme los comentarios mas nuevos
        
        for (const comment of comments) {
            const image = await Image.findOne({_id: comment.image_id}) //pero traemelos con sus imagenes
            comment.image = image
        }
        return comments;
    }
}