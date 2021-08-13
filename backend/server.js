const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Connect Database
connectDB();

app.use(express.json({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use('/devices', require('./routes/devices'));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`)
});