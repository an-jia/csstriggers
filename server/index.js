const crawler = require('./crawler');
const reledom = require('./reledom');
const schedule = require('./schedule');
const Koa = require('koa');
const app = new Koa();

// app.use(async ctx => {
// });
// app.listen(3000);

schedule( () => {
    crawler.then( ( html ) =>{
        console.log(html);
        reledom( html );
    })
});