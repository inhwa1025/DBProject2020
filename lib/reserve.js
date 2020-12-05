var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');

exports.home = function(request, response){
    db.query(`SELECT * FROM reserve`, function(error, reserves){
        var title = 'Welcome';
        var description = 'Hairshop management system';
        var list = template.list(reserves);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/customer">고객 관리</a>
           <a href="/add_reservation">예약 추가</a>
           <a href="/update_reservation">예약 변경</a>
           <a herf="/stock">재고 관리</a>
           <a herf="/employee">직원 관리</a>`
        );
        response.writeHead(200);
        response.end(html);
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