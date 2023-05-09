const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const buildingRoutes = require('./routes/building');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6445159b5752f2962ea9c6e1')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(adminRoutes);
app.use(buildingRoutes);


mongoose
  .connect(
    'mongodb+srv://odaiaamer:odaiamer1234@cluster0.rkvxrqg.mongodb.net/rentapp'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Odai',
          email: 'odai@test.com',
          
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
