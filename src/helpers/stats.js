const { Comments, Image } = require('../model');

async function imagenCounter() {//creo una funcion para la cantidad de imagenes
    return await Image.countDocuments(); //count documentes ayuda a traer la cantidad total de las imgs
}

async function commentsCounter() {//creo una funcion para la cantidad de los comentarios
    return await Comments.countDocuments();
}

async function imageTotalViewCounter() { //esta funcion me ayudara a traer la cantidad total de las vistas
    const result= await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: {$sum: '$views'}
        }
    }]);
    return result[0].viewsTotal;
}

async function likesTotalCounter() {
    const result= await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: {$sum: '$likes'}
        }
    }]);
    return result[0].likesTotal;
}

module.exports = async () =>{
    const result = await Promise.all([
        imagenCounter(),
        commentsCounter(),
        imageTotalViewCounter(),
        likesTotalCounter()
    ]); //ejecuto todas las funciones

    return{
        images: result[0],
        comments: result[1],
        views: result[2],
        likes: result[3]
    }
}