var express = require('express'); 
var path = require( 'path' ); 
var request = require( 'request' ); 
var cheerio = require( 'cheerio' ); 
var fs = require('fs'); 
var app = express(); 
var port = 8000; 


var url = 'https://www.indeed.com/cmp/BocaVox,-LLC/jobs/Software-Developer-Web-Service-Experience-53e741c854995aac?sjdu=QwrRXKrqZ3CNX5W-O9jEvRFd8FQI4DEv5V74lSpSnHZ8dc_4IKVqsDGV0I7RCie9hY1FC3kRi_gdYQv1VOUvTgRos1I6pUAhmX_tBp8U5XjwxhSBfubPTnWoliD0LwdX' ; 
request(url, function(err, resp, body)  { 
var $ = cheerio.load(body); 
var companyName = $('.company'); 
var companyNameText = companyName.text(); 
var jobTitle = $('.jobtitle font'); 
var jobTitleText = jobTitle.text(); 
var location = $('.location'); 
var locationText = location.text(); 
var summary = $('#job_summary p' ); 
var summaryText = summary.text(); 
var job = { 
jobTitle: jobTitleText, 
location: locationText, 
companyName: companyNameText, 
summary: summaryText 
}
console.log(job); 

});



app.listen(port); 
console.log('server is listening on' + port); 

