const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
    const Channel = mongoose.model('Channel');


    app.get('/', function(req, res) {
      res.sendFile(`${__dirname}/build/index.html`);
    });

    app.post('/createchannel', function(req, res) {
      if(req.body.name && req.body.time){
        new Channel({name: req.body.name, time: req.body.time}).save((err, result) => {
          if(err){
            if(err.code === 11000){
              res.status(400).json({success: false, message: "Nazwa kanału jest używana."})
            }else{
              console.log(err);
              res.status(400).json({success: false, message: "Błąd tworzenia kanału."})
            }
          }else{
            //res.redirect('/'+req.body.name);
            res.status(400).json({success: true})
          }
        });
      }else{
        req.status(400).json({success: false, message: "Błędne parametry."})
      }
    });

    app.get('/:name', (req,res)=>{
      res.sendFile(`${__dirname}/build/index.html`);
    });
  };

  sockets(){
    const http = require('http').Server(this.app);
    this.io = require('socket.io')(http);

    this.io.on('connection', function(socket) {
      console.log('A user connected');

      require('./sockets/loadRoom')(socket, this.io);


      socket.on('disconnect', function () {
        console.log('A user disconnected');
      });
    });

    http.listen(3000, function() {
      console.log('listening on *:3000');
    });
  };
};


new Application();
