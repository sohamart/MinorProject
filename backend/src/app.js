const express = require('express');
const cors = require('cors');

const AuthRouter = require('./routes/AuthUser.routes');
const ClassRouter = require('./routes/ClassRoutine.routes');
const NotificationRouter = require('./routes/Notification.routes');
const cookie = require('cookie-parser');
const passport = require("passport");
require("../src/config/passport");









const app = express();
const session = require("express-session");


app.use(express.json());
app.use(cookie());
app.use(
  session({
    secret: "crtimepro",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: ['http://localhost:3000', "http://localhost:5173", "https://classroutinetime.vercel.app", "https://classrutinetimepro.vercel.app"],
  
    credentials: true
},
  
));

app.get('/', (req, res) => {
  res.send('backend running');
});




app.use("/api/auth", AuthRouter)
app.use("/api/class", ClassRouter)
app.use("/api", NotificationRouter)


module.exports = app;