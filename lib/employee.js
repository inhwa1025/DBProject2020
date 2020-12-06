var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');


exports.home = function(request, response){
    db.query(`SELECT empid, name, title, phone, DATE_FORMAT(hiredate, '%Y-%m-%d') AS hiredate, manager FROM employee;`, function(error, employees){
        var title = 'Employee';
        var html = template.HTML(title,
          ``,
           `
           <p>
            <STRONG><BIG>Employee List</BIG></STRONG>
           </p>
           ${template.employeeTable(employees)}
           <style>
               table{
                   border-collapse: collapse;
               }
               td{
                   border:1px solid black;
               }
           </style>
           <p><hr color = "black" size = "0.5"></hr></p>
           <form action="/employee/create_process" method="post">
               <p>
                  <B>Add Employee</B>
               </p>
               <p>
                   <input type="text" name="name" placeholder="name">
               </p>
               <p>
                   <input type="text" name="title" placeholder="title">
               </p>
               <p>
                   <input type="text" name="phone" placeholder="000-0000-0000">
               </p>
               <p>
                   <input type="text" name="hiredate" placeholder="YYYY-MM-DD">
               </p>
               <p>
                   <input type="number" name="manager" placeholder="manager id">
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
        db.query(`INSERT INTO employee (name, title, phone, hiredate, manager) VALUES(?, ?, ?, ?, ?);`, 
        [post.name, post.title, post.phone, post.hiredate, post.manager], function(error1){
        if(error1){
            throw error1;
        }
        response.writeHead(302, {Location: `/employee`});
        response.end();
        });
    });
}
  
  
exports.update = function(request, response){
    db.query(`SELECT empid, name, title, phone, DATE_FORMAT(hiredate, '%Y-%m-%d') AS hiredate, manager FROM employee;`, function(error, employees){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`SELECT empid, name, title, phone, DATE_FORMAT(hiredate, '%Y-%m-%d') AS hiredate, manager FROM employee WHERE empid=?;`,[queryData.id], function(error, employee){
            var title = 'Employee update';
            var html = template.HTML(title,
            ``,
            `
            <p>
                <STRONG><BIG>Employee List</BIG></STRONG>
            </p>
            ${template.employeeTable(employees)}
            <style>
                table{
                    border-collapse: collapse;
                }
                td{
                    border:1px solid black;
                }
            </style>
            <p><hr color = "black" size = "0.5"></hr></p>
            <form action="/employee/update_process" method="post">
                <p>
                    <B>Update Employee</B>
                </p>
                <p>
                    <input type="hidden" name="id" value="${queryData.id}">
                </p>
                <p>
                    <input type="text" name="name" value="${employee[0].name}">
                </p>
                <p>
                    <input type="text" name="title" value="${employee[0].title}">
                </p>
                <p>
                    <input type="text" name="phone" value="${employee[0].phone}">
                <p>
                <p>
                    <input type="text" name="hiredate" value="${employee[0].hiredate}">
                </p>
                <p>
                    <input type="number" name="manager" value="${employee[0].manager}">
                </p>
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
        UPDATE employee SET name=?, title=?, phone=?, hiredate=?, manager=? WHERE empid=?`,
        [post.name, post.title, post.phone, post.hiredate, post.manager, post.id], 
        function(error, result){
        if(error){
            throw error;
        }
        response.writeHead(302, {Location: `/employee`});
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
            `DELETE FROM employee WHERE empid=?`, [post.custid], 
            function(error1, result1){
                if(error1){
                    throw error1;
                }
                response.writeHead(302, {Location: `/employee`});
                response.end();
          }
        );
      });
  }