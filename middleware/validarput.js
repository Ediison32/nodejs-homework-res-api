const Joi = require("joi")

const userbody = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email()
}).or("name", "age", "email")

const validateInfoput=(req,res,next)=>{
    console.log("entroooooo");
    const {error}=userbody.validate(req.body);
    if(error){
        return res.status(400).json({"message": "missing fields"})      
    }
    next();
}

module.exports =validateInfoput;