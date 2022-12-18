//necessary to run page  
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())


app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log(`hey. listen. http://localhost:${PORT}`)
  })
//GET ROUTE with SQL for database
app.get('/chores', (req, res) => {
    console.log('GET /chores');
    let sqlQuery = `
    SELECT * FROM "chores"
    ORDER BY "id";
    `
    pool.query(sqlQuery)
    .then((dbRes) => {
        let dataFromChoresTable = dbRes.rows;
        res.send(dataFromChoresTable);
    })
    .catch((dbErr) => {
        console.log('Error in GET /chores', dbErr)
        res.sendStatus(500);
    })
  })
//POST ROUTE with SQL for database
  app.post('/chores', (req, res) => {
    console.log('POST /chores');
    console.log(req.body);
//sanitize inputs prevents table drops
    let sqlQuery = `
    INSERT INTO "chores"
    ("chore", "whos_it_for", "done","notes")
    VALUES
    ($1, $2, $3, $4);
    `
    let sqlValues = [req.body.chore, req.body.whos_it_for, req.body.done, req.body.notes];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
        res.sendStatus(201);
        })
        .catch((dbErr) => {
        console.log('something broke in POST /chores', dbErr);
        res.sendStatus(500)
        })
  })
//PUT ROUTE with SQL for database
  app.put('/chores/:id', (req,res) => {
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);
    let idToUpdate = req.params.id;
    let newDone = req.body.done;
    
    let sqlQuery = `
    UPDATE "chores"
        SET "done"=$1
        WHERE "id" = $2;
        `
    let sqlValues = [newDone, idToUpdate];
    pool.query(sqlQuery,sqlValues) 
    .then((dbRes) => {
        console.log(dbRes);
        res.sendStatus(201)
    })
    .catch((dbErr) => {
        console.log('Error in PUT /chores: ', dbErr);   
        res.sendStatus(500);
    })
})
//DELETE ROUTE with SQL for database
  app.delete('/chores/:id', (req, res) => {
    console.log(req.params);
    let idToDelete = req.params.id;

    let sqlQuery = `
    DELETE FROM "chores"
    WHERE "id" = $1;
    `
    let sqlValues = [idToDelete];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
        res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('broken in DELETE /chores/:id', dbErr);
            res.sendStatus(500);
        })
  })