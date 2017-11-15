
const https = require('https');
const cheerio = require('cheerio');
const Promise = require('bluebird');
const fs = require('fs');

const sourceUrl = "https://csstriggers.com/";  //获取所有关注者主页访问地址路径

/**
 * 解析dom，获取数据
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
function initidolUrls( html ){
	let css = [];
    let $ = cheerio.load(html);
    let getCore = validateCore();
    $('.js-property.app-main__property').each(function(i,elem){
        let $this = $(this);
        let row = {};
        let $defaults = $this.find('.app-main__property-state-entry.initial');
        let defaults = {};
        let $update = $this.find('.app-main__property-state-entry.change');
        let update = {};

        row.name = $this.find('.property-name').text();
        $defaults.find('.app-main__property-engine').each(function(i,elem){
            let $this = $(this);
            let browser = getCore($this);
            defaults[browser] = serializeData($this.attr('title'));
        });
        row.defaults = defaults;
        $update.find('.app-main__property-engine').each(function(i,elem){
            let $this = $(this);
            let browser = getCore($this);
            update[browser] = serializeData($this.attr('title'));
        });
        row.update = update;
        css.push(row);
    })
    fs.writeFileSync('./csstrigger.json', JSON.stringify(css)); 
	return css;
}

/**
 * 确定浏览器内核
 */
 function validateCore( ){
     let core = ['blink','gecko','webkit','edgehtml'];
     return function( $dom ){
         for( let i=0,j=core.length; i<j; i++ ){
            if( $dom.hasClass( core[i] ) ){
                return core[i];
            }
         }
     }
 }

/**
 * 爬网站，获取dom
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getIdolIds( url ){
	return new Promise(function(resolve,reject){
		https.get(url, (res) => {
			let html;
			res.on('data', ( data ) => {
				html += data;
			})
			res.on('end', ()=>{
				resolve(html);
			})
		}).on('error',(e) =>{
			reject(e);
		})

	})
}

/**
 * 讲字符串序列化为obj
 */
function serializeData( text ){
    let ret = {};
    if( /no data available/.test( text ) ){
        return ret;
    }
    let reg = /((does not)? triggers?( layout| paint| compositing))/g;
    while( true ) {
       let match = reg.exec(text);
       if (!match) break;
       ret[match[3]] = match[2] === 'does not' ? false : true;
    }
    console.log(ret);
    return ret;
}
/**
 * 打印爬取对象信息
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function printObj( obj ){
}

var promise =  getIdolIds(sourceUrl);

promise.then((html) => {
    initidolUrls( html );
})