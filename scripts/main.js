var data = [];
var synonyms = [];
var antonyms = [];

function callback(d) {
    data = d;
}

function getSyn(word) {
    var requestUrl = "https://api.datamuse.com/words?ml=" + word;
    var request = new XMLHttpRequest();
    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var data = request.response;
        print(data)
    }
}

function print(data) {
    for (obj in data) {
        synonyms.push(data[obj]["word"]);
    }
    console.log(synonyms);
}
