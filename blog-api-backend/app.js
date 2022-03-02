const express = require('express')
const path = require('path');
require('dotenv').config(path.join(__dirname,'./env'))
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
mongoose.connect(MONGOURI, () => {
    console.log('connected to Mongo database')
})
app.use(cors())
app.use(bodyParser.json())
app.use('/', require('./routes/home'))


app.listen(PORT,() => console.log(`connected to Port ${PORT}`))