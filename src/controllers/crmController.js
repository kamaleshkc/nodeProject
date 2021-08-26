const mongoose = require('mongoose')
import {ContactSchema} from '../models/crmModel'

const Contact=mongoose.model('Contact',ContactSchema);


export const addNewContact=(req,res)=>{
    let addNewContact=new Contact(req.body);
    
    addNewContact.save((err,contact)=>{
        if(err){
            res.send(err);
        }
        res.json(contact);

    })


}

export const getContacts=(req,res)=>{
    Contact.find({},(err,contact)=>{
    if(err){
        res.send(err);
    }
    res.json(contact);
    });

  }

  export const getContactWithID=(req,res)=>{
    Contact.findById(req.params.contactID,(err,contact)=>{
    if(err){
        res.send(err);
    }
        res.json(contact);
    });

  }

  export const updateContact=(req,res)=>{
    Contact.findOneAndUpdate({_id:req.params.contactID},req.body,{new:true,useFindAndModigy:false},(err,contact)=>{
    if(err){
        res.send(err);
    }
        res.json(contact);
    });

  }


  export const deleteContact=(req,res)=>{
    Contact.findOneAndDelete({_id:req.params.contactID},(err,contact)=>{
    if(err){
        res.send(err);
    }
        res.json({message:'sucessfully deleted contact'});
    });

  }
