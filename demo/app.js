var powerset = require('../lib/powerset');

var app = powerset();

app.get('/', function(req, res) {
  res.send('It\'s alive!');
});

app.all('/sdf', function(req, res) {
  res.send('Any method!');
});

app.listen(8080);

