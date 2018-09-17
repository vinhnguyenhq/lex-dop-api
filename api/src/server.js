'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

const app = express();

app.get('/version', (req, res, next) => {
  res.status(202).send({
    status: 'SUCCESS',
    message: 'lex-dop-api version',
    data: '1.0.2'
  });
});

var database = require('./config/database');
var dbHandler = new database();
var connection = dbHandler.createConnection();

app.get('/', (req, res, next) => {
  connection.query('CALL sp_GetEmployee();', (error, result, fields) => {
    if (error) throw error;

    if (result[0].length == 0) {
      res.status(404).send({
        status: 'ERROR',
        message: 'No existe usuario en Base de Datos'
      });
    } else {
      res.status(202).send({
        status: 'SUCCESS',
        message: 'User was found',
        data: result[0]
      });
    }
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
