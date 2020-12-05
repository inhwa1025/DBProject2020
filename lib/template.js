var sanitizeHtml = require('sanitize-html');
 
module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>HairShop Manage- ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">HairShop</a></h1>
      
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(reserves){
    var list = '<ul>';
    var i = 0;
    while(i < reserves.length){
      list = list + `<li><a href="/?id=${reserves[i].reserveid}">${sanitizeHtml(reserves[i].date)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },reserveTable:function(reserves){
    var tag = '<table>';
    var i = 0;
    while(i < reserves.length){
        tag += `
            <tr>
                <td>${sanitizeHtml(reserves[i].date)}</td>
                <td>${sanitizeHtml(reserves[i].custid)}</td>
                <td><a href="/author/update?id=${reserves[i].reserveid}">update</a></td>
                <td>
                  <form action="/author/delete_process" method="post">
                    <input type="hidden" name="id" value="${reserves[i].id}">
                    <input type="submit" value="delete">
                  </form>
                </td>
            </tr>
            `
        i++;
    }
    tag += '</table>';
    return tag;
  }



}