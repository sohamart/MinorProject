const Adminmodel = require('../model/AdminUser.model');
const Teachermodel = require('../model/TeacherUser.model');

const jwt = require('jsonwebtoken');


const  AuthAdminMiddileware = async (req, res, next) => {

   
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const Adminuserdata = await Adminmodel.findById(decoded.id);

        req.Adminuserdata = Adminuserdata;
        next();
    }
    catch(error){
        res.status(401).json({ message: 'Unauthorized' });
        

    }
}

const AuthTeacherMiddileware = async (req, res, next) => {

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const Teacheruserdata = await Teachermodel.findById(decoded.id);

        req.Teacheruserdata = Teacheruserdata;
        next();
    }
    catch{
        res.status(401).json({ message: 'Unauthorized' });
        

    }


    }

module.exports = {
    AuthAdminMiddileware

}