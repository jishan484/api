var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public')); // sent public folder to clint 1st time only

//start the socket connection and game::
io.on('connection', function(socket){
    socket.emit('userId',socket.id);//sent user id first to user & save it
    chat(socket);//for chat only :global chat
    roome(socket,io);//for creating room
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});


//chat function
function chat(socket)
{
    socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    });
}

//room create
var opop=options();
var room=makeid(); //to leave socket.leave("room-"+roomno);
function roome(socket,io)
{
    socket.on('start', function(msh){
   if(io.nsps['/'].adapter.rooms["room-"+room] && io.nsps['/'].adapter.rooms["room-"+room].length > 1)
   {
       room=makeid();opop=options();
   }
   socket.join("room-"+room);
   io.sockets.in("room-"+room).emit('ctToRoom', room); 
   io.sockets.in("room-"+room).emit('options', opop);
   socket.in("room-"+room).emit('canplay', "true");
    });


    socket.on('hand', function(msh){
        socket.in("room-"+msh).emit('canplay', "true");
        console.log("hand changed in room :"+msh);
    });
    socket.on('click', function(room,data){
        socket.in("room-"+room).emit('click', data);
    });
       
}

//make options for game
function options()
{
    var ans = [];
    var option = [];
    for(i=0;i<23;i++)
    {
        for(j=0;j<16;j++)
        {
            option.push([i,j]);  
        }
    }
    for(n=0;n<100;n++)
    {
        var no=option.length;
        var rand = Math.floor(Math.random() * (+no - +0)) + +0;
        var cho = option[rand];
        ans.push([cho[0],cho[1]]);
        option.splice(rand, 1);
    }   
    return ans;
}

//make a room id::
function makeid() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
