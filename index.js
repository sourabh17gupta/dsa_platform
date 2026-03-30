const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();

//initialise port
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});

const {dbconnect} = require("./config/database");
dbconnect();