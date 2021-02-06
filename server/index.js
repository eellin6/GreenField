const bcrypt =  require('bcrypt')
const passport = require('passport');
const cloudinary = require('cloudinary')
const flash = require('express-flash')
const session = require('express-session')
const cors = require('cors');
const formData = require('express-form-data')

require('dotenv').config()
  //this loads all the environment variables and sets them inside of process.env

const methodOverride = require('method-override')
const express = require('express');
// const db = require('./db/database.js')
const {User, Favorites, Markers} = require('./db/database.js')
const app = express();
app.set('view engine', 'ejs')
const path = require('path');
const axios = require('axios');
const bodyParser= require('body-parser');
//changed extended to false to work with form data;allows data to be in req body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..','client','dist')))
app.use(bodyParser.json())
app.use(cors())
app.use(flash())
app.use(formData.parse())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,//should we resave if nothing changes
  saveUninitialized: false // do we want to save empty value
}))
app.use(methodOverride('_method'))
// app.use(passport.session())
// app.use(passport.initialize())
// const initializePassport = require('../passport.config')
cloudinary.config({
cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
// app.set('view engine', 'ejs')
//stores variables to be persisted across the session
// const checkAuthenticated = (req, res, next) => {
//   //this function checks if the user is logged in
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect('/login')
// }
// const notAuthenticated = (req, res, next) => {
//   //this function checks if the user is not logged in
//   //not working
//   //if the user is logged in
//   if(req.isAuthenticated()){
//     //redirect to the home page
//    return res.redirect('/');
//   }
//   //if they are not authenticated keep going
//   next();
// }
// initializePassport(passport,
//    email => User.findOne({where: {}}),
//   //return db query  find user => user.email === email
//   id => User.findOne(user => user.id === id)
// );



app.get('/markers', (req, res) => {

  Markers.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>{
      console.log(err);
    });
});
app.post('/markers', (req, res) => {


    req.body.map((marker) => {
      const {latitude,
        longitude,
        description} = marker;


        const newMarker = new Markers({
          latitude,
          longitude,
          description
        });

        newMarker.save()
          .then((data) => {
            console.log('MARKERS ADDED');

          })
          .catch((err) => {

          });



    })
  });


  app.post('/create', (req, res) => {
    const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))


  const {latitude,
      longitude,
      description} = req.body;


      Promise
      .all(promises)
      .then(res =>  {
        console.log(res)
        const newMarker = new Markers({
          latitude,
          imageUrl: res[0].url,
          longitude,
          description
        })
        newMarker.save()
        .then((data) => {
          console.log('MARKERS ADDED');

        })
        .catch((err) => {

        });
    })
    .catch(err => console.error('Error creating marker', err))
})




app.post('/register', (req, res) => {

  const {username, email, password} = req.body;
  //const password = await bcrypt.hash(req.body.password, 10)

  const newUser = new User({
    username,
    password,
    email
  })
  newUser.save()
    .then((data) => {
      console.log('THIS IS DATA:', data);
      res.redirect('/')

    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/favorites', (req, res) => {
  //console.log('APP POST REQ', req.body);
  const {latitude, longitude, description, imageUrl} = req.body;


  const newFavorite = new Favorites({
    latitude,
    longitude,
    imageUrl,
    description
  })
  newFavorite.save()
    .then((data) => {
      console.log('THIS IS DATA:', data);
      res.redirect('/')

    })
    .catch((err) => {
      console.log(err);
    });
});

//app.post('/login', notAuthenticated, passport.authenticate('local', {

//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// })


// )

app.post('/login', (req, res, next) => {


  const {email, password} = req.body;
  console.log('login req.body', req.body)
  return User.findOne({where: {email: req.body.email}}).then((data) => {

    if (data) {
      console.log('this is login server data', data)

      if(password === data.password){
        console.log('LOGIN CORRECT')
        res.redirect('/')
      } else {
        console.log('INCORRECT PASSWORD')
        res.redirect('/');
      }

      //  bcrypt.compare(password, data.password)
      // .then((correct) => console.log('login successful'))
      // .catch((err) => console.log('WRONG PASSWORD', err))

    } else {
      console.log('DOES NOT WORK')
      res.status(401).send('USER NOT FOUND');


    }
  });
});
app.post('/comments', (req, res, next) => {

  console.log('comment req.body', req.body)
  return Markers.findOne({where: {description: req.body.description}}).then((data) => {

    if (data) {
      console.log('this is comment server data', data)

      data.update({
        comments: req.body.comments
      })
      .then((data) => { res.redirect('/')})
      .catch((err) => {console.log(err)
      })

      //  bcrypt.compare(password, data.password)
      // .then((correct) => console.log('login successful'))
      // .catch((err) => console.log('WRONG PASSWORD', err))

    } else {

      res.redirect('/')


    }
  });
});





//logout route
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})







app.listen(3000, function() {
  console.log('listening on 3000')
})
