'use strict';

// Obtendo as dependencias
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./server/config/passport')(require('passport'));

// stating db
const db = require('./server/config/db-config');

const app = express();

const allowCors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Accept-Charset', 'utf-8');
    res.header('Access-Control-Allow-Credentials', true);
    next();
};

/**
 * Parsers para dados POST
 */
app.use(allowCors);
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

// Apontar o caminhos estáticos
app.use(express.static(path.resolve('dist')));

/**
 * Definir as rotas da API REST
 */
app.use('/api/tasks', require('./server/routes/task-router'));
app.use('/api/users', require('./server/routes/user-router'));

/**
 * Pega todas as outras rotas que não são da API e devolve arquivo index.html
 * O Angular irá tratar essas rotas
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Obter a porta do ambiente e armazenar no Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);


/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(app.get('port'), function() {
    console.log("App running on port", app.get('port'));
});


