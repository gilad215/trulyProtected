const mysql = require('mysql');
const express = require('express');

const app = express();

const pool = mysql.createPool({
  connectionLimit: 100, // important
  host: 'localhost',
  user: 'root',
  password: '2121',
  database: 'tp',
  debug: false
});

function getMachines(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      res.json({ code: 100, status: 'Error in connection database' });
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    connection.query('select * from machines', (error, rows) => {
      connection.release();
      if (!error) {
        res.json(rows);
      }
    });

    connection.on('error', error => {
      res.json({ code: error, status: 'Error in connection database' });
    });
  });
}

function getDictionary(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      res.json({ code: 100, status: 'Error in connection database' });
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    const responseJson = {};
    let column = 'statuses';
    connection.query(`select * from ${column}`, (error, data) => {
      console.log(data);
      if (!error) {
        responseJson.status = data;
      } else {
        res.json({ code: 100, status: 'Data invalid' });
      }
    });

    column = 'os';
    connection.query(`select * from ${column}`, (error, data) => {
      connection.release();
      console.log(data);
      if (!error) {
        responseJson.os = data;
        res.json(responseJson);
        return;
      }

      res.json({ code: 100, status: 'Data invalid' });
    });

    connection.on('error', error => {
      res.json({ code: 100, status: 'Error in connection database' });
    });
  });
}

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/machines', (req, res) => {
  getMachines(req, res);
});

app.get('/getDictionary', (req, res) => {
  getDictionary(req, res);
});

app.listen(5000);
