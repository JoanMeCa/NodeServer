const express = require('express')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const db = require('better-sqlite3')('usuarios.sqlite');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './vistas');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/patata', (req, res) => {
  res.send('Hello World!')
})

app.get('/crear-usuario', (req, res) => {
    res.render('crearUsuario.ejs');
});

app.post('/crear-usuario', (req, res) => {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
        return res.status(400).send('Por favor, proporcione nombre y correo electrónico.');
    
    }
    const stmt = db.prepare('INSERT INTO usuarios (nombre, email) VALUES (?, ?)');
    const result = stmt.run(nombre, email);
    if (result.changes > 0) {
        res.send('Usuario creado exitosamente.');
    } else {
        res.status(500).send('Error al crear usuario.');
    }
});

app.get('/crear-producto', (req, res) => {
    res.render('crearProducto.ejs');
});

app.post('/crear-producto', (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).send('Por favor, proporcione nombre y precio.');
    }
    const stmt = db.prepare('INSERT INTO productos (nombre, precio) VALUES (?, ?)');
    const result = stmt.run(nombre, precio);
    if (result.changes > 0) {
        res.send('Producto añadido exitosamente.');
    } else {
        res.status(500).send('Error al añadir producto.');
    }
});