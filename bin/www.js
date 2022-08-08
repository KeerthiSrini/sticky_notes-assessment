let app = require('../app');
let debug = require('debug');



let port = normalizePort(process.env.PORT || config.projectSetup.port);
app.set('port', port);

let http = require('http');
let server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
            ? 'Pipe ' + port                               
            : 'Port ' + port;

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
    let addr = server.address();
    let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;

    debug('Service is listening on ' + bind);
}

function normalizePort(val) {
    let portN = parseInt(val, 10);

    if (isNaN(portN)) {
        // named pipe
        return val;
    }

    if (portN >= 0) {
        // port number
        return portN;
    }

    return false;
}
