const crawler = require('./crawler');
const reledom = require('./reledom');
const schedule = require('./schedule');
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
   schedule( () => {
        crawler.then( ( html ) =>{
            console.log(html);
            reledom( html );
        })
    });
});

app.listen(3000);



