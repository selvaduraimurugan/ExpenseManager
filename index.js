const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./userRouter');
var bodyParser = require('body-parser');

//BodyParser
app.use(bodyParser.json());
//app.use(express.json());

app.use('/api',userRouter);

//Localhost
app.listen(5000,() =>{
    console.log('Server Started On 5000');
});

mongoose.connect('mongodb://localhost:27017/userAuth',
{ useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log('Server connected Successfully');
})

app.use('/',(req,res) => {
    res.send('Hii');
});