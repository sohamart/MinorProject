const mongoose = require('mongoose');


const AdminUser = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    

},
{
    timestamps: true

})

const Adminmodel = mongoose.model('Admin', AdminUser);

module.exports = Adminmodel;