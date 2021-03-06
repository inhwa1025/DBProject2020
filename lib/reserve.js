var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');

exports.home = function(request, response){
    db.query(`SELECT R.reserveid AS id, R.custid , C.name, DATE_FORMAT(R.date, '%Y-%m-%d') AS date, R.sisul, R.designer, R.price FROM (SELECT RE.reserveid, RE.custid, D.name AS designer, RE.date, RE.sisul, RE.price FROM reserve AS RE LEFT JOIN employee AS D ON RE.designer=D.empid) AS R LEFT JOIN customer AS C ON R.custid=C.custid ORDER BY R.date;`, function(error, reserves){
      db.query(`SELECT * FROM employee WHERE title<>"스텝";`, function(error2, designers){
        var title = 'Welcome';
        var html = template.HTML(title,
          ``,
           `
           <p>
            <STRONG><BIG>Reservation List</BIG></STRONG>
           </p>
           ${template.reserveTable(reserves)}
           <style>
               table{
                   border-collapse: collapse;
               }
               td{
                   border:1px solid black;
               }
           </style>
           <p><hr color = "black" size = "0.5"></hr></p>
           <form action="/create_process" method="post">
               <p>
                  <B>Add Reservation</B>
               </p>
               <p>
                   <input type="text" name="date" placeholder="date YYYY-MM-DD">
               </p>
               <p>
                   <input type="text" name="name" placeholder="customer name">
               </p>
               <p>
                   <input type="text" name="phone" placeholder="customer phone">
               </p>
               <p>
                   <input type="text" name="sisul" placeholder="시술 내용">
               </p>
               <p>
                ${template.designerSelect(designers)}
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
    });
}


exports.create_process = function(request, response){
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`SELECT custid FROM customer WHERE name=? AND phone=?;`, [post.name, post.phone], function(error1, cust){
          if(error1){
            throw error1;
          }
          db.query(`
            INSERT INTO reserve (date, custid, sisul, designer) 
              VALUES(?, ?, ?, ?)`,
            [post.date, cust[0].custid, post.sisul, post.designer], 
            function(error, result){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/`});
              response.end();
            }
          )
        });
    });
}


exports.update = function(request, response){
  db.query(`SELECT R.reserveid AS id, R.custid , C.name, DATE_FORMAT(R.date, '%Y-%m-%d') AS date, R.sisul, R.designer, R.price FROM (SELECT RE.reserveid, RE.custid, D.name AS designer, RE.date, RE.sisul, RE.price FROM reserve AS RE LEFT JOIN employee AS D ON RE.designer=D.empid) AS R LEFT JOIN customer AS C ON R.custid=C.custid ORDER BY R.date;`, function(error, reserves){
    db.query(`SELECT * FROM employee WHERE title<>"스텝";`, function(error2, designers){
          var _url = request.url;
          var queryData = url.parse(_url, true).query;
          db.query(`SELECT reserveid AS id, custid, DATE_FORMAT(date, '%Y-%m-%d') AS date, sisul, designer, price FROM reserve WHERE reserveid=?;`,[queryData.id], function(error3,reserve){
            db.query(`SELECT * FROM customer WHERE custid=?;`, [reserve[0].custid], function(error4, cust){
              var title = 'reservation';
              var html = template.HTML(title,
              ``,
              `
              <p>
                <STRONG><BIG>Reservation List</BIG></STRONG>
              </p>
              ${template.reserveTable(reserves)}
              <style>
                  table{
                      border-collapse: collapse;
                  }
                  td{
                      border:1px solid black;
                  }
              </style>
              <p><hr color = "black" size = "0.5"></hr></p>
              <form action="/update_process" method="post">
                  <p>
                      <input type="hidden" name="id" value="${queryData.id}">
                  </p>
                  <p>
                  <B>Update Reservation</B>
                  </p>
                  <p>
                      <input type="text" name="date" value="${reserve[0].date}">
                  </p>
                  <p>
                      <input type="text" name="name" value="${cust[0].name}">
                  </p>
                  <p>
                      <input type="text" name="phone" value="${cust[0].phone}">
                  </p>
                  <p>
                      <input type="text" name="sisul" value="${reserve[0].sisul}">
                  </p>
                  <p>
                    ${template.designerSelect(designers, reserve[0].designer)}
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
        db.query(`SELECT custid FROM customer WHERE name=? AND phone=?;`, [post.name, post.phone], function(error1, cust){
          if(error1){
            throw error1;
          }
          db.query(`
            UPDATE reserve SET date=?, custid=?, sisul=?, designer=? WHERE reserveid=?`,
            [post.date, cust[0].custid, post.sisul, post.designer, post.id], 
            function(error, result){
              if(error){
                throw error;
              }
              response.writeHead(302, {Location: `/`});
              response.end();
            }
          )
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
          `DELETE FROM reserve WHERE reserveid=?`,
          [post.id], 
          function(error1, result1){
              if(error1){
                  throw error1;
              }
              response.writeHead(302, {Location: `/`});
              response.end();
        }
      );
    });
}