#!/usr/bin/env node

var amqp = require('amqplib');
var all = require('when').all;
var basename = require('path').basename;

var severities = process.argv.slice(2);
if (severities.length < 1) {
  console.warn('Usage: %s [info] [warning] [error]',
               basename(process.argv[1]));
  process.exit(1);
}

//Url del servidor RabbitMQ
var url = 'amqp://guest:guest@localhost:5672';
var extype = 'fanout';

//El queue asociado con el exchange
var queue = 'ha.bi';

amqp.connect(url).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });

  return conn.createChannel().then(function(ch) {

    //Exchange del ambiente de  produccion
    var ex = 'analytics';
    var ok = ch.assertExchange(ex, extype, {durable: false});

    ok = ok.then(function() {
      return ch.assertQueue('', {exclusive: true});
    });

    ok = ok.then(function(qok) {

      //El nombre del queue se pone automaticamente
      //var queue = qok.queue;

      return all(severities.map(function(sev) {
        ch.bindQueue(queue, ex, sev);
      })).then(function() { return queue; });
    });

    //Crea un consumidor
    ok = ok.then(function(queue) {
      return ch.consume(queue, logMessage, {noAck: true});
    });

    //Monitoreo de la Queue
    return ok.then(function() {
      console.log(' [*] Esperando mensajes. Para salir tecle CTRL+C.');
    });

    function logMessage(msg) {
      console.log(" [x] %s:'%s'",
                  msg.fields.routingKey,
                  msg.content.toString());
    }
  });
}).then(null, console.warn);
