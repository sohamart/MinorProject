const app = require('./src/app');
require('dotenv').config();
const connectDB = require('./src/db/db');








connectDB()

app.listen(3000, () => {
    try {
        console.log('Server is running on port 3000');
    } catch (error) {
        console.log(error);
    }

});