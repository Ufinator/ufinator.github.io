const colors = require('cli-color');

function debugmsg(txt) {
    if (process.env.DEBUG != "1") {
        return;
    } else {
        var time = new Date();
        console.log(colors.blackBright(`[${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] | [DEBUG] ${txt}`));
    }
};

function error(txt) {
    var time = new Date();
    console.log(colors.redBright(`[${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] | [ERROR] ${txt}`));
}

// set proxy_set_header to forward the ip adress

function response(txt, statuscode, ipadress) {
    var time = new Date();
    if (statuscode >= 200 && statuscode <= 299) {
        console.log(colors.green(`[${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] | [${ipadress}] | [${statuscode}] ${txt}`));
    } else if (statuscode >= 400 && statuscode <= 499) {
        console.log(colors.red(`[${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] | [${ipadress}] | [${statuscode}] ${txt}`));
    } else if (statuscode >= 500 && statuscode <= 599) {
        console.log(colors.redBright.bold(`[${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] | [${ipadress}] | [${statuscode}] ${txt}`));
    } else {
        console.log(colors.blackBright(`[${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] | [${ipadress}] | [${statuscode}] ${txt}`));
    }
};

module.exports = {error, debugmsg, response};