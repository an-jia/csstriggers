const https = require('https');
const Promise = require('bluebird');

const sourceUrl = "https://csstriggers.com/";  //获取所有关注者主页访问地址路径
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
 * 打印爬取对象信息
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function printObj( obj ){
}

var promise =  getIdolIds(sourceUrl);

module.exports = promise
