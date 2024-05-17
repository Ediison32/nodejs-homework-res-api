const Joi = require('joi')
const express = require('express');

const userSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required()
  });

const validateInfo = (req,res,next)=>{
    const { error, value } = userSchema.validate(req.body);
                                    
    console.log(req.body);
    if(error){
        return res.status(400).json({"message": "missing required name fieldd"})
    }
    next()
}

module.exports= validateInfo;