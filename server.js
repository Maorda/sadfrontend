const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist'));
app.get('/*', function(req, res) {
  console.log(`la ip es:${req.socket.remoteAddress}`)
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(process.env.PORT || 4200);
console.log(`el puerto del frontend es:${process.env.PORT}`)