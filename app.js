const express =        require('express')
const path =           require('path')
const bodyParser =     require('body-parser')
const pug =            require('pug')
const TwitterStream =  require('twitter-stream-api')
const fs =             require('fs')
const mongoose =       require('mongoose')

mongoose.connect('mongodb://localhost/test')

const Cat = mongoose.model('Cat', {name: String})

const kitty = new Cat({ name: 'Bob'})
kitty.save().then(()=> console.log('meow'))


// var pad = "./tweets.json"
// console.log(pad)
var app =              require('express')()
// var json =             require(pad)
//
// console.log(json)
//
// var keys = {
//     consumer_key :    "7xgFu3HR9I5pySXRPX7Kdu0zd",
//     consumer_secret : "PD9BohkITKJFkk8ZJgATqtkbW2MI1jtweweflpkoRn6Cj6BG8n",
//     token :           "908293305947054080-CYKlCAhGUBoyUI3yGfJGXMQhSyNmQ8H",
//     token_secret :    "80lMXcIUwKjGpx1lh1nSUmxX51ibSpMXXj7a4xg8eFGeO"
// };
//
// var Twitter = new TwitterStream(keys, false);
//
// Twitter.stream('statuses/filter', {
//     follow: '25073877'
// });

// Twitter.pipe(fs.createWriteStream('tweets.json'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.end();
});

app.get('/', (req, res) => {
  res.status(200)
  res.render('index')
})

app.listen(3000, () => console.log('Listening on 3000.'))
