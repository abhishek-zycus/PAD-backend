const express = require("express");
require('dotenv').config()
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(process.env.PORT,()=>{
    console.log(`App is running at port ${process.env.PORT}`);
})