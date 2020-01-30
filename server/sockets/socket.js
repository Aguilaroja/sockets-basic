const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();

//on = es para escuchar
io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        // console.log(`¿Cuál es el siguiente ticket? ${siguiente}`);

        callback(siguiente);
    });

    // Emitir un evento "Estado actual"
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        console.log(atenderTicket);
        callback(atenderTicket);

        //Emitir ultimos4
        client.broadcast.emit('ultimos4', ticketControl.getUltimos4());
    });

    // //Enviar información
    // client.emit('enviarMensaje', {
    //     usuario: 'Admin',
    //     message: 'Bienvenido a esta aplicación'
    // });

    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // //Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {
    //     console.log(data);

    //     //Aquí se envía lo que escucha el servidor al(los) cliente(s)
    //     client.broadcast.emit('enviarMensaje', data);
    //     // if (data.usuario) {
    //     //     callback({
    //     //         resp: 'Todo salió bien'
    //     //     });
    //     // } else {
    //     //     callback({
    //     //         resp: 'Todo salió mal'
    //     //     });
    //     // }
    // });
});