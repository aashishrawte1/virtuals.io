const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

// https://github.com/aashishrawte1/virtuals.io.git

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(bodyParser);

app.post('/recomendations', (req, res) => {
    try {
        const userProfile = req.body;
        console.log(userProfile);
        const recomendations = db.getRecomendations(userProfile);
        let responseData = '';
        recomendations.then((data)=> {
            console.log(data);
            res.status(200).json(data);
        })
        // console.log(recomendations);
        // res.status(200).json(recomendations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(3000, ()=> {
    console.log('listening on port 3000');
})