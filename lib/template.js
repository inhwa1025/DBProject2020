var sanitizeHtml = require('sanitize-html');
 
module.exports = {
  HTML:function(title, control, body){
    return `
    <!doctype html>
    <html>
    <head>
      <title>HairShop- ${title}</title>
      <meta charset="utf-8">
    </head>
    <style type="text/css">
      a {text-decoration:none}
      .atag {
        text-align: center;
      }
      body {
        background-color: #E1F6FA;
      }
      span {
        width: 100px; height: 20px;
        border: 1px; padding: 5px;
        margin: 10px;
      }
      #span2 {background-color: #B9E2FA}
    </style>
    <body>
      <center>
        <h1><a href="/" style="color: #1E3269">HairShop Manage System</a></h1>
        <p><hr color = "black"></hr></p>
        <body>
          <B><span id="span2"><a href="/">예약 관리</a></span></B>
          <B><span id="span2"><a href="/customer">고객 관리</a></span></B>
          <B><span id="span2"><a href="/stock">물품 관리</a></span></B>
          <B><span id="span2"><a href="/purchase">물품 구매 내역</a></span></B>
          <B><span id="span2"><a href="/employee">직원 관리</a></span></B>
        </body>
        <p><hr color = "black"></hr></p>
        ${control}
        ${body}
      </center>
    </body>
    </html>
    `;
  },
  
  list:function(reserves){
    var list = '<ul>';
    var i = 0;
    while(i < reserves.length){
      list = list + `<li><a href="/?id=${reserves[i].reserveid}">${sanitizeHtml(reserves[i].date)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },
  
  reserveTable:function(reserves){
    var tag = '<table>';
    tag += `
      <th>예약날짜</th>
      <th>예약자</th>
      <th>시술</th>
      <th>지정 디자이너</th>
    `;
    var i = 0;
    while(i < reserves.length){
        tag += `
            <tr>
                <td>${sanitizeHtml(reserves[i].date)}</td>
                <td>${sanitizeHtml(reserves[i].name)}</td>
                <td>${sanitizeHtml(reserves[i].sisul)}</td>
                <td>${sanitizeHtml(reserves[i].designer)}</td>
                <td><a href="/update?id=${reserves[i].id}">update</a></td>
                <td>
                  <form action="/delete_process" method="post">
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
  },

  designerSelect:function(designers, empid){
    var tag = '';
    var i = 0;
    while(i < designers.length){
      var selected = '';
      if(designers[i].empid === empid) {
        selected = ' selected';
      }
      tag += `<option value="${designers[i].empid}"${selected}>${sanitizeHtml(designers[i].name)}</option>`;
      i++;
    }
    return `
      <select name="designer">
        ${tag}
      </select>
    `
  },

  stockTable:function(stocks){
    var tag = '<table>';
    tag += `
      <th>물품번호</th>
      <th>물품이름</th>
      <th>사용기한</th>
      <th>수량</th>
    `;
    var i = 0;
    while(i < stocks.length){
        tag += `
            <tr>
                <td>${sanitizeHtml(stocks[i].stockid)}</td>
                <td>${sanitizeHtml(stocks[i].stockname)}</td>
                <td>${sanitizeHtml(stocks[i].usedate)}</td>
                <td>${sanitizeHtml(stocks[i].quantity)}</td>
                <td><a href="/stock/update?id=${stocks[i].stockid}">update</a></td>
                <td>
                  <form action="/stock/delete_process" method="post">
                    <input type="hidden" name="stockid" value="${stocks[i].stockid}">
                    <input type="submit" value="delete">
                  </form>
                </td>
            </tr>
            `
        i++;
    }
    tag += '</table>';
    return tag;
  },

  purchaseTable:function(purchases){
    var tag = '<table>';
    tag += `
      <th>주문번호</th>
      <th>주문날짜</th>
      <th>물품이름</th>
      <th>거래처</th>
      <th>사용기한</th>
      <th>수량</th>
    `;
    var i = 0;
    while(i < purchases.length){
        tag += `
            <tr>
                <td>${sanitizeHtml(purchases[i].ordernum)}</td>
                <td>${sanitizeHtml(purchases[i].orderdate)}</td>
                <td>${sanitizeHtml(purchases[i].stockname)}</td>
                <td>${sanitizeHtml(purchases[i].store)}</td>
                <td>${sanitizeHtml(purchases[i].usedate)}</td>
                <td>${sanitizeHtml(purchases[i].quantity)}</td>
                <td><a href="/purchase/update?id=${purchases[i].ordernum}">update</a></td>
                <td>
                  <form action="/purchase/delete_process" method="post">
                    <input type="hidden" name="ordernum" value="${purchases[i].ordernum}">
                    <input type="submit" value="delete">
                  </form>
                </td>
            </tr>
            `
        i++;
    }
    tag += '</table>';
    return tag;
  },

  customerTable:function(customers){
    var tag = '<table>';
    tag += `
      <th>id</th>
      <th>name</th>
      <th>phone number</th>
    `;
    var i = 0;
    while(i < customers.length){
        tag += `
            <tr>
                <td>${sanitizeHtml(customers[i].custid)}</td>
                <td>${sanitizeHtml(customers[i].name)}</td>
                <td>${sanitizeHtml(customers[i].phone)}</td>
                <td><a href="/customer/update?id=${customers[i].custid}">update</a></td>
                <td>
                  <form action="/customer/delete_process" method="post">
                    <input type="hidden" name="custid" value="${customers[i].custid}">
                    <input type="submit" value="delete">
                  </form>
                </td>
            </tr>
            `
        i++;
    }
    tag += '</table>';
    return tag;
  },

  employeeTable:function(employees){
    var tag = '<table>';
    tag += `
      <th>id</th>
      <th>name</th>
      <th>title</th>
      <th>phone number</th>
      <th>hire date</th>
      <th>manager</th>
    `;
    var i = 0;
    while(i < employees.length){
        tag += `
            <tr>
                <td>${sanitizeHtml(employees[i].empid)}</td>
                <td>${sanitizeHtml(employees[i].name)}</td>
                <td>${sanitizeHtml(employees[i].title)}</td>
                <td>${sanitizeHtml(employees[i].phone)}</td>
                <td>${sanitizeHtml(employees[i].hiredate)}</td>
                <td>${sanitizeHtml(employees[i].manager)}</td>
                <td><a href="/employee/update?id=${employees[i].empid}">update</a></td>
                <td>
                  <form action="/employee/delete_process" method="post">
                    <input type="hidden" name="custid" value="${employees[i].empid}">
                    <input type="submit" value="delete">
                  </form>
                </td>
            </tr>
            `
        i++;
    }
    tag += '</table>';
    return tag;
  },

}