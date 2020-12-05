var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');

exports.home = function(request, response){
    db.query(`SELECT R.reserveid AS id, R.custid , C.name, DATE_FORMAT(R.date, '%Y-%m-%d') AS date, R.sisul, R.designer, R.price FROM (SELECT RE.reserveid, RE.custid, D.name AS designer, RE.date, RE.sisul, RE.price FROM reserve AS RE LEFT JOIN designer AS D ON RE.designer=D.empid) AS R LEFT JOIN customer AS C ON R.custid=C.custid ORDER BY R.date;`, function(error, reserves){
      db.query(`SELECT * FROM designer;`, function(error2, designers){
        var title = 'Welcome';
        var html = template.HTML(title,
          `
           <style type="text/css">
            body {
              background-color: #E1F6FA;
            }
            span {
              width: 100px; height: 20px;
              border: 1px; padding: 5px;
              margin: 20px;
            }
            #span2 {background-color: #B9E2FA}
           </style>
           <p><hr color = "black"></hr></p>
           <body>
            <span id="span2"><a href="/customer">고객 관리</a></span>
            <span id="span2"><a href="/stock">재고 관리</a></span>
            <span id="span2"><a href="/employee">직원 관리</a></span>
           </body>
           <p><hr color = "black"></hr></p>`,
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
           <form action="/add_reservation" method="post">
               <p>
                  <B>Add Reservation</B>
               </p>
               <p>
                   <input type="text" name="date" placeholder="reservation date">
               </p>
               <p>
                   <input type="text" name="name" placeholder="customer name">
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

exports.page = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM reserve`, function(error, reserve){
        if(error){
          throw error;
        }
        db.query(`SELECT * FROM reserve LEFT JOIN customer ON reserve.custid=customer.custid WHERE reserve.custid=?`, 
        [queryData.id], function(error2, reserve){
          if(error2){
            throw error2;
          }
          var title = reserve[0].title;
          var description = reserve[0].description;
          var list = template.list(reserve);
          var html = template.HTML(title, list,
            `
            <h2>${title}</h2>
            ${description}
            <p>by ${reserve[0].name}</p>
            `,
            ` <a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
        
      });
}