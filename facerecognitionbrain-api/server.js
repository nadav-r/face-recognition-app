const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'POSTGRES_PASSWORD',
    database : 'face_recognition'//make sure that you have a data base
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=> {res.send("it is working");})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req,res) =>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});


app.put('/image', (req,res) =>{image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) =>{image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running on port ${process.env.port}`);
});


/*
	knex('users')
  .where('id', id)
  .update({
    'count': knex.raw('count + 1')
  });	
	

*/
