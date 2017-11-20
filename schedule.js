var schedule = require('node-schedule');

function scheduleCronstyle( callback ){
    schedule.scheduleJob('30 * * * * *', function(){
        console.log( callback );
        callback && callback();
        console.log('scheduleCronstyle:' + new Date());
    }); 
}
module.exports = scheduleCronstyle;