const express = require('express')
const db = require('better-sqlite3')('personas.sqlite');

const app = express()
const port = 3000


app.get('/patata', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.get('/personas', (req, res) => {
    const rows = db.prepare('SELECT * from personas').all();
    res.json(rows)
  })
app.get('/persona', (req, res) => {
    personaID = req.query.id;
    const row = db.prepare('SELECT * from personas WHERE id = ?').get(personaID);
    res.json(row)
})

app.post("/postPersona", (req, res) => {
    personaID = req.body.id;
    const row = db.prepare('SELECT * from personas WHERE id = ?').get(personaID);
    res.json(row)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})