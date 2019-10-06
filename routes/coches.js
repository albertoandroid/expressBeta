/*
Creamos nuestro archivo coches.js
dentro del archivo routes. 
De esta forma dejamos nuestro codigo más organizado
no queremos todos los end point dentro del index.js
porque recuerda que nuestra api es muy sencilla y 
tiene 100 lineas de código, pero lo normal,
podría ser encontraqse con centenas de endpoint
lo que supondria miles y miles de lineas de código
así que hacemos una separación de rutas claras
en este caso coches, pero si tuvieramos usuarios
tambien podriamos poner usuario.
*/

const express = require('express')
/*
Cuando creamos un modulo diferente, ya no 
podemos utilizar simplemente app = express(), ya 
no va a funcionar. pero tenemos los Router
Una instancia Router es un sistema de middleware
y direccioamiento completo. Por este motivo
a menudo se le conoc como miniaplicacion
Es decir que basicamente crea un direccionador como 
un modulo, carga una funcion middlware y define algunas
rutas y monta el modulo de dirección en una via de acceso en
la aplicación principal. 
*/
//const app = express()
const router = express.Router()
//Es decir en lugar de trabajar con el objeto
//app trabajamos con el objeto Router



router.get('/api/cars/', (req, res) => {
    
    res.send(coches);
});

/*
Una vez que hemos dicho en index.js esta linea:
app.use('/api/coches/', coches)
quiere decir, que podemos simplifimar ahora
api/cars -> simplemente / ya que sabe
que todo lo que este bajo la ruta coches empieza
con ese endpoint.
*/
router.get('/', (req, res) => {
    
    res.send(coches);
});

router.get('/api/cars/:company', (req, res) => {
    
    //solo es un coche, camibar lista de coches por cohe
    const coche = coches.find(coche => coche.marca === req.params.company);
    if(!coche) // Devolvemos un 404 no hemos encontrado nada
    {
        res
        .status(404)
        .send('no tenemos ningun coche de esa marca');

    }else{
        res.send(coche);
    }

    //localhost:5050/api/cars/bmw/serie3
});


/*
Exportamos el router como hemos echo siempre
*/
module.exports = router

//tenemos que cargar este modulo en index.js
