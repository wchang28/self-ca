//const crypto = require('crypto');
//const ciphers = crypto.getCiphers();
//console.log(JSON.stringify(ciphers, null, 2)); // ['aes-128-cbc', 'aes-128-ccm', ...]

var request = require("request");
var path = require('path');
var fs = require("fs");

/*
request.get('https://localhost', {strictSSL: false}, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
*/

var server_ca_file = path.resolve(__dirname, "./rootCA-pem.crt"); // self-made root authority certificate

var options = {
  agentOptions: {
    ca: [
      fs.readFileSync(server_ca_file)
    ]
  }
}
request.get('https://localhost', options, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});