const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const {dbconnect} = require("./config/database");
const {connectRedis} = require("./config/redis");

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

const cors = require("cors")

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


const auth = require("./routes/auth.routes");
app.use('/api/v1/auth',auth);

const question = require("./routes/question.route");
app.use('/api/v1/question',question);

const submission = require("./routes/submission.route");
app.use('/api/v1/submission',submission);


app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});

(async () => {
  await dbconnect();
  await connectRedis();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();