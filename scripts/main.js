var data = [];
var synonyms = [];

function callback(d) {
    data = d
    console.log(data);
}

function getSynonym(word){
    var url = "https://api.datamuse.com/words?ml=" + word;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
    // console.log(data);
}

function printSynonym() {
    for (word in data){
        var spot = data[word];
        console.log(spot);
        synonyms.push(spot["word"]);
    }
    console.log(synonyms);
}