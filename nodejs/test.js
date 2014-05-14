var q = 'tasks';

var open = require('amqplib').connect('amqp://guest:guest@localhost:5672');

// Publisher
open.then(function(conn) {
  var ok = conn.createChannel();
  ok = ok.then(function(ch) {
    ch.assertQueue(q);
    ch.sendToQueue(q, new Buffer('something to do'));
  });
  return ok;
}).then(null, console.warn);

// Consumer
open.then(function(conn) {
  var ok = conn.createChannel();
  ok = ok.then(function(ch) {
    ch.assertQueue(q);
    ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });

    /*conn.createConfirmChannel().then(function(ch) {
        ch.sendToQueue('foo', new Buffer('foobar'), {},
            function(err, ok) {
                if (err !== null)
                    console.warn('Message nacked!');
                else
                    console.log('Message acked');
            });
    });*/

  return ok;
}).then(null, console.warn);
