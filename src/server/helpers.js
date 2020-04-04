const moment = require('moment');
const helpers = {}

helpers.timeago = timestamp => { //me sirve para hacer referencia de cuanto tiempo se subio la img como si fuera una red soial
    return moment(timestamp).startOf('minutes').fromNow()
}

module.exports = helpers;