require("dotenv").config({
    path: "./.env"
});

const app = require("./src/app");


const connectDB = require('./src/db/db');

process.on("unhandledRejection", (err) => {

    console.log("UNHANDLED:", err);

});

process.on("uncaughtException", (err) => {

    console.log("UNCAUGHT:", err);

});






connectDB()

app.listen(3000, () => {
    try {
        console.log('Server is running on port 3000');
    } catch (error) {
        console.log(error);
    }

});