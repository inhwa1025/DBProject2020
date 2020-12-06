var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');


exports.home = function(request, response){
    db.query(`SELECT ordernum, DATE_FORMAT(orderdate, '%Y-%m-%d') AS orderdate, stockname, store, DATE_FORMAT(usedate, '%Y-%m-%d') AS usedate, quantity FROM purchase;`, function(error, purchases){
        var title = 'Purchase';
        var html = template.HTML(title,
          ``,
           `
           <p>
            <STRONG><BIG>Purchase List</BIG></STRONG>
           </p>
           ${template.purchaseTable(purchases)}
           <style>
               table{
                   border-collapse: collapse;
               }
               td{
                   border:1px solid black;
               }
           </style>
           <p><hr color = "black" size = "0.5"></hr></p>
           <form action="/purchase/create_process" method="post">
                <p>
                  <B>Add purchase</B>
                </p>
                <p>
                   <input type="text" name="orderdate" placeholder="orderdate">
                </p>
                <p>
                    <input type="text" name="stockname" placeholder="stockname">
                </p>
                <p>
                    <input type="text" name="store" placeholder="store">
                </p>
                <p>
                   <input type="text" name="usedate" placeholder="usedate YYYY-MM-DD">
                </p>
                <p>
                   <input type="number" name="quantity" placeholder="quantity">
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
        db.query(`INSERT INTO purchase (orderdate, stockname, store, usedate, quantity) VALUES(?, ?, ?, ?, ?);`, 
        [post.orderdate, post.stockname, post.store, post.usedate, post.quantity], function(error1){
        if(error1){
            throw error1;
        }
        response.writeHead(302, {Location: `/purchase`});
        response.end();
        });
    });
}
  
  
exports.update = function(request, response){
    db.query(`SELECT ordernum, DATE_FORMAT(orderdate, '%Y-%m-%d') AS orderdate, stockname, store, DATE_FORMAT(usedate, '%Y-%m-%d') AS usedate, quantity FROM purchase;`, function(error, purchases){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`SELECT ordernum, DATE_FORMAT(orderdate, '%Y-%m-%d') AS orderdate, stockname, store, DATE_FORMAT(usedate, '%Y-%m-%d') AS usedate, quantity FROM purchase WHERE ordernum=?;`,[queryData.id], function(error, purchase){
            var title = 'Purchase update';
            var html = template.HTML(title,
            ``,
            `
            <p>
                <STRONG><BIG>Purchase List</BIG></STRONG>
            </p>
            ${template.purchaseTable(purchases)}
            <style>
                table{
                    border-collapse: collapse;
                }
                td{
                    border:1px solid black;
                }
            </style>
            <p><hr color = "black" size = "0.5"></hr></p>
            <form action="/purchase/update_process" method="post">
                <p>
                    <B>Update Stock</B>
                </p>
                <p>
                    <input type="hidden" name="id" value="${queryData.id}">
                </p>
                <p>
                    <input type="text" name="orderdate" value="${purchase[0].orderdate}">
                </p>
                <p>
                    <input type="text" name="stockname" value="${purchase[0].stockname}">
                </p>
                <p>
                    <input type="text" name="store" value="${purchase[0].store}">
                </p>
                <p>
                    <input type="text" name="usedate" value="${purchase[0].usedate}">
                </p>
                <p>
                    <input type="number" name="quantity" value="${purchase[0].quantity}">
                </p>
                <p>
                    <input type="submit"  value="update">
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
        UPDATE purchase SET orderdate=?, stockname=?, store=?, usedate=?, quantity=? WHERE ordernum=?`,
        [post.orderdate, post.stockname, post.store, post.usedate, post.quantity, post.id], 
        function(error, result){
        if(error){
            throw error;
        }
        response.writeHead(302, {Location: `/purchase`});
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
            `DELETE FROM purchase WHERE ordernum=?`, [post.ordernum], 
            function(error1, result1){
                if(error1){
                    throw error1;
                }
                response.writeHead(302, {Location: `/purchase`});
                response.end();
          }
        );
      });
  }