const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passoprt = require("passport");
const session   = require("express-session");
const MongoStore = require("connect-mongo")("session");
const MethodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/post");
const passport = require("passport");

// use . env file on  the config folder
require("dotenv").config({path: "./config/.env"});

//passport config

require("./config/passport")(passoprt);

//connect to db
connectDB();

//engine for front-end

app.set("view engine", "")// not yet installed

//static folder
app.use(express.static("public"));

//body parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json);

//logging
app.use(logger("dev"));

//use forms for put/ delete
app.use(MethodOverride("_method"));

//setup sessions stored in mongodb altlas

app.use(
    session({
        secret: "keyboard cat",
        resave: flase,
        saveUninitialized: false,
        store: new MongoStore({ mongoConnection: mongoose.connection}),
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passoprt.session());

//use flash messages for errors, info & etc.
app.use(flash());

//setup routes for which the server is listening

app.use("/", mainRoutes);
app.use("/post", postRoutes);

//sever running
    app.listen(process.env.PORT, () => {
        console.log("THE SERVER IS RUNNING")
    })







