const express = require('express');

//init
require('./database');
const config = require('./server/config');
const app = config(express());

//server listenig
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});