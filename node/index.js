const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
});

function createPeopleTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;
    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error('Erro ao criar ou verificar a existência da tabela "people":', err);
        return;
      }
      console.log('Tabela "people" criada ou verificada com sucesso.');
    });
}

function insertName(name) {
  const insertQuery = `INSERT INTO people (name) VALUES (?)`;
  connection.query(insertQuery, [name], (err) => {
    if (err) {
      console.error('Erro ao inserir nome na tabela:', err);
    }
  });
}

function selectNames(callback) {
  const selectQuery = 'SELECT name FROM people';
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Erro ao consultar nomes na tabela:', err);
      return;
    }
    const names = results.map((row) => row.name);
    callback(names);
  });
}

createPeopleTable();

app.get('/', (req, res) => {
    const defaultName = 'Thiago Cesar';
  
    insertName(defaultName);
  
    selectNames((names) => {
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <p>Lista de nomes cadastrados:</p>
        <ul>
          ${names.map((name) => `<li>${name}</li>`).join('')}
        </ul>
      `);
    });
  });
  

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});