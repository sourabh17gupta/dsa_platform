const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const authUserRouter = require("./routes/auth.routes");

require("dotenv").config();
require("./config/passport");

//initialise port
const PORT = process.env.PORT || 4000;

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', authUserRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});

const {dbconnect} = require("./config/database");
dbconnect();