function log(req, res, next){
    console.log('Loggin...')
    next();///pasamos el control a la siguiente middleware
}

module.exports = log;