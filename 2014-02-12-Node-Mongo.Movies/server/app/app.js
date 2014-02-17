'use strict';

var dbname = 'imdb';
var port = process.env.PORT || 4000;

var d = require('./lib/request-debug');
var express = require('express');
var home = require('./routes/home');
var movies = require('./routes/movies');
var app = express();

/* --- pipeline begins */

app.use(require('./lib/mongodb-connection-pool').initialize(dbname, app));
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', pipelineExampleCrazy, d, pipelineExampleCrazy, home.index);
app.post('/movies', d, movies.create);
app.get('/movies', d, movies.index);
app.delete('/movies/:id', d, movies.remove);
app.get('/movies/:id', d, movies.record);
app.put('/movies/:id', d, movies.update);

/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

function pipelineExampleCrazy(req, res, next){
  console.log('I am in the pipelineExampleCrazy function');
  next();
}
