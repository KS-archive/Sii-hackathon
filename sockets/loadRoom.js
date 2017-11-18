const mongoose = require('mongoose');
const Channel = mongoose.model('Channel');

module.exports  = (socket, io) => {
  socket.on('loadRoom', function (data) {
    if(data === "") io.emit('connection_response', 'Brak nazwy.');
    else{
      Channel.findOne({name: data}, function (err, result) {
        if(err){
          io.emit('connection_response', 'Błąd wyszukiwania kanału.');
        }
        if(!result) io.emit('connection_response', 'Kanał nie istnieje.');
        else {
          //io.emit('connection_response', 'Połączono z kanałem.');
          socket.join(data, (err) => {
            if(err) io.emit('connection_response', 'Błąd łączenia z kanałem.');
            else  io.emit('connection_response', 'Połączono z kanałem.');
          });
        }
      });
    }
});
}
