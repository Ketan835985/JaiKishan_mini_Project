const express = require('express');
const app = express();
const mongoose = require('mongoose')
const route = require('./route/route')
const { MONGOOSE_CONNECTION, PORT } = require('../config')


app.use(express.json()); 
app.use(express.urlencoded({ extended: true})); 

mongoose.connect(MONGOOSE_CONNECTION, 
    {useNewUrlParser : true}
)
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.log(err.message))

app.use('/', route);

app.listen(PORT||3000, ()=>{
    console.log('express server listening on port', PORT || 3000);
})