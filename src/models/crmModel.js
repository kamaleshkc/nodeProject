const mongoose = require('mongoose')

const Schema =mongoose.Schema;

export const ContactSchema =new Schema({
    firstName:{
        type:String,
        required:'Enter a first name'
    },
    lastName:{
        type:String,
        required:'Enter a Last name'
    },
    email:{
        type:String,
        required:'Enter a Email'
    },
    company:{
        type:String,
        required:'Enter company name.'
    },
    created_date:{
        type:Date,
        default: Date.now
    }
   
})