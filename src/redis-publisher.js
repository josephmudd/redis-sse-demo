const redis = require("redis");

const pub = redis.createClient();

setInterval(() => {
  pub.publish("a nice channel", "I am sending a message.");
  console.log('message sent');
}, 10000);
