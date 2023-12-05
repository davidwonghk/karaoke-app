const express = require('express');
const router = express.Router();

var cur = undefined;

router.get('/', (req, res) => {
  // Set the response header for video streaming
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'inline; filename=playing.mp4');
});

module.exports = router;
