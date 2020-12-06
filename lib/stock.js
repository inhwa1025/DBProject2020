var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');


exports.home = function(request, response){
    db.query(`SELECT stockid, stockname, DATE_FORMAT(stock.usedate, '%Y-%m-%d') AS usedate, quantity FROM stock;`, function(error, stocks){
        var title = 'Stock';
        var html = template.HTML(title,
          ``,
           `
           <p>
            <STRONG><BIG>Stock List</BIG></STRONG>
           </p>
           ${template.stockTable(stocks)}
           <style>
               table{
                   border-collapse: collapse;
               }
               td{
                   border:1px solid black;
               }
           </style>
           <p><hr color = "black" size = "0.5"></hr></p>
           <form action="/stock/create_process" method="post">
               <p>
                  <B>Add Stock</B>
               </p>
               <p>
                   <input type="text" name="stockname" placeholder="stockname">
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
        db.query(`INSERT INTO stock (stockname, usedate, quantity) VALUES(?, ?, ?);`, 
        [post.stockname, post.usedate, post.quantity], function(error1){
        if(error1){
            throw error1;
        }
        response.writeHead(302, {Location: `/stock`});
        response.end();
        });
    });
}
  
  
exports.update = function(request, response){
    db.query(`SELECT stockid, stockname, DATE_FORMAT(stock.usedate, '%Y-%m-%d') AS usedate, quantity FROM stock;`, function(error, stocks){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`SELECT stockid, stockname, DATE_FORMAT(stock.usedate, '%Y-%m-%d') AS usedate, quantity FROM stock WHERE stockid=?;`,[queryData.id], function(error, stock){
            var title = 'Stock update';
            var html = template.HTML(title,
            ``,
            `
            <p>
                <STRONG><BIG>Stock List</BIG></STRONG>
            </p>
            ${template.stockTable(stocks)}
            <style>
                table{
                    border-collapse: collapse;
                }
                td{
                    border:1px solid black;
                }
            </style>
            <p><hr color = "black" size = "0.5"></hr></p>
            <form action="/stock/update_process" method="post">
                <p>
                    <B>Update Stock</B>
                </p>
                <p>
                    <input type="hidden" name="id" value="${queryData.id}">
                </p>
                <p>
                    <input type="text" name="stockname" value="${stock[0].stockname}">
                </p>
                <p>
                    <input type="text" name="usedate" value="${stock[0].usedate}">
                </p>
                <p>
                    <input type="number" name="quantity" value="${stock[0].quantity}">
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
        UPDATE stock SET stockname=?, usedate=?, quantity=? WHERE stockid=?`,
        [post.stockname, post.usedate, post.quantity, post.id], 
        function(error, result){
        if(error){
            throw error;
        }
        response.writeHead(302, {Location: `/stock`});
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
            `DELETE FROM stock WHERE stockid=?`, [post.stockid], 
            function(error1, result1){
                if(error1){
                    throw error1;
                }
                response.writeHead(302, {Location: `/stock`});
                response.end();
          }
        );
      });
  }