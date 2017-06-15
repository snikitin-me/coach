var fs = require('fs');
var path = require('path');

if (process.argv.length !== 3) {
    console.error('Использование: node convert.js файл_выгрузки');
    process.exit(1);
}

var exportFileContents = fs.readFileSync(process.argv[2], "utf8");
var prettyDataStr = JSON.stringify(convertToArticles(exportFileContents), null, 4);
fs.writeFileSync(process.argv[2] + '.json', prettyDataStr);


function convertToArticles(text) {
    var fragments = [];
    text.split("\n").forEach(function(item, index, array) {
        var isNum = /^(\d+)$/m.test(item);

        //console.log(item)

        if (isNum) {
            var fromTo = array[index + 1].match(/(\d+:\d+:\d+,\d+)/gm);
            fragments.push({
                from: timeToSeconds(fromTo[0]),
                to: timeToSeconds(fromTo[1]),
                text: array[index + 2] + array[index + 3]
            })
        }
    }.bind(this));

    // TODO: Split a fragments into segments ~3 minuts each
    var response = [{
        time: "11:00",
        fragments: fragments
    }]
console.log(response)
    return response;
}


// TODO: add ms
function timeToSeconds(str) {
    var p = str.split(':'),
        s = 0,
        m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}
