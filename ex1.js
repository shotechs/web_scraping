var express = require('express'); 
var path = require( 'path' ); 
var request = require( 'request' ); 
var cheerio = require( 'cheerio' ); 
//var fs = require('fs'); 
var app = express(); 
var port = 8080; 
var swig = require('swig'); 
var _ = require('lodash'); 
var bodyParser = require('body-parser'); 
app.engine('html', swig.renderFile); 
app.set('views', path.join(__dirname, 'views' )); 
app.set('view engine', 'html' ); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public' ))); 


app.get('/', function (req, res) {
	

var url = 'https://www.indeed.com/cmp/BocaVox,-LLC/jobs/Software-Developer-Web-Service-Experience-53e741c854995aac?sjdu=QwrRXKrqZ3CNX5W-O9jEvRFd8FQI4DEv5V74lSpSnHZ8dc_4IKVqsDGV0I7RCie9hY1FC3kRi_gdYQv1VOUvTgRos1I6pUAhmX_tBp8U5XjwxhSBfubPTnWoliD0LwdX' ; 
request(url, function(err, resp, body)  { 
var $ = cheerio.load(body); 
var companyName = $('.company').first(); 
var companyNameText = companyName.text(); 
var jobTitle = $('.jobtitle font'); 
var jobTitleText = jobTitle.text(); 
var location = $('.location').first(); 
var locationText = location.text() ; 
var summary = $('#job_summary p')+'</br>'; 
var summaryText = summary.text() ; 
var details = { 
jobTitle: jobTitleText, 
location: locationText, 
companyName: companyNameText, 
summary: summaryText,
url: url
}

var detailsArray = _(details).toArray();  
console.log(detailsArray);
return res.render('index', 
	{      
		jobinfo: detailsArray 
		 }); 
}); 
 });



app.listen(port, function () {
	console.log('running server on port' + port);
}); 




