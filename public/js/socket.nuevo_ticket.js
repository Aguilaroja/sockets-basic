// Comando para establecer comunicación
var socket = io();
let label = $('#lblNuevoTicket');

// on = es para escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// On, estado actual
socket.on('estadoActual', (resp) => {
    label.text(resp.actual);
});

$('button').on('click', function() {
    console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});