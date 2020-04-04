const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app =>{ //04:17:00
    //settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    //middleware
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.json());

    //routes
    routes(app)

    //statics files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //error 404
    if ('development' === app.get('env')) {
        app.use(errorHandler())
    }
    return app;
}