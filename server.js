var express = require('express');
var app = express();
var moment = require('moment');
var path = require('path');
var port = process.env.PORT || 8080; 

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get('/:time', function(req,res){
    var timeStamp;
    if(/\D/.test(req.params.time)) {
        timeStamp = moment(req.params.time, "MMMM DD, YYYY");
    } else {
        timeStamp = moment(req.params.time, "X");
    }
    
    if(!timeStamp.isValid()) {
        res.json(
            { unix: null, natural: null }
            );
    } else {
        res.json(
            { unix: timeStamp.format("X"), natural: timeStamp.format("MMMM DD, YYYY") }
            );
    }
});

app.listen(port, function () {
  console.log('App listening on port ' + port);
});