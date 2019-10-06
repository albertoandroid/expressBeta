/*
Espresso es un framework para nodeJS que nos da más funcionales
para hacer web service.
Es decir podemos crear un servidor de una manera simple y con código
que ya ha sido probado y testeado. 
Es decir que si vamos a utilziar un metodo POST ya esta probado.
Nos reduce la cantidad de codigo a escribir en nodejs pero más simple.
Nos permite estructurar la aplicación.

Espress permite escribir codigo del servidor de una manera simple 
además de darnos muchas funcionales.

*/
/*
Creamos el index.js. Que será nuestro punto de entrada

Creamos el package.json.

npm init

Nos traemos el packete de express:
$ npm install express

*/

/*
https://expressjs.com/en/4x/api.html
*/



const express = require('express');
var app = express()
/*
cargamos el modulo routers
*/
const coches = require('./routes/coches')
app.use('/api/coches/', coches)
/*
Basicamente lo que se le dice a express con la 
liena de arriba, es que toda url que empiece
por /api/coches/ utilize la ruta de coches y
así queda todo bien definido.
*/


/*
Vamos a ver como poder responde a peticiones
GET, POST, PUT y DELETE con expresso.
app.get()
app.post()
app.put()
app.delete()
*/

/*
Empecemos como utilizar GET con Express
El metodo GET tiene dos parametros de entrada.
1.- El endPoint. El primer Slack es para la raiz de
la website. Es decir el nombre de dominio…

2.- Es la función de callback que ya vimos. con
request y response.
Es decir que esta función se llama, cuando tenemos
una llamada http request con el método get.
en el endpoint que se le paso en el  primer parametro
*/
app.get('/api/home', (req, res) => {
    //Nos encontramos con el metodo send, para
    //enviar la infomación desde el servidor
    //al cliente.
    res.send('hola desde express');
});

app.get('/api/cars/list', (req, res) => {
    res.send(['BMW S12', 'AUDI A3' ,'Mercedes Clase A']);
});

/*
  Le decimos que empiece a escuchar en el puerto 4000 
  y además tenemos la opción de lanzar una función
  cuando la aplicación comience a escuchar en el puerto 400
  */
  
  /*
  Ahora al no tener los if else anidados para cada ruta,
  como viemos en el primer capitulo, podemos añadir
  una nueva ruta muy facil y además se pueden separar
  en diferentes ficheros. Por ejemplo en un fichero
  las rutas de coches, y en otro las rutas de motos
  y en otro las rutas de usuario. 
  */
  
 app.listen(8000, ()=> console.log('Escuchando puerto 4000...'));

 //Instalamos post y vemos un poco sobre el mismo.
 /*
Cambimos en scripto an package.json
    "start": "node index.js"

    y ahora solo ponemos en consola el comando npm start
*/

/*
pero hay otra solución más simple.
simple instalar nodemo. 

sudo npm install -g nodemon
sudo npm 
*/

//Vamos a crear nuestra variable de entorno
/*
  Hasta la fecha hemos asignado el puerto manualmente,
  eso cuando trabajamo en nuestro ordenador esta bien,
  pero en el mundo de producción cuando subas esto
  a un servidor como el Amazon Web Service, o con el 
  que trabajes, te vas a encontrar que te asignan
  el puerto dinamicamente, así que esto ya no lo podemos
  hacer de esta manera.
  Necesitamos una variable de envairoment:
  Así que vamos a ver como obtener esta variable:
*/
    //env -> enviaroment
    //obtenemos el valor que nos den y si no hay ninguno
    //lo asignamos nosotros al 5000
  const port = process.env.PORT || 5050;

  app.listen(port, ()=> console.log('Escuchando puerto: ' + port))
 //Mientras no tengamos una variable de entorno,
 //estaremos utilizando el 5000, como es nuestro 
 //caso utilizando nuestro equipo. 

 /*
 EN LA TERMINAL
 En mac
 export PORT = 6000
 En windows
 set PORT = 6000
*/

/*
DIGAMOS QUE QUEREMOS OBTENER EL COCHE DEl id = 2
2
*/
app.get('/api/cars/id/:id', (req, res) => {
    //Ahora queremos leer el parametro que nos
    //llega en la URL.
    //esto se hace con params.
    res.send(req.params.id);
    
});

//ahora lo vemos como objeto
app.get('/api/cars/:company/:model', (req, res) => {
    
    res.send(req.params);
    //localhost:5050/api/cars/bmw/serie3
});

/*
Estos datos en el futuro vendran de nuestra base 
de datos en mongo.

Que quiere decir, que en este capitulo, 
cuando reiniciamos nuestro servidor, los datos
ser pierden y se vuelve a coger de este array.

*/

var coches = [
    {id: 0, marca: 'BMW', modelo: "X3", año: "2020"},
    {id: 1, marca: 'AUDI', modelo: "A1", año: "2021"},
    {id: 2, marca: 'MERCEDES', modelo: "CLA", año: "2020"}
];

app.get('/api/cars/', (req, res) => {
    
    res.send(coches);
});

app.get('/api/cars/:company', (req, res) => {
    
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


//Ahora vamos a ver POST REQUEST
//Por defecto express no parsea Objetos JSON
//Pero lo podemos habilitar facilmente.
app.use(express.json());
app.post('/api/cars', (req, res)=>{
    //Tenemos que leer el body
    console.log(coches.length);
    var carId = coches.length;
    var coche = {
        id: carId,
        //In the request body viene un ojbjeto con 
        //el parametro marca.
        marca: req.body.marca,
        modelo: req.body.modelo,
        año: req.body.año
    };
    //dejamos en un array local las coches
    //que nos traemos con el POST. Esta claro
    //que si reinicimos el servidor se pierden
    //por ello en el futuro guardaremos los
    //datos en MongoDB, pero por ahora nos vale. 
    coches.push(coche);
    res.send(coche);
});


/*
Por lo general cuando dejamos a los usuarios
que nos envien datos, siempre debemos chequear
que nos envian. Tampoco podemos esperar en que los
clientes es decir las apps o web que van a utilizar
nuestro backend hagan ese trabajo de limpieza.
Asi que seremos nosotros los que tenemos que hacerlo
*/

app.post('/api/cars2', (req, res)=>{
    //Vemos si nos viene el campo modelo en el body
    if(!req.body.modelo || req.body.modelo.length<1){
        //Vemos que no nos venga "";
        //poner le if en uno solo lado
            //code 400 Bad request
            res.status(400).send('introduce una coche que exista')
            return;
        
    }
    var carId = coches.length;

    var coche = {
        id: carId,
        //In the request body viene un ojbjeto con 
        //el parametro marca.
        marca: req.body.marca,
        modelo: req.body.modelo,
        año: req.body.año
    };

    coches.push(coche);
    res.send(coche);
});

//pero como sabemos que npm nos hace la vida más
//facil debe haber alguien que ya haya
//realizado estas validaciones
//npm install express-validator
const { check, validationResult } = require('express-validator');

app.post('/api/cars3', [
    check('modelo').isLength({min: 3}),
    check('marca').isEmail()
], (req, res)=>{
// Finds the validation errors in this request and wraps them in an object with handy functions
const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var carId = coches.length;

    var coche = {
        id: carId,
        //In the request body viene un ojbjeto con 
        //el parametro marca.
        marca: req.body.marca,
        modelo: req.body.modelo,
        año: req.body.año

    };

    coches.push(coche);
    res.send(coche);

});

//PUT
app.put('/api/cars/:id', [
    check('modelo').isLength({min: 3})
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    //Buscamos moto con id
    const coche = coches.find(coche=> coche.id === parseInt(req.params.id));
    //Si no existe 404
    if(!coche){
     res.status(404).send('la moto con ese id no existe');
   return
    }

    

    //Actualizamos curso
    coche.marca = req.body.marca;
    coche.modelo = req.body.modelo;
    coche.año = req.body.año;
    res.send(coche)
    //devolmemot la moto actulizada al cliente.

});

app.delete('/api/cars/:id', (req, res)=>{
    //buscar el curso
    const coche = coches.find(coche=> coche.id === parseInt(req.params.id));
    //Si no existe 404
    if(!coche) {
        res.status(404).send('la moto con ese id no existe');
        return;
    }
    //Borrar
    const index = coches.indexOf(coche);
    console.log(coche.modelo);
    coches.splice(index, 1);
    //Devolver el mimso curso para saber que se ha borrado
    res.status(200).send('borrado');
})

/*
NUEVO CONTENDIDO
*/
//Custom middleware fuction
//next -> es la referencia a la proxima middleware
//funtion que ha de ser llamada cuando se acabe
//de ejecutar esta

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

  app.use('/api/cars/', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });

app.use(function(req, res, next){
    console.log('Loggin...')
    next();///pasamos el control a la siguiente middleware
})

app.use(function(req, res, next){
    console.log('Autenticate...')
    next();///pasamos el control a la siguiente middleware
})


const logger = require('./logger')
app.use(logger)


//Esta funcion middleware que se incluye en Express
//analiza la solicitud request entrate que vienen
//con payload 
localhost:3003/api/key=value&key=value
app.use(express.urlencoded())