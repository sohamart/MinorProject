const express = require('express');
const cors = require('cors');

const AuthRouter = require('./routes/AuthUser.routes');
const cookie = require('cookie-parser');








const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      origin.includes("vercel.app") ||   // 🔥 all vercel frontend allow
      origin.includes("localhost")
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('backend running');
});


app.use(express.json());
app.use(cookie());


app.use("/api/auth", AuthRouter)


module.exports = app;