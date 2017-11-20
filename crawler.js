const https = require('https');
const Promise = require('bluebird');

const sourceUrl = "https://csstriggers.com/";  //获取所有关注者主页访问地址路径
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
            console.log(11111);
			let html;
			res.on('data', ( data ) => {
				html += data;
			})
			res.on('end', ()=>{
				resolve(html);
			})
		}).on('error',(e) =>{
            console.log(222222);
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

module.exports = promise
