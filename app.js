const express          = require('express')
const path             = require('path')
const bodyParser       = require('body-parser')
const pug              = require('pug')
const fs               = require('fs')
const TwitterStream    = require('twitter-stream-api')
// const session          = require('express-session')
const mongoose         = require('mongoose')
const env              = require('dotenv').config()

const user             = require('./modal/user')
// const example          = require('./example-tweet')

mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});

const app                = require('express')()
const server             = require('http').createServer(app)
const io               = require('socket.io')(server)


var keys = {
    consumer_key :    process.env.consumer_key,
    consumer_secret : process.env.consumer_secret,
    token :           process.env.token,
    token_secret :    process.env.token_secret
};

var Twitter = new TwitterStream(keys, true);


Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
});

Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});

Twitter.on('connection error network', function (error) {
    console.log('connection error network', error);
});

// Twitter.on('data', function (obj) {
//     console.log(obj)
//     const cleanedData = {
//       username: obj.screen_name,
//       profile_pic: obj.profile_image_url,
//       description: obj.text
//     }
//     console.log(cleanedData)
//
// });

Twitter.on('data error', function (error) {
    console.log('data error', error);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// app.use(express.session({
//   secret: 'topsecret',
//   maxAge: new Date(Date.now() + 3600000),
//   store: new mongoStore({ db: mongoose.connections[0].db })
// }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.end();
});

app.get( '*', function(req, res, next) {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end(/* icon content here */);
    } else {
        next();
    }
} )

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
  title='Hashtagfinder'
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
  // user.findOne({
  //       username: req.body.username,
  //       password: req.body.password
  //   },
  //
  //   (err, result) => {
  //   if (err) console.log( err );

    // console.log(result)
    res.render('finder')
  // })
})

server.listen(3000, () => console.log('Listening on 3000.'))

io.on('connection', function(socket) {
  console.log( 'connection socket' )
  socket.on('search', function(data) {
    var trackedData = data
    Twitter.stream('statuses/filter', {
          track: trackedData,
          stall_warnings: true
      })

    })

    Twitter.on('data', function (obj) {
        // console.log(obj)
        const cleanedData = {
          username: obj.screen_name,
          profile_pic: obj.profile_image_url,
          description: obj.text
        }
        // console.log(cleanedData)
        console.log( 'run' )

        socket.emit( 'data', cleanedData )
    });
})
