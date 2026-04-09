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


const auth = require("./routes/auth.routes");
app.use('/api/v1/auth',auth);

const question = require("./routes/question.route");
app.use('/api/v1/question',question);

const submission = require("./routes/submission.route");
app.use('/api/v1/submission',submission);



app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});

const {dbconnect} = require("./config/database");
dbconnect();