const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Blog = require('../models/Blog');

router.get('/',(req, res) =>{
    res.send('welcome to home page')
})
router.post('/register',(req, res) => {
    // const user = req.body;
    const {email,name,password} = req.body;
    User.findOne({email: email}).then(
      user => {
          if(user){
              errors.push({msg: "User already registered with this email"})
          }
          else{
              const newUser = new User({
                  name,
                  email,
                  password
              })

              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash( newUser.password, salt, (err, hash) => {
                      if(err) throw err;
                      newUser.password = hash;
                      newUser.save()
                      .then( user => { 
                          jwt.sign({user}, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
                            res.send({
                              token
                            });
                          });
                      })
                      .catch( err => console.log(err))
                  })
              })
          }
      }
    )
    
    
    // res.send('data request initiated')
})

router.get('/login', verifyToken, (req,res) => {
    if(req.token === undefined){
        return res.send({message: 'login required', isRequired: 1})
    }
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.send({
            message: 'Redirecting to blog.io blogs page',
            authData,
            isRequired: 0
          });
        }
    });
})
router.post('/login', (req,res) => {
    const {email,password} = req.body;
    User.findOne({email: email})
      .then( user => {
            if(!user){
              return res.send({msg:'email not registered'})
            }
            bcrypt.compare(password, user.password, (err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                  jwt.sign({user}, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
                      return res.send({
                        user,
                        token
                      });
                  });
                } else{
                    return res.send({msg:'Password is incorrect'})
                }
            })
      })
      .catch(err => console.log(err))
    
})

router.get('/blogs', verifyToken, (req,res) => {
  if(req.token === undefined){
    return res.send({message: 'login required', isRequired: 1})
  }
  jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        Blog.find({}).lean()
        .then(blogs => {
          res.send({
            message: 'Redirecting to blog.io blogs page',
            authData,
            isRequired: 0,
            blogs
          })
        })
        .catch(err => console.log(err))
      }
  });
})

router.post('/blogs', verifyToken, (req,res) => {
  if(req.token === undefined){
    return res.send({message: 'login required', isRequired: 1})
  }
  const {name,description,user,userId,time} = req.body
  const newBlog = new Blog({
    name,
    description,
    user,
    userId,
    time
  })
  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        newBlog.save().then(
          res.send({
            message: 'Redirecting to blog.io blogs page',
            authData,
            isRequired: 0
          })
        );
      }
  });
})

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['token'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    } 
}
module.exports = router