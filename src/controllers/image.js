const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');

const { randomNumber } = require('../helpers/libs.js');
const ctrl = {}

//models
const { Image, Comments } = require('../model');

const sidebar = require('../helpers/sidebar');

ctrl.index = async(req, res) =>{
   let viewModel = {image: {}, comments:{} }
   const image = await Image.findOne({filename: {$regex: req.params.img_id}}); //regex es para decirle busque si hay datos en comun
   
   if (image) { //si existe la img, guardame y muestrame los comentarios
      image.views = image.views + 1; //guardo la cantidad de vista cuando el usuario refresque y lo guardo en la constante viewmodel
      viewModel.image = image;
      await image.save();
      const comments = await Comments.find({image_id: image._id})
      viewModel.comments = comments;
      viewModel = await sidebar(viewModel);
      res.render('image', viewModel);
   }else{//si no existe...
      res.redirect('/');
   }
};

ctrl.create = (req, res) => {

   const saveImage = async () =>{ //creo esta funcion es para poder guardar una imagen con nombre distinto
      const imgUrl = randomNumber(); //nombre aleatorio que he creado
      const images = await Image.find({filename: imgUrl}) //busco si existe ese dato para no repetir
      if (images.length > 0) {//si existe un dato repetido, vueeelve a ejecutar la funcion
         saveImage();
      }else{ //de lo contrario, finalmente se guarda
         const ext = path.extname(req.file.originalname).toLowerCase(); //obtener la extension del archivo
         const imageTempPath = req.file.path; // obtener la direccion de la img
         const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

         if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpeg') {
            await fs.rename(imageTempPath, targetPath); //de imageTempPath pasalo a la ruta de targetPath para guardar la img
            const guardar = new Image({
               title: req.body.title,
               filename: imgUrl + ext,
               description: req.body.description
            });

            await guardar.save();
            res.redirect('/')
         }else{ //si no cumple, eliminame entonces los archivos temporales para evitar almacenar archivos inncesesarios
            await fs.unlink(imageTempPath);
            res.status(500).json({'error': 'Only imgs are allowed'})
         }
      }
   }
   
   saveImage();
}

ctrl.like = async (req, res) => {
   const image = await Image.findOne({filename: {$regex: req.params.img_id}});
   
   if (image) {//si existes la img...
      image.likes = image.likes + 1;
      await image.save();
      res.json({likes: image.likes});
   }
}

ctrl.comment = async (req, res) => {
   const image = await Image.findOne({filename: {$regex: req.params.img_id}})
   if (image) { //si existe la img, publicamos el post
      const guardar = new Comments(req.body);
      guardar.gravatar = md5(guardar.email); //con esto lo convierto en un hash
      guardar.image_id = image._id; //guardare el id de la img para identificarlo gracias a la consulta en la linea 53
   
      await guardar.save();
      res.redirect('/images/' + image.uniqueId)
   }
}

ctrl.remove = async (req, res) => {
   const image = await Image.findOne({filename: {$regex: req.params.img_id}})
   if (image) {
      await fs.unlink(path.resolve('./src/public/upload/' + image.filename)); //con esto borro la img de la carpeta public
      await Comments.deleteOne({image_id: image._id}); //elimina los comentarios relacionado a esa img
      await image.remove();//elimina todo los datos de la imagen
   }
}

module.exports = ctrl;