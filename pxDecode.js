#!/usr/bin/env node
var colors = require('colors');
var fs = require('fs');
const {Base64} = require('js-base64');


let pxDecodeStrings = function (path) {
    let cgtRegex = /(?=\Cgt)(.*?)(?=\")/g

    function atob(str) {
        return Buffer.from(str, 'base64').toString('binary');
    }
    
    function decodePxString(encoded) {
        for(var i = atob(encoded), a = "ZSA8q7L", c = "", u = 0; u < i.length; ++u) {
            var f = a.charCodeAt(u % 7);
            c += String.fromCharCode(f ^ i.charCodeAt(u));
        }
        return c;
    }

    let encodedScript = fs.readFileSync(path, 'utf8')
    let decodedScript = encodedScript.replace(cgtRegex, (cgtString) => {
        return decodePxString(cgtString)
    })

    return decodedScript
}

module.exports = {pxDecodeStrings}
    