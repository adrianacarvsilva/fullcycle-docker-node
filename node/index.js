const express = require('express')
const app = express()
const port = 8080
const config = {
    host:'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    multipleStatements: true
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);
var sql = "create table people(id int not null auto_increment, name varchar(255), primary key(id));";
var sql_insert = "insert into people(name) values('Adriana'),('Maria');";
var sql_select="select name from people;";

var names = "";

connection.connect(function(err) {

    connection.query(sql, function(error, results) {});

    connection.query(sql_insert, function(error, results) {});

    connection.query(sql_select, function(error, results) {
        Object.keys(results).forEach(function(key) {
            var row = results[key];
            names+= "<h3> - " + row.name + "</h3>";
          });
    });

    connection.end(function(err) {});
});

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1> <h2>Lista de nomes cadastrada no banco de dados: </h2>' + names);
});

app.listen(port, () => {
    console.log('Rodando na porta: ' + port)
})