let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<h1><% console.log("ok"); %> <%= people.join(", "); %></h1>', {people: people});
console.log(html)