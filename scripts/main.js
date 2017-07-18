var data = [];
var lang = {
    'ml' : [],
    'ant' : [],
    'def' : []
};

function callback(d) {
    data = d;
}

function getData(identifier, word) {
    var requestUrl = "https://api.datamuse.com/words?" + identifier + "=" + word;
    var request = new XMLHttpRequest();
    request.open('GET', requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var data = request.response;
        print(identifier, data)
    }
}

function print(identifier, data) {
    for (obj in data) {
        lang[identifier].push(data[obj]["word"]);
    }
    console.log(lang[identifier]);
}
