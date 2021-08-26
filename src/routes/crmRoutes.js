import{addNewContact,getContacts,getContactWithID,updateContact,deleteContact} from '../controllers/crmController'


import {login,register,loginRequired} from '../controllers/userControllers'


const routes=(app)=>{
    app.route('/contact')
    .get((req,res,next)=>{
        console.log(`Request from:${req.originalUrl}`)
        console.log(`Request from:${req.method}`)
        next();
     },loginRequired,getContacts)

     //this is post endpoint
     .post(
        loginRequired,addNewContact
        );



        app.route('/contact/:contactID')
//get a specific contact 
        .get(loginRequired,getContactWithID)
 //updating a specefic contact.
        .put(loginRequired,updateContact)
//deleting a specific contact.

        .delete(loginRequired,deleteContact)



    //registration route 
    app.route('/auth/register')
        .post(register);
    //login route
    app.route('/login')
        .post(login);
}
export default routes;