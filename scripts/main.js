var data = [];
var synonyms = [];

function callback(d) {
    data = d;
}

function getSynAnt(identifier, word){
    var url = "https://api.datamuse.com/words?rel_" + identifier + "=" + word;
    var xmlHttp = new XMLHttpRequest();
    var count = 0;
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.status == 200 && count < 1) {
            callback(data = JSON.parse(xmlHttp.responseText));
            printSynonym();
            count++;
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function printSynAnt() {
    for (word in data){
        var spot = data[word];
        // console.log(spot);
        synonyms.push(spot["word"]);
    }
    console.log(synonyms);
}
