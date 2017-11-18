const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const Channel = mongoose.model('Channel');

class Participants {
  constructor(socket, io) {
    this.io = io;
    socket.on('addParticipant', this.add.bind(this));
    socket.on('removeParticipant', this.remove.bind(this));
  };

  add(data) {
    if (!(data.fullname && data.name)) console.log('brak parametru fullname');
    else {
      Channel.update({name: data.name}, {$addToSet: {participants: data.fullname}}, (err, newParticipants) => {
        if (err) console.log('blad dodawania participanta');
        this.io.to(data.name).emit(newParticipants);
      });
    }
  };

  remove(data) {
    if (!(data.fullname && data.name)) console.log('brak parametru fullname');
    else {
      Channel.findOne({name: data.name}, (err, result) => {
        if (result) {
          let updatedParticipants = result.participants.filter(element => {
            element !== data.fullname;
          });
          Channel.update({name: date.name}, {$set: {participants: updatedParticipants}}, (err, newParticipants) => {
            if (err) console.log('brak parametru fullname');
            this.io.to(data.name).emit(newParticipants);
          });

        }
      })

    }

  }


}

class Ideas{
  constructor(socket, io){
    this.io = io;
    socket.on('addIdea', this.add.bind(this));
    socket.on('removeIdea', this.remove.bind(this));
    socket.on('changeIdea', this.change.bind(this));
  };

  add(data){
    if(!(data.name && data.idea)) console.log('errror add idea');
    else{
      Channel.update({name: data.name}, {$addToSet: {idea: {content: data.idea, id: uuidv4()}}}, (err, newIdeas)=>{
        if(err) this.io.to(data.name).emit(`Błąd dodawania pomysłu.`);
        this._emitIdeas(this.io,data.name, newIdeas.idea);

      });
    }
  };
  remove(data){
    if(!(data.name && data.id)) console.log('errror add idea');
    else{
      Channel.findOne({name: data.name}, (err, result)=>{
        if(result){
          let newIdeas = result.idea.filter(elements => {
            elements.id !== data.id;
          });
          Channel.update({name: data.name}, {$set: {idea: newIdeas}}, (err, newIdeas)=>{
            if(err) this.io.to(data.name).emit(`Błąd dodawania pomysłu.`);
            this._emitIdeas(this.io,data.name, newIdeas.idea);
          })
        }
      });
    }
  };

  change(data){

  };
  _emitIdeas(io, name, ideas){
    io.to(name).emit("changeIdeas",ideas);
  };

}

class TimeController{
  constructor(socket, io){
    this.io = io;
    socket.on('startTime', this.startTime.bind(this));
  };

  startTime(data){

    if(!(data.name && data.time)) console.log('errror nie ma nazwy lub czasu')
    else{
      Channel.findOne({name: data.name}, (err, result) => {
        if(err) console.log(err);
        if(result) {
          Channel.update({name: data.name}, {$set: {phase:2}}, (err)=> {
            this.io.to(data.name).emit(`phasechange`, 2); // popr opis
          })
        }
        else console.log('brak wyniku');//nie znaleziono
      })
    }
  };
  addTime(data){};
}

module.exports  = (socket, io) => {
  socket.on('setTime', function (data) {
    if(!(data.name && data.time)) console.log('errror nie ma nazwy lub czasu')
    if(data === "") io.emit('connection_response', 'Nie podano czasu.');
    else {
      Channel.findOne({name: data.name}, (err, result) => {
        if(err) console.log(err);
        if(result) {
          Channel.update({name: data.name}, {$inc : { time: data.time}}, (err)=> {
            io.to(data.name).emit(`Dodano: ${data.time} min`);
          })
        }
        else console.log('brak wyniku');//nie znaleziono
      })
    }
  })

  socket.on('clear', function (data) {
    if(!data) console.log('blad czyszczenia ekranu')
    else {
      Channel.update({name: data}, {$set: {idea: [], time: 0, phase:1}}, (err)=>{
        if(err) io.to(data).emit(`Błąd czyszczenia pomysłów.`);
        io.to(data).emit(`Wyczyszczono pomysły`);
      });
    }
  })


  new Participants(socket, io);
  new Ideas(socket, io);
  new TimeController(socket, io);
};
