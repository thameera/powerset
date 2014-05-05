var powerset = require('../lib/powerset');

var app = powerset();

app.get('/', function(req, res) {
  res.send('It\'s alive!');
});

app.listen(8080);

