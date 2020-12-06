var http = require('http');
var url = require('url');
var reserve = require('./lib/reserve');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      reserve.home(request, response);
    } 
    else if(pathname === '/create_process'){
      topic.create_process(request, response);
    } 
    else if(pathname === '/update'){
      topic.update(request, response);
    } 
    else if(pathname === '/update_process'){
      topic.update_process(request, response);
    } 
    else if(pathname === '/delete_process'){
      topic.delete_process(request, response);
    } 
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);