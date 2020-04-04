const { Router } = require('express');
const router = Router();

//controllers
const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {

    router.get('/', home.index);
    router.get('/images/:img_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:img_id/like', image.like); //dar like a una img especifica
    router.post('/images/:img_id/comment', image.comment);
    router.delete('/images/:img_id/delete', image.remove);

    app.use(router);
}