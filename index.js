import express from 'express'
import routes from './src/routes/crmRoutes'
import bodyParser, { json } from 'body-parser'
import jsonwebtoken from 'jsonwebtoken'
import { JsonWebTokenError } from 'jsonwebtoken';
const mongoose = require('mongoose')
var fs = require ('fs');
var {promisify}= require('util');
var writeFile = promisify(fs.writeFile);


const app = express();
const PORT=4000;

///mangoose connection
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/CRMdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//bodyparser setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//serving static files
app.use(express.static('public'));

//jwt setup

app.use((req,res,next)=>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'RESTFULAPIs',(err,decode)=>{
            if(err) req.user=undefined;
            req.user=decode;
            next();
        });

    }else{
        req.user=undefined;
        next();
    }
})

routes(app);

app.get('/',(req,res)=>
    res.send(`Node and Express server running on port ${PORT}`)
);
app.listen(PORT,()=>
    console.log(`Your server is running on port ${PORT}`)
    );


// function hideString (str,done){
//     process.nextTick(()=>
//     {
//         done(str.replace(/[a-zA-Z]/g,'X'));
//     })

    
// }

// hideString("Hello World",(hidden)=>{
//     console.log(hidden)
// })

// function delay(seconds,callback){
// setTimeout(callback,seconds*1000)
// }
// console.log('starting delays')
// delay(2,()=>{
//     console.log('two Seconds');
//     delay(1,()=>{
//         console.log('three second');
//         delay(1,()=>{
//             console.log('four seconds')
//         })
//     })

// })


// writeFile('sample.txt','This is a sample'
//     .this(()=>console.log("file sucessfully created"    ))
//     .catch((error)=>console.log('error uploading file')));
