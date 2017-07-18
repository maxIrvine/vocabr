var data = [];
var lang = {
    'ml' : [],
    'syn' : [],
    'def' : []
};

function xmlToJson(xml) {
	// Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}
	// do children
	// If just one text node inside
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	}
	else if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}

function StringToXML(oString) {
	//code for IE
	if (window.ActiveXObject) { 
		var oXML = new ActiveXObject("Microsoft.XMLDOM"); oXML.loadXML(oString);
		return oXML;
	}
	// code for Chrome, Safari, Firefox, Opera, etc. 
	else {
		return (new DOMParser()).parseFromString(oString, "text/xml");
	}
}

function getStuff(word) {
	var url = "http://www.dictionaryapi.com/api/v1/references/ithesaurus/xml/" + word + "?key=f9662fe2-1f62-4b25-90bc-8aba215b919c";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function() {
        var data = request.response;
        console.log(data);
		var newData = StringToXML(data);
		console.log("The typeof data is: " + typeof newData);
        // print(identifier, data)
		var obj = xmlToJson(newData);
		console.log(obj);
    }
}

// function getDataHelper(url, identifier) {
//     var request = new XMLHttpRequest();
//     request.open('GET', url);
//     request.responseType = 'json';
//     request.send();
//     request.onload = function() {
//         var data = request.response;
//         console.log(data);
//         print(identifier, data)
//     }
// }
function getDataHelper(url, identifier) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    var xml = request.responseXML;
    request.onload = function() {
        var data = request.response;
        console.log(data);
        print(identifier, data)
    }
}

function getData(word) {
    var urlML = "https://api.datamuse.com/words?ml=" + word;
    var urlANT = "https://api.datamuse.com/words?rel_syn=" + word;
    getDataHelper(urlML, 'ml');
    getDataHelper(urlANT, 'syn');
}

function print(identifier, data) {
    for (obj in data) {
        lang[identifier].push(data[obj]["word"]);
    }
    console.log(lang[identifier]);
}
