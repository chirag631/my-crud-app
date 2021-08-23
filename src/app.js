const express = require('express');
const userRouter = require('./routers/user');
const cors = require('cors');
const bodyParser=require('body-parser')
require('./db/mongoose');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const clientPath = path.join(__dirname, '../client/build');
app.use(express.static(clientPath));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

app.use(userRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    })
}




module.exports = app;

// git init
// git add . 
// git commit -m 'sdfsd'
// git push -u origin main


// git push heroku main