const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/red_social', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('>>> Database is connect')).catch(err => console.log(err));
