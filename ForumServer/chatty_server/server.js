// server.js
//================ SERVER STUFF ==============================
const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws'); //much easier to follow documentation 
const uuid = require('uuid');
const PORT = 3001;  // Set the port to 3001
const server  = express()  // Create a new express server
.listen( PORT, '0.0.0.0', 'localhost',() => console.log(`Listening on ${PORT}`));

const wss  = new SocketServer({server});  // Creates the WebSockets server and attaches it to express
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//========================SERVER.ON ==============================
// Set up a callback that will run when a client connects to the server When a client connects they are assigned a socket, represented by the `ws` argument in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  handleConnectedUsers();

  // Handle messages

  //Handle incoming message/notification from App
  ws.on('message', (message) => {
    console.log( "this is the message ===>", message)
    parsedJson = JSON.parse(message);
    switch (parsedJson.type) {
      case 'postMessage':
         handleMessage(parsedJson)
        break; 
      case 'postNotification':
        handleNameChange(parsedJson)
        break;
      default: 
        break;
    }
  });

  // Set up a callback for when a client closes the socket.
  // This usually means they closed their browser tab.
  ws.on('close', () => {
    console.log('Client disconnected');
    handleConnectedUsers();
  });
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//=============== FUNCTIONS ===========================


// Handles incoming messages gives them an id   
function handleMessage(message ) {
  message.id = uuid()
  message.type = 'incomingMessage' //not sure if this should be a string **** 
  wss.broadcast(JSON.stringify(message))
}


// Handles connected users to send  how many users are connected
function handleConnectedUsers() {
  const messageObjNotification = {
    id: uuid(), 
    type: 'connectedUsers',
    userCount: wss.clients.size, 
  }
  wss.broadcast(JSON.stringify(messageObjNotification))
}

// Handles incoming notifications  gives them an id   
function handleNameChange(message) {
  message.id = uuid()
  message.type = 'incomingNotification' 
  wss.broadcast(JSON.stringify(message))
}

// Broadcast - Goes through each client and sends message data
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};



