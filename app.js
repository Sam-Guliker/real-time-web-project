const express          = require('express')
const path             = require('path')
const bodyParser       = require('body-parser')
const pug              = require('pug')
const fs               = require('fs')
const TwitterStream    = require('twitter-stream-api')
const session          = require('express-session')
const mongoose         = require('mongoose')

const user             = require('./modal/user')

mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});


var app                = require('express')()

console.log(json)

var keys = {
    consumer_key :    "7xgFu3HR9I5pySXRPX7Kdu0zd",
    consumer_secret : "PD9BohkITKJFkk8ZJgATqtkbW2MI1jtweweflpkoRn6Cj6BG8n",
    token :           "908293305947054080-CYKlCAhGUBoyUI3yGfJGXMQhSyNmQ8H",
    token_secret :    "80lMXcIUwKjGpx1lh1nSUmxX51ibSpMXXj7a4xg8eFGeO"
};

var Twitter = new TwitterStream(keys, true);

Twitter.stream('statuses/filter', {
    filter: 'javascript'
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.session({
  secret: 'topsecret',
  maxAge: new Date(Date.now() + 3600000),
  store: new mongoStore({ db: mongoose.connections[0].db })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.end();
});


// App gets.
app.get('/', (req, res) => {
  res.status(200)
  res.render('login')
})

app.get('/login', (req, res) => {
  res.status(200)
  res.render('login')
})

app.get('/register', (req, res) => {
  res.status(200)
  res.render('register')
})

app.get('/finder', (req, res) => {
  res.status(200)
  res.render('finder')
})

// App post.
app.post('/register', (req, res) => {
  const newUser = new user(req.body)
  console.log(newUser)

  newUser.save(function(err, newUser){
    if (err) throw err;
    else{
      console.log('User created!');
      res.render('register')
    }
  })

  user.find({}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
  });
  res.redirect('login')
})

app.post('/login', (req, res) => {
  title='hashFinder'
  user.findOne({
        username: req.body.username,
        password: req.body.password
    },

    (err, result) => {
    if (err) console.log( err );

    console.log(result);
    res.render('finder')
  })
})

app.listen(3000, () => console.log('Listening on 3000.'))
