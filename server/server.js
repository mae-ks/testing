// Enable all CORS requests
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// Run backend on local port 8000
const PORT = process.env.PORT || 8000;

// MeiliSearch API
import { MeiliSearch } from 'meilisearch';
import movies from './movies.json' with { type: "json" };
const search_client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: 'masterkeyforminoritybusiness'
})

// MySQL connection
import mysql from 'mysql';
const con = mysql.createConnection({
    host: "minoritybusiness.c76siigws906.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "tuchus-xuknyS-2gyhna",
    database: "main",
    port: "3306"
});

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post('/users', (req, res) => {
    if (req.query.username && req.query.email && req.query.age) {
        console.log('Request received');
        con.connect(function(err) {
            con.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
});

app.get('/users', (req, res) => {
    con.connect(function(err) {
        con.query(`SELECT * FROM main.users`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.json({ result: 'hi' });;
        });
    });
});

app.get('/search/movies/:movie_name/', (req, res) => {
    // http://localhost:8000/search/movies/spongebob
    search_client.index('movies').addDocuments(movies)
    search_client.index('movies').updateFilterableAttributes([
        'genres',
    ])
    search_client.index('movies').updateSortableAttributes([
        'id',
        'title'
    ])
    search_client.getTask(0);

    const movie_name = req.params.movie_name;
    const search_tag = movie_name;

    search_client.index('movies').search(search_tag, {
        limit: 2,
        sort: ['id:asc'],
    }).then((r) => {
        res.send(r.hits);
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });