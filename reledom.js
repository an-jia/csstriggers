const cheerio = require('cheerio');
const fs = require('fs');

/**
 * 解析dom，获取数据
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
function reledom( html ){
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
    console.log('写入文件');
    fs.writeFileSync('./csstrigger.json', JSON.stringify(css)); 
	return css;
}
module.exports = reledom;