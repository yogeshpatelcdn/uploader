var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');
app.set('view engine', 'jade');
app.set('views', __dirname+'/public');
app.use(express.static('public'));
app.get('/', function (req, res) {
	fs.realpath(__dirname, function(err, path) {
    if (err) {
        console.log(err);
     return;
    }
    
});	
	let imgArr=[];
	fs.readdir(__dirname+'/public/img', (err, files) => {
	imgArr=files;
	res.render( "landing",{data:imgArr});
	});
	
	
})


app.get('/data', function (req, res) {
	var query = require('url').parse(req.url,true).query;
	console.log('HAHHA: '+req.query.name);
	 var fpath = 'public/img/' + req.query.name;
	
	let imgArr=[];
	fs.readFile(fpath, (err, fdata) => {
		
		
		//Crypto
		var crypto = require('crypto')
  , fs = require('fs')

// Algorithm depends on availability of OpenSSL on platform
// Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
var algorithm = 'sha256'
  , shasum = crypto.createHash(algorithm)

// Updating shasum with file content
var filename = fpath
  , s = fs.ReadStream(filename)
s.on('data', function(data) {
  shasum.update(data)
})

// making digest
s.on('end', function() {
  var hash = shasum.digest('hex')
  console.log(hash + '  ' + filename)
  res.render( "show",{data:req.query.name, sha:hash});
})
		
		//
			
	//imgArr=files;
	
	});
	
	
})

app.post('/fileupload', function (req, res) {
	 
   var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
	  var oldpath = files.filetoupload.path;
	 
      var newpath = 'public/img/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.redirect('data/?name='+files.filetoupload.name);
      });
})
})
var server = app.listen(8081, function () {
	
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);
})

/*
var crypto = require('crypto')
  , fs = require('fs')

// Algorithm depends on availability of OpenSSL on platform
// Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
var algorithm = 'sha256'
  , shasum = crypto.createHash(algorithm)

// Updating shasum with file content
var filename = __dirname + "/Images/imgUploader_1517291970711_Penguins.jpg"
  , s = fs.ReadStream(filename)
s.on('data', function(data) {
  shasum.update(data)
})

// making digest
s.on('end', function() {
  var hash = shasum.digest('hex')
  console.log(hash + '  ' + filename)
})*/