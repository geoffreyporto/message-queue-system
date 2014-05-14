#!/usr/bin/env node

var amqp = require('amqplib');
var when = require('when');

var args = process.argv.slice(2);
var key = (args.length > 0) ? args[0] : 'info';
var message = args.slice(1).join(' ') || 'Hello World!';

//var message = process.argv.splice(2).join(" ") || "n/a";
var encoding = "utf8";
var data = JSON.stringify({ message: message });
pub.write(data, encoding);


amqp.connect('amqp://localhost').then(function(conn) {
  return when(conn.createChannel().then(function(ch) {
    var ex = 'topic_logs';
    var ok = ch.assertExchange(ex, 'topic', {durable: false});
    return ok.then(function() {
      ch.publish(ex, key, new Buffer(message));
      console.log(" [x] Sent %s:'%s'", key, message);
      return ch.close();
    });
  })).ensure(function() { conn.close(); })
}).then(null, console.log);
