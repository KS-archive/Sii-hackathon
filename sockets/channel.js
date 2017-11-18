const mongoose = require('mongoose');
const Channel = mongoose.model('Channel');

class Participants {
  constructor(socket, io) {
    socket.on('addParticipant', this.add);
    socket.on('removeParticipant', this.remove);
  };

  add(data) {
    if (!(data.fullname && data.name)) console.log('brak parametru fullname');
    else {
      Channel.update({name: data.name}, {$addToSet: {participants: data.fullname}}, (err) => {
        if (err) console.log('blad dodawania participanta');
        // emit brodcast user dodany
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
          Channel.update({name: date.name}, {$set: {participants: updatedParticipants}}, (err) => {
            if (err) console.log('brak parametru fullname');
          });

        }
      })

    }

  }


}

class Ideas{
  constructor(socket, io){
    socket.on('addIdea', this.add);
    socket.on('removeIdea', this.remove);
    socket.on('changeIdea', this.change);
  };

  add(data){};
  remove(data){};
  change(data){};

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

  socket.on('addIdea', function (data) {
    if(!(data.name && data.idea)) console.log('errror add idea');
    else{
      Channel.update({name: data.name}, {$addToSet: {idea: data.idea}}, (err)=>{
        if(err) io.to(data.name).emit(`Błąd dodawania pomysłu.`);
        io.to(data.name).emit(`Dodano pomysł`);
      });
    }
  })

  socket.on('clear', function (data) {
    if(!data.name) console.log('blad czyszczenia ekranu')
    else {
      Channel.update({name: data.name}, {$set: {idea: [], time: 0}}, (err)=>{
        if(err) io.to(data.name).emit(`Błąd czyszczenia pomysłów.`);
        io.to(data.name).emit(`Wyczyszczono pomysły`);
      });
    }
  })


  new Participants(socket, io);
  new Ideas(socket, io);
};
