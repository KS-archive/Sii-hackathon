const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


class Application{
  constructor(){
    this.app = express();
    this.init();
  };

  init(){
    require('./data/db');

    this.middleware();
    this.routes();
    this.sockets();
  };
  middleware(){
    let app = this.app;

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/build')));
  };
  routes(){
    let app = this.app;

    app.get('/', function(req, res) {
      res.sendFile(`${__dirname}/build/index.html`);
    });

  };
  sockets(){
    const http = require('http').Server(this.app);
    this.io = require('socket.io')(http);

    http.listen(3000, function() {
      console.log('listening on *:3000');
    });
  };
};


new Application();
