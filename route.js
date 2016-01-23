'use strict';

/*
 {
ipaddress: "42.70.69.47",
language: "en-US",
software: "Windows NT 6.1; WOW64"
}

document.write("Version=" + navigator.appVersion);
document.write("<br />");
*/

module.exports = function( useragent, locale, app ) {

    app.route('/').get(function(req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    app.route('/api/whoami').get( function( req,res ){
        var retJson ={};
        var arr = req.headers["accept-language"];
        var str = arr.split(",");
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var ip_str =  req.connection.remoteAddress;
        var softwareValue = req.useragent.source;
        var tmpStr = softwareValue.substring(
                             softwareValue.indexOf('(')+1,
                             softwareValue.indexOf(')')  );
        console.log(tmpStr);

        retJson.ipaddress= ip_str ;
        retJson.language = str[0];
        retJson.software = tmpStr ;
        res.json( retJson );
    });

};
