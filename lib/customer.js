var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');


exports.home = function(request, response){
    db.query(`SELECT * FROM customer;`, function(error, customers){
        var title = 'Customer';
        var html = template.HTML(title,
          ``,
           `
           <p>
            <STRONG><BIG>Customer List</BIG></STRONG>
           </p>
           ${template.customerTable(customers)}
           <style>
               table{
                   border-collapse: collapse;
               }
               td{
                   border:1px solid black;
               }
           </style>
           <p><hr color = "black" size = "0.5"></hr></p>
           <form action="/customer/create_process" method="post">
               <p>
                  <B>Add Customer</B>
               </p>
               <p>
                   <input type="text" name="name" placeholder="name">
               </p>
               <p>
                   <input type="text" name="phone" placeholder="000-0000-0000">
               </p>
               <p>
                   <input type="submit"  value="add">
               </p>
           </form>
           <p><hr color = "black" size = "0.5"></hr></p>
           `
        );
        response.writeHead(200);
        response.end(html);
    });
}


exports.create_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`INSERT INTO customer (name, phone) VALUES(?, ?);`, 
        [post.name, post.phone], function(error1){
        if(error1){
            throw error1;
        }
        response.writeHead(302, {Location: `/customer`});
        response.end();
        });
    });
}
  
  
exports.update = function(request, response){
    db.query(`SELECT * FROM customer;`, function(error, customers){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`SELECT * FROM customer WHERE custid=?;`,[queryData.id], function(error, customer){
            var title = 'Customer update';
            var html = template.HTML(title,
            ``,
            `
            <p>
                <STRONG><BIG>Customer List</BIG></STRONG>
            </p>
            ${template.customerTable(customers)}
            <style>
                table{
                    border-collapse: collapse;
                }
                td{
                    border:1px solid black;
                }
            </style>
            <p><hr color = "black" size = "0.5"></hr></p>
            <form action="/customer/update_process" method="post">
                <p>
                    <B>Update Customer</B>
                </p>
                <p>
                    <input type="hidden" name="id" value="${queryData.id}">
                </p>
                <p>
                    <input type="text" name="name" value="${customer[0].name}">
                </p>
                <p>
                    <input type="text" name="phone" value="${customer[0].phone}">
                <p>
                    <input type="submit" value="update">
                </p>
            </form>
            <p><hr color = "black" size = "0.5"></hr></p>
            `
        );
        response.writeHead(200);
        response.end(html);
        });
    });
}


exports.update_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        db.query(`
        UPDATE customer SET name=?, phone=? WHERE custid=?`,
        [post.name, post.phone, post.id], 
        function(error, result){
        if(error){
            throw error;
        }
        response.writeHead(302, {Location: `/customer`});
        response.end();
        });
      });
  }
  
  
exports.delete_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(
            `DELETE FROM customer WHERE custid=?`, [post.custid], 
            function(error1, result1){
                if(error1){
                    throw error1;
                }
                response.writeHead(302, {Location: `/customer`});
                response.end();
          }
        );
      });
  }