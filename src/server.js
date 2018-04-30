const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const pool = mysql.createPool({
  connectionLimit: 100, // important
  host: 'localhost',
  user: 'root',
  password: 'password',
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

function getLogs(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      res.json({ code: 100, status: 'Error in connection database' });
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    connection.query('select * from logs', (error, rows) => {
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

function getSeverities(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      res.json({ code: 100, status: 'Error in connection database' });
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    connection.query('select * from severities', (error, rows) => {
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
function getMachineLogs(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      res.json({ code: 100, status: 'Error in connection database' });
      return;
    }

    console.log('getting logs from:', req.params.id);

    connection.query(
      `select * from logs where machineId=${req.params.id}`,
      (error, rows) => {
        connection.release();
        if (!error) {
          res.json(rows);
        }
      }
    );

    connection.on('error', error => {
      res.json({ code: error, status: 'Error in connection database' });
    });
  });
}

function deleteMachine(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      res.json({ code: 100, status: 'Error in connection database' });
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    const query = `delete from machines where id=${req.params.id}`;

    connection.query(query, (error, result) => {
      if (!error) {
        console.log(result);
        res.json({ code: 200, status: result });
      } else {
        res.json({ code: 100, status: 'Data invalid' });
      }
    });

    connection.on('error', error => {
      res.json({ code: 100, status: 'Error in connection database' });
    });
  });
}

function insertMachine(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      res.json({ code: 100, status: 'Error in connection database' });
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    const query = `insert into machines (\`id\`,\`hostname\`,\`ip\`,\`mac\`,\`status\`,\`os\`) 
    values (${null},
      "${req.body.hostname}",
      "${req.body.ip}",
      "${req.body.mac}",
      ${req.body.status},
      ${req.body.os})`;

    connection.query(query, (error, result) => {
      if (!error) {
        res.json({ code: 200, status: query });
        console.log(result);
      } else {
        res.json({ code: 100, status: 'Data invalid' });
      }
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

app.use(bodyParser.json({ type: '*/*' }));

app.get('/machines', (req, res) => {
  getMachines(req, res);
});

app.get('/logs', (req, res) => {
  getLogs(req, res);
});

app.get('/logs/:id', (req, res) => {
  getMachineLogs(req, res);
});

app.get('/getDictionary', (req, res) => {
  getDictionary(req, res);
});

app.get('/getSeverities', (req, res) => {
  getSeverities(req, res);
});

app.post('/insert', (req, res) => {
  insertMachine(req, res);
});

app.delete('/delete/:id', (req, res) => {
  deleteMachine(req, res);
});

app.listen(5000);
