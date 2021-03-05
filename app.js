const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(require('./routes/route.js'));
app.listen(3000, ()=>{console.log("Server is listening on port: 3000")});