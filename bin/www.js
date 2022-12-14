var app = require('../app');
var listener = require('../listener');
var debug = require('debug')('bin-api');
var http = require('http');

require('dotenv').config();
console.log(process.env.JWT_SECRET);
const TESTPORT = 30708;

var PORT = normalizePort(process.env.PORT || TESTPORT);
app.set('port', PORT);

const LOGGER = console.log;

const https = require('https');
const fs = require('fs');
const server_https = https
  .createServer(
    {
      key: fs
        .readFileSync('/etc/nginx/ssl/options1.net/options1.net.key')
        .toString(),
      cert: fs
        .readFileSync('/etc/nginx/ssl/options1.net/options1.net.crt')
        .toString(),
    },
    app
  )
  .listen(TESTPORT + 10);
const {
  bindUsernameSocketid,
  unbindsocket,
  deleteSocketid,
  unbindsocketid,
} = require('../utils/sockets');
const jwt = require('jsonwebtoken');

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
});

// app.set('io', io);

// io.use((socket, next) => {
//   next();
// }).on('connection', async (socket) => {
//   // console.log(socket.decoded, ' / ', socket.id);
//   // console.log(socket.sids);

//   let userId;
//   await jwt.verify(
//     socket.handshake.query.token,
//     process.env.JWT_SECRET,
//     function (err, decoded) {
//       if (err) return next(new Error('Authentication error'));
//       socket.decoded = decoded;
//       if (socket.decoded.id) {
//         userId = decoded.id;
//       }
//       if (socket.decoded.demo_uuid) {
//         userId = decoded.demo_uuid;
//       }
//     }
//   );
//   // console.log(userId, );
//   if (userId) {
//     bindUsernameSocketid(userId, socket.id);
//   } else {
//   }
//   console.log(
//     `@@@@@@@@@@@@@@@@@@@@@@@@${socket.id},${userId} socket connected`
//   );
//   socketTest(socket);
//   socket.on('disconnect', () => {
//     //		unbindIpPortSocket( address , socket.id )
//     deleteSocketid(socket.id);
//     unbindsocket(userId);
//     console.log(`@@@@@@@@@@@@@@@@@@${socket.id} socket DISconnected`);
//   });
// });

const https_io = require('socket.io')(server_https, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
});

// https_io
//   .use((socket, next) => {
//     next();
//   })
//   .on('connection', async (socket) => {
//     // console.log(socket.decoded, ' / ', socket.id);
//     // console.log(socket.sids);

//     let userId;
//     await jwt.verify(
//       socket.handshake.query.token,
//       process.env.JWT_SECRET,
//       function (err, decoded) {
//         if (err) return next(new Error('Authentication error'));
//         socket.decoded = decoded;
//         if (socket.decoded.id) {
//           userId = decoded.id;
//         }
//         if (socket.decoded.demo_uuid) {
//           userId = decoded.demo_uuid;
//         }
//       }
//     );
//     // console.log(userId, );
//     if (userId) {
//       bindUsernameSocketid(userId, socket.id);
//     } else {
//     }

//   });

// https_io.on('connection', (socket) => {
//   console.log('connected', socket.id);
//   socket.on('test1', (data) => {
//     a++;
//     socket.emit('test2', a);
//   });
// });

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
LOGGER(`listening ${PORT} @binary`);
// io.on('connection_error', (err) => {
//   console.log('errrrrrrrrrrrrrrr', err);
// });

listener(https_io);
// schedule(https_io);

/**
 * Normalize a port into a number, string, or false.
 */

/* const https = require('https');
const fs = require('fs');
const server_https = https
  .createServer(
    {
      key: fs.readFileSync('../bin-opt/ssl/options1.net.key').toString(),
      cert: fs.readFileSync('../bin-opt/ssl/options1.net.crt').toString(),
    },
    app
  )
  .listen(TESTPORT + 10);
*/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
/**
 * Socket Server Listener
 */
