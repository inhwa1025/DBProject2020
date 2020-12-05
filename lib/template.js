var sanitizeHtml = require('sanitize-html');
 
module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>HairShop - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">HairShop</a></h1>
      
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  }


  
}