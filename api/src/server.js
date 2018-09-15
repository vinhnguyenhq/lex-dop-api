'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello world change st\n');
// });

var database = require('./config/database');
var dbHandler = new database();
var connection = dbHandler.createConnection();

app.get('/', function(req, res, next) {
  connection.query('CALL sp_GetEmployee();', function(error, result, fields) {
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
