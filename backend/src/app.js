const express = require('express');
const cors = require('cors');

const AuthRouter = require('./routes/AuthUser.routes');
const cookie = require('cookie-parser');








const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://classroutine-three.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookie());


app.use("/api/auth", AuthRouter)


module.exports = app;