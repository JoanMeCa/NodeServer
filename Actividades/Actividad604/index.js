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

app.get('/usuarios', (req, res) => {
    const usuarios = db.prepare('SELECT * FROM usuarios').all();
    res.render('usuarios', { usuarios: usuarios });
});
app.get('/usuario/:id', (req, res) => {
    const userId = req.params.id;
    const usuario = db.prepare('SELECT * FROM usuarios WHERE ID = ?').get(userId);
    res.render('usuariodetalle', { usuario: usuario });
});
app.get('/productos', (req, res) => {
    const productos = db.prepare('SELECT * FROM productos').all();
    res.render('productos', { productos: productos });
});
app.get('/producto/:id', (req, res) => {
    const productoId = req.params.id;
    const producto = db.prepare('SELECT * FROM productos WHERE ID = ?').get(productoId);
    res.render('productodetalle', { producto: producto });
});
app.get('/pedidos', (req, res) => {
    const pedidos = db.prepare(`
        SELECT 
            pedidos.id,
            usuarios.nombre as nombre_usuario,
            productos.nombre as nombre_producto
        FROM 
            pedidos
        INNER JOIN 
            usuarios ON pedidos.id_usuario = usuarios.ID
        INNER JOIN 
            productos ON pedidos.id_producto = productos.id
    `).all();
    res.render('pedidos', { pedidos: pedidos });
});
app.get('/pedido/:id', (req, res) => {
    const pedidoId = req.params.id;
    const pedido = db.prepare(`
    SELECT 
        pedidos.id,
        usuarios.nombre as nombre_usuario,
        productos.nombre as nombre_producto
    FROM 
        pedidos
    INNER JOIN 
        usuarios ON pedidos.id_usuario = usuarios.ID
    INNER JOIN 
        productos ON pedidos.id_producto = productos.id
    WHERE pedidos.id = ?
`).get(pedidoId);
    res.render('pedidodetalle', { pedido: pedido });
});
app.get('/crear-usuario', (req, res) => {
    res.render('crearusuario');
});
app.post('/crear-usuario', (req, res) => {
    const { nombre, email } = req.body;
    const insert = db.prepare('INSERT INTO usuarios (nombre, email) VALUES (?, ?)');
    insert.run(nombre, email);
    res.redirect('/usuarios');
});
app.get('/crear-producto', (req, res) => {
    res.render('crearproducto');
});
app.post('/crear-producto', (req, res) => {
    const { nombre, precio } = req.body;
    const insert = db.prepare('INSERT INTO productos (nombre, precio) VALUES (?, ?)');
    insert.run(nombre, precio);
    res.redirect('/productos');
});
app.get('/crear-pedido', (req, res) => {
    const usuarios = db.prepare('SELECT * FROM usuarios').all();
    const productos = db.prepare('SELECT * FROM productos').all();
    res.render('crearpedido', { usuarios: usuarios, productos: productos });
});
app.post('/crear-pedido', (req, res) => {
    const { usuario, producto } = req.body;
    const insert = db.prepare('INSERT INTO pedidos (id_usuario, id_producto) VALUES (?, ?)');
    insert.run(usuario, producto);
    res.redirect('/pedidos');
});