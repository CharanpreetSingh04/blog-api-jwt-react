const express = require('express')
const path = require('path');
require('dotenv').config(path.join(__dirname,'./env'))
const PORT = process.env.PORT;
const app = express();
const cors = require('cors')

app.use(cors())
app.use('/', require('./routes/home'))


app.listen(PORT,() => console.log(`connected to Port ${PORT}`))