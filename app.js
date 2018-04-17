const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug')

var app = require('express')();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error')
});

app.get('/', (req, res) => {
  res.status(200)
  res.render('index')
})

app.listen(3000, () => console.log('Listening on 3000.'))
