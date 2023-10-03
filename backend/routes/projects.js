var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/:projectId/load', function(req, res, next) {
  var filePath = path.join(__dirname, `../data/${req.params.projectId}.json`);
  console.log('Requested filePath='+filePath);
  // Check if file specified by the filePath exists
  fs.exists(filePath, function (exists) {
    if (exists) {
      var stat = fs.statSync(filePath);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': stat.size
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("ERROR File does not exist");
  })
});

router.post('/:projectId/sync', function(req, res, next) {
  console.log('\nCheck below the content received!');
  console.log('=================================');
  console.log(JSON.stringify(req.body));
  // console.log(JSON.stringify(req.body, undefined, 2));
  console.log('=================================');
  console.log('End of data\n');
  res.json({ requestId: req.body.requestId });
});

module.exports = router;
