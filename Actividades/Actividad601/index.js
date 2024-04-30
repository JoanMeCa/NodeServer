const express = require('express')
const db = require('better-sqlite3')('usuarios.sqlite');

const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/patata', (req, res) => {
  res.send('Hello World!')
})

app.get('/usuarios', (req, res) => {
  const usuarios = db.prepare('SELECT * FROM usuarios').all();
  res.json(usuarios);
});

app.get('/usuario', (req, res) => {
  const { id } = req.query;
  const usuario = db.prepare('SELECT * FROM usuarios WHERE id = ?').get(id);
  res.json(usuario);
});

app.get('/productos', (req, res) => {
  const productos = db.prepare('SELECT * FROM productos').all();
  res.json(productos);
});

app.get('/producto', (req, res) => {
  const { id } = req.query;
  const producto = db.prepare('SELECT * FROM productos WHERE id = ?').get(id);
  res.json(producto);
});

app.get('/pedidos', (req, res) => {
  const pedidos = db.prepare(`
    SELECT pedidos.*, usuarios.*, productos.*
    FROM pedidos
    JOIN usuarios ON pedidos.id_usuario = usuarios.id
    JOIN productos ON pedidos.id_producto = productos.id
  `).all();
  res.json(pedidos);
});

app.get('/pedido', (req, res) => {
  const { id } = req.query;
  const pedido = db.prepare(`
    SELECT pedidos.*, usuarios.*, productos.*
    FROM pedidos
    JOIN usuarios ON pedidos.id_usuario = usuarios.id
    JOIN productos ON pedidos.id_producto = productos.id
    WHERE pedidos.id = ?
  `).get(id);
  res.json(pedido);
});