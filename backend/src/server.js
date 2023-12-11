require("dotenv").config();
const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use('/queue', require('./queue.js').router);
app.use('/video', require('./video.js').router);
app.use('/songs', require('./songs.js').router);


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
