const express = require('express');
const cors = require('cors');

const AuthRouter = require('./routes/AuthUser.routes');
const cookie = require('cookie-parser');








const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://classroutine-three.vercel.app",
    "https://56fpmdwx-5173.inc1.devtunnels.ms"
  ],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('backend running');
});


app.use(express.json());
app.use(cookie());


app.use("/api/auth", AuthRouter)


module.exports = app;