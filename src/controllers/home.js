const ctrl = {}
const { Image } = require('../model');
const sidebar = require('../helpers/sidebar')

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({timestamp: -1}); //traeme las imgs y ordenalos de mayor a menor
    let viewModel = {images: []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel); //ejecuto sidebar y le paso los datos
    res.render('index', viewModel);
    console.log(viewModel.sidebar.comments);
}

module.exports = ctrl;