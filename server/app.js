require("dotenv").config();
const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || process.env.NODE_DOCKER_PORT || 8080;
const db = require("./db.js");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/movies', (req, res) => {
    console.log('> movies');
    try {
        db.query("SELECT id, film FROM films", (err, result) => {
            if (err) throw err;
            const data = result.map(item => ({ id: item.id, Film: item.film }));
            res.send({ data: data, error: "" });
        });
    } catch (e) {
        console.log("error: ", e);
        res.send({ data: [], error: "Internal server error" });
    }
});

app.get('/details/:id', (req, res) => {
    console.log('> details', req.params.id);
    try {
        const id = parseInt(req.params.id);
        db.query(`SELECT film, genre, studio, audience_score, profitability, rotten_tomatoes, worldwide_gross, year FROM movies.films WHERE id='${id}'`, (err, result) => {
            if (err) throw err;
            if (result && result.length > 0) {
                const data = { ...result[0], profitability: Number.parseFloat(result[0].profitability).toFixed(1) }
                res.send({ data, error: "" });
            }
            else
                res.send({ data: [], error: "Film not found" });
        });
    } catch (e) {
        console.log("error: ", e);
        res.send({ data: [], error: "Internal server error" });
    }
});

app.get('/comments/:id', (req, res) => {
    console.log('> comments', req.params.id);
    try {
        const id = parseInt(req.params.id);
        db.query(`SELECT id, user_name, comment FROM comments WHERE id_film='${id}'`, (err, result) => {
            if (err) throw err;
            res.send({ data: result, error: "" });
        });
    } catch (e) {
        console.log("error: ", e);
        res.send({ data: [], error: "Internal server error" });
    }
});

app.post('/comments/:id', (req, res) => {
    console.log('> comment', req.params.id, req.body);
    try {
        if (!req.body || !req.params.id) {
            res.status(400).send({ data: [], error: "Empty data received" });
        }
        const id = parseInt(req.params.id);
        const user_name = req.body.user_name || "";
        const comment = req.body.comment || "";
        
        db.query(`INSERT INTO comments (user_name, comment, id_film) VALUES ('${user_name}', '${comment}', '${id}')`, (err, result) => {
            if (err) throw err;
            const data = { id: result.insertId, user_name, comment };
            res.send({ data, error: "" });
        });
    } catch (e) {
        console.log("error: ", e);
        res.send({ data: [], error: "Internal server error" });
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../build/index.html"));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});