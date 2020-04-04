const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports =  async viewModel =>{//aca creo una funcion para que me traiga toodo los datos y poder exportarla para la vista

    const results = await Promise.all([ //promise.all ayuda a ejecutar todas las funciones que tomara tirmepo a la db sin necesidad de poner await a cada una
        Stats(), //obtengo todo los datos generales
        Images.popular(), //me traigo los datos de las imagenes mas populares
        Comments.newest()
    ]);

    viewModel.sidebar = {
        status: results[0],
        popular: results[1],
        comments: results[2]
    };

    return viewModel;
}