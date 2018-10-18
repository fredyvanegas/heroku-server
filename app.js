require('./config/config')

//librerias del proyecto
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('cookie-session');
const port = process.env.PORT;
const app = express();

let tareas = ['uno', 'dos'];

//middleware
app.use(morgan('dev')); //Información detallada en el terminal
app.use(bodyParser.urlencoded({
    extended: true
})); //Obtener los datos de las peticiones poste en el atributo "body" del request
app.use(session({
    secret: 'node'
})); //Configuración cookie-session (persistencia en sesión)

app.set('view engine', 'ejs'); //Configuración de template engine EJS

//Compartir recursos
app.use('/publica',express.static('public')); //primer parámetro es el nombre que quiero que tenga la carpeta, el segundo es el nombre real de la carpeta(desde la raíz {./})

//visualizar archivo con EJS
app.get('/', function (request, response) {
    response.render('formulario.ejs', {
        tareas
    })
});

//adicionar tareas
app.post('/adicionar', function (request, response) {
    let tarea = request.body.nuevaTarea;  //request.body contiene los parámetros en POST
    tareas.push(tarea);
    response.redirect('/');
});

//eliminar tareas
app.get('/borrar/:id', function(request,response){
    let id = +request.params.id;  //request.params contiene los parámetros de la URL //el '+' funciona igual que el parse int
    tareas.splice(id,1);
    response.redirect('/');
})

//verificar en qué puerto se está trabajando
app.listen(port, function () {
    console.log('Escuchando en el puerto ', port);
})