var http = require('http');
var url = require('url');
var reserve = require('./lib/reserve');
var stock = require('./lib/stock');
var purchase = require('./lib/purchase');
var customer = require('./lib/customer');
var employee = require('./lib/employee');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      reserve.home(request, response);
    } 
    else if(pathname === '/create_process'){
      reserve.create_process(request, response);
    } 
    else if(pathname === '/update'){
      reserve.update(request, response);
    } 
    else if(pathname === '/update_process'){
      reserve.update_process(request, response);
    } 
    else if(pathname === '/delete_process'){
      reserve.delete_process(request, response);
    } 
    else if(pathname === '/stock'){
      stock.home(request, response);
    } 
    else if(pathname === '/stock/create_process'){
      stock.create_process(request, response);
    }
    else if(pathname === '/stock/update'){
      stock.update(request, response);
    }
    else if(pathname === '/stock/update_process'){
      stock.update_process(request, response);
    }
    else if(pathname === '/stock/delete_process'){
      stock.delete_process(request, response);
    }
    else if(pathname === '/purchase'){
      purchase.home(request, response);
    } 
    else if(pathname === '/purchase/create_process'){
      purchase.create_process(request, response);
    }
    else if(pathname === '/purchase/update'){
      purchase.update(request, response);
    }
    else if(pathname === '/purchase/update_process'){
      purchase.update_process(request, response);
    }
    else if(pathname === '/purchase/delete_process'){
      purchase.delete_process(request, response);
    }
    else if(pathname === '/customer'){
      customer.home(request, response);
    } 
    else if(pathname === '/customer/create_process'){
      customer.create_process(request, response);
    }
    else if(pathname === '/customer/update'){
      customer.update(request, response);
    }
    else if(pathname === '/customer/update_process'){
      customer.update_process(request, response);
    }
    else if(pathname === '/customer/delete_process'){
      customer.delete_process(request, response);
    }
    else if(pathname === '/employee'){
      employee.home(request, response);
    } 
    else if(pathname === '/employee/create_process'){
      employee.create_process(request, response);
    }
    else if(pathname === '/employee/update'){
      employee.update(request, response);
    }
    else if(pathname === '/employee/update_process'){
      employee.update_process(request, response);
    }
    else if(pathname === '/employee/delete_process'){
      employee.delete_process(request, response);
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);