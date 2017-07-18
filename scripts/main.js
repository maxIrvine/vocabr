var data = [];
var synonyms = [];
var antonyms = [];

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
            if (identifier === 'syn') {
                printSynAnt("syn");
                count++;
            } else {
                printSynAnt("ant");
            }
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function printSynAnt(identifier) {
    console.log("The type of data is: " + typeof data);
    for (word in data){
        var spot = data[word];
        // console.log(spot);
        if (identifier === "syn") {
            synonyms.push(spot["word"]);
        } else {
            antonyms.push(spot["word"]);
        }
    }
    if (identifier === "syn") {
        console.log("The synonyms are: " + synonyms);
    } else {
        console.log("The antonyms are: " + antonyms);
    }
}
