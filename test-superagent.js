const request = require('superagent');

const path = require('path');
const fs = require("fs");
var server_ca_file = path.resolve(__dirname, "./rootCA-pem.crt"); // self-made root authority certificate
var ca = fs.readFileSync(server_ca_file);

console.log(`ca=\n${ca}`);

request
.get('https://localhost')
.ca(ca)
.then((res) => {
    console.log(`${JSON.stringify(res, null, 2)}`);
}).catch((err) => {
    console.log(`!!! err=${JSON.stringify(err)}`);
});


/*
// or set env var NODE_EXTRA_CA_CERTS=./rootCA-pem.crt
// then:

request
.get('https://localhost')
.then((res) => {
    console.log(`${JSON.stringify(res, null, 2)}`);
}).catch((err) => {
    console.log(`!!! err=${JSON.stringify(err)}`);
});
*/