const jwt = require('jsonwebtoken');
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = (io) => {
    const fs = require('fs');
    const path = require('path');
    const listenersPath = path.resolve(__dirname);
    io
    .use((socket, next)=>{
        if (socket.handshake.query && socket.handshake.query.token){
            jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function(err, decoded) {
              if (err) return next(new Error('Authentication error'));
              socket.decoded = decoded;
              next();
            });
          }
          else {
            console.log('Error')
            next(new Error('Authentication error'));
          }
    })
    .on('connection', async (socket) => {
        console.log(socket.id)
        const asyncBlock = async () => {
          await client.set("string key", "string val");
          const value = await client.get("string key");
          console.log(value);
          await client.flushall("string key");
        };


       fs.readdir(listenersPath, (err, files) => {
         if (err) {
           process.exit(1);
         }
         files.map((fileName) => {
           if (fileName !== 'index.js') {
             require(path.resolve(__dirname, fileName))(io, socket);
           }
         });
       });
     });

    io
    .of('/noauth')
    .on('connection', (socket) => {
        console.log(socket.id)
       fs.readdir(listenersPath, (err, files) => {
         if (err) {
           process.exit(1);
         }
         files.map((fileName) => {
           if (fileName !== 'index.js') {
             require(path.resolve(__dirname, fileName))(io, socket);
           }
         });
       });
     });
   };