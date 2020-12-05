var http = require('http');
var url = require('url');
var reserve = require('./lib/reserve');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){
        reserve.home(request, response);
      } else {
        reserve.page(request, response);
      }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);