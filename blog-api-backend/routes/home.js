const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

router.get('/',(req, res) =>{
    res.send('welcome to home page')
})
// router.get('/register',(req, res) => {
//     res.send('data request initiated')
// })

router.post('/register',(req, res) => {
    // const user = req.user;
    const user = {
        id: 1, 
        username: 'brad',
        email: 'brad@gmail.com'
    }
    
    jwt.sign({user}, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
        res.send({
          token
        });
    });
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
    const user = {
        id: 1, 
        username: 'brad',
        email: 'brad@gmail.com'
    }
    
    jwt.sign({user}, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
        res.send({
          token
        });
    });
})

router.post('/blogs', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.send({
            message: 'Post created...',
            authData
          });
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