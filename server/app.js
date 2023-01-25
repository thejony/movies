const express = require('express');
const app = express();
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3001;
const movies = require('./movies.json');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/movies', (req, res) => {
    console.log('> movies');
    try {
        const data = movies.map((item, index) => ({ id: index, Film: item.Film }));
        res.send({ data: data, error: "" });
    } catch (e) {
        res.send({ data: [], error: "Server load fails." });
    }
});

app.get('/details/:id', (req, res) => {
    console.log('> details', req.params.id);
    try {
        // const element = movies.filter((item, index) => ({ id: index, Film: item.Film }));
        res.send({ data: movies[req.params.id], error: "" });
    } catch (e) {
        res.send({ data: [], error: "Server load fails." });
    }
});

app.get('/comments/:id', (req, res) => {
    console.log('> details', req.params.id);
    try {
        // const element = movies.filter((item, index) => ({ id: index, Film: item.Film }));
        const comments = [
            {id:0, userName: "One", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
            {id:1, userName: "Two", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
        ]
        res.send({ data: comments, error: "" });
    } catch (e) {
        res.send({ data: [], error: "Server load fails." });
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});