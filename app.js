require('./config/config')

//librerias del proyecto
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('cookie-session');
const port = process.env.PORT;
const app = express();

app.listen(port, function(){
    console.log('Escuchando en el puerto ', port);
})