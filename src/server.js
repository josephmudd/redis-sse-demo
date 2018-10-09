const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const redis = require('redis');

const sub = redis.createClient();
let msg_count = 0;

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.get('/eventstream', (req, res, next) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    sub.on("message", function (channel, message) {
      const data = message;
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      console.log("sub channel " + channel + ": " + message);
    });
    app.on('message', data => {
      console.log(data);
        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
});

app.post('/message', (req, res, next) => {
    const message = req.body.message;
    // ...
    // Some code here to handle the message,
        // by saving it in a database for instance
    // ...
    app.emit('message', {
        title: 'New message!',
                message,
                timestamp: new Date()
        });
        console.log(message);
    res.send(200);
});

sub.subscribe("a nice channel");

app.listen(3001, function() {
  console.log(`sse demo is listening on port 3001`);
});
