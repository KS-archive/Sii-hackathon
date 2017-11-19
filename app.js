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
      if(req.body.name && req.body.time && req.body.fullname){
        new Channel({name: req.body.name, time: req.body.time, fullname: req.body.fullname, phase: 1, deadline: (req.body.time + new Date().getTime())}).save((err, result) => {
          if(err){
            if(err.code === 11000){
              res.status(400).json({success: false, message: "Nazwa kanału jest używana."})
            }else{
              console.log(err);
              res.status(400).json({success: false, message: "Błąd tworzenia kanału."})
            }
          }else{
            res.status(200).json({success: true});
          }
        });
      }else{
        res.status(400).json({success: false, message: "Błędne parametry."})
      }
    });

    app.get('/:name', (req,res)=>{
      res.sendFile(`${__dirname}/build/index.html`);
    });

    app.get('/initialize/:name', (req,res)=>{
      if(req.params.name){
        Channel.findOne({name: req.params.name}, (err,result)=>{
          if(err) res.status(400).json({success: false, message: "Błąd pobrania kanału."})
          if(result) res.status(200).send({success:true, data: result});
          else res.status(400).json({success: false, message: "Kanał nie istnieje."});
        });
      }
    });

  };


  sockets(){
    let io = this.io;
    const http = require('http').Server(this.app);
    io = require('socket.io')(http);

    io.on('connection', function(socket) {
      console.log('A user connected');
      require('./sockets/loadRoom')(socket, io);

      require('./sockets/channel')(socket, io);


      socket.on('disconnect', function (data) {
        console.log(data);
        console.log('A user disconnected');
      });
    });

    http.listen(3000, function() {
      console.log('listening on *:3000');
    });
  };
};


new Application();
