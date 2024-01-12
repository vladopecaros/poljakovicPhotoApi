const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
require ('dotenv/config');
const mongoose = require('mongoose');
const router = require('./routes/router');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
    origin:"*",
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/', router);

dbOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(()=>{
    console.log('DataBase Connected Successfully');
})
.catch(err => console.error(err))

const port = process.env.PORT || 4000;
const server = app.listen(port, ()=>{
    console.log("Server running on port "+port);
})