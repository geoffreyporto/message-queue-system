#!/usr/bin/env node
var amqp = require('amqplib');
var when = require('when');
//var open = require('amqplib').connect('amqp://guest:guest@localhost:5672');

//var message = process.argv.splice(2).join(" ") || "n/a";
var args = process.argv.slice(2);
var key = (args.length > 0) ? args[0] : 'info';
var message = args.slice(1).join(' ') || 'Hello World!';
//var message = process.argv.splice(2).join(" ") || "n/a";
var encoding = "utf8";
var data = JSON.stringify({ message: message });
//pub.write(data, encoding);

amqp.connect('amqp://guest:guest@localhost:5672').then(function(conn) {
    return when(conn.createChannel().then(function(ch) {
        var q = 'hello';
        var msg = 'Hello World!';
        /*var ok = ch.assertQueue(q, {durable: false});
        return ok.then(function(_qok) {
         ch.sendToQueue(q, new Buffer(msg));
         console.log(" [x] Sent '%s'", msg);
         return ch.close();
         });*/
        console.log(data);
        var ex = 'home.logs';
        var ok = ch.assertExchange(ex, 'fanout', {durable: false});
        return ok.then(function() {
            ch.publish(ex, key, new Buffer(data));

            console.log(" [x] Enviado %s:'%s'", key, message);
            return ch.close();
        });

    })).ensure(function() { conn.close(); });;
}).then(null, console.warn);
