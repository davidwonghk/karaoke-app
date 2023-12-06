require("dotenv").config();
const express = require('express')
const app = express()

app.use(express.json());
app.use(express.static('./public'));
app.use('/queue', require('./queue.js').router);
app.use('/video', require('./video.js').router);


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
