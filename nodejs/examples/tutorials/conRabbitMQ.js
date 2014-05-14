#!/usr/bin/env node

var amqp = require('amqplib');
var when = require('when');
var fs = require('fs');

var args = process.argv.slice(2);
var severity = (args.length > 0) ? args[0] : 'info';
var message = args.slice(1).join(' ') || 'LIGAMANIA';


/* Versión PHP
 $ssl_options = array(
 'cafile' => CERTS_PATH . '/yappstars.com.pem',
 #'local_cert' => CERTS_PATH . '/req.pem',
 'keyfile' => CERTS_PATH . '/yappstars.com.key',
 'verify_peer' => false,
 'verify' => false
 );
 */

// Options for full client and server verification:
var ssl_options = {
    verify: false,
    verify_peer: false,
    //fail_if_no_peer_cert: false,
    //cert: fs.readFileSync('../../ssl/client-cert/req.pem'),
    key: fs.readFileSync('../../ssl/client-cert/yappstars.com.key'),
    //key: fs.readFileSync('yappstars.com.key'),
    // cert and key or
    //pfx: fs.readFileSync('../../ssl/client-cert/yappstars.com.p12'),
    //passphrase: 'MySecretPassword',
    ca: [fs.readFileSync('../../ssl/client-cert/yappstars.com.pem')]
    //ca: [fs.readFileSync('yappstars.com.pem')]
};

// Options for just confidentiality. This requires RabbitMQ's SSL
// configuration to include the items
//
//     {verify, verify_none},
//     {fail_if_no_peer_cert,false}
//
//var opts1 = {  ca: [fs.readFileSync('../../ssl/cacert.pem')] };

/*
URL API: http://www.squaremobius.net/amqp.node/doc/channel_api.html
 http://www.squaremobius.net/amqp.node/doc/ssl.html
 */

//var message = process.argv.splice(2).join(" ") || "n/a";
var encoding = "utf8";
//var data = JSON.stringify({ source: message, id: '1001' });
var data = JSON.stringify(
    {"source":"LIGAMANIA",
        "hit_type":"pageview",
        "country_code":"MX",
        "ip":"201.21.44.122",
        "client_id":"f89fe018-0208-4726-8965-4fc3b9c4a6xv",
        "wurfl_id":"apple_iphone_ver6_3_2",
        "session_id":"00d6030adef638d838e6a65d87c97gs4",
        "date":"2014-03-29 01:02:48 -0600",
        "naranya_id":"30",
        "campaing_source":"Copa Del Mundo Brasil 2014",
        "campaing_medium":null,
        "campaing_term":null,
        "campaing_content":null,
        "campaing_name":null,
        "document_path":"\/",
        "document_host":"ligamania.local",
        "document_title":"Home"}
    );

//Url del servidor RabbitMQ

//var url = 'amqp://guest:guest@localhost:5672';
//var vhost='/%2Fnaranyamarket.com';

//Servidor cloudAMQP.com
/*var host ='lemur.cloudamqp.com';
var port='5672';
var user='cmvnjmxn';
var pass='iIZ9nhTJE1IPjPfErHMzk2R-TWzvyp5v';
var vhost='cmvnjmxn';
var url = 'amqp://'+user+':'+pass+'@'+host+':'+port+'/'+vhost;
var opts = {};
var common_options = {};*/


//Servidor de producción
var host ='200.57.181.186';
var port='5071';
var user='yappstars.com';
var pass='st4rs_2014.n3t';
var vhost='naranyamarket.com';
var url = 'amqps://'+user+':'+pass+'@'+host+':'+port+'/'+vhost;
var common_options = {durable: false, noAck: true};

//Validando el certificado via consola
//openssl s_client -connect 200.57.181.186:5071  -key '../../ssl/client-cert/yappstars.com.key' \
//-CAfile '../../ssl/client-cert/yappstars.com.pem'

//console.log("Url: '%s'",url);
var ex = 'analytics';
var extype = 'fanout';

var cn = amqp.connect(url, ssl_options);

cn.then(function(conn) {
  return when(conn.createChannel().then(function(ch) {

    //ch.assertQueue('foo', common_options);

    var ok = ch.assertExchange(ex, extype , common_options);

    return ok.then(function() {
      ch.sendToQueue('ha.bi', new Buffer('Un Mensaje!'));
      ch.publish(ex, severity, new Buffer(data));
      console.log(" [x] Enviado %s:'%s'", severity, data);
      return ch.close();
    });
  })).ensure(function() { conn.close(); });
}).then(null, console.warn);
