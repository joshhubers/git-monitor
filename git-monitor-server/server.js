var express = require('express')
var cors = require('cors');
var fs = require('fs');
var app = express();
app.use(cors());

app.get('/', function (req, res) {
  var fileLocation = process.env.GITHUB_CONFIG_LOCATION
  var buffer = fs.readFileSync(fileLocation);
  content = buffer.toString();

  res.json(JSON.parse(content));
})

app.listen(3420)
