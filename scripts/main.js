var info = [
	{
		'fl' : '',
		'mc' : '',
		'syn' : '',
		'near' : '',
		'ant' : '',
	},
	{
		'fl' : '',
		'mc' : '',
		'syn' : '',
		'near' : '',
		'ant' : '',
	},
	{
		'fl' : '',
		'mc' : '',
		'syn' : '',
		'near' : '',
		'ant' : '',
	},
	{
		'fl' : '',
		'mc' : '',
		'syn' : '',
		'near' : '',
		'ant' : '',
	}
];

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

function getData(word) {
	var url = "http://www.dictionaryapi.com/api/v1/references/ithesaurus/xml/" + word + "?key=f9662fe2-1f62-4b25-90bc-8aba215b919c";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function() {
		//take in string --> converts to XML --> converts to JSON
		var obj = xmlToJson(StringToXML(request.response));
		console.log(obj);
		//indexes the entery object which contains data
		obj = obj['entry_list']['entry'];
		//condenses the data and adds to the info array
		var info = addToInfo(condense(obj));
		// console.log(info);
		return info;
    }
}

function condense(data) {
	var versions = [];
	// removes id objects and hw objects
	for (index in data) {
		var object1 = data[index];
		if (!(object1.hasOwnProperty('id')) || !(object1.hasOwnProperty('hw'))){
			versions.push(object1);
		}
	}
	// remove if sens object is greater than 1
	for (index in versions) {
		var object2 = versions[index]["sens"];
		var objectLen = object2.length;
		var getFirstObject = object2[0];
		
		if (objectLen > 1) {
			for (var i = 1;i<objectLen;i++) {
				delete object2[i];
			}
		}
	}
	console.log(versions);
	return versions;
}

function addToInfo(data) {
	var count = 0;
	while (count < 4) {
		// console.log(info[count]);
		// console.log(data[0]);
		info[count]['fl'] = data[count]['fl'];
		info[count]['mc'] = data[count]['sens']['mc'];
		info[count]['syn'] = data[count]['sens']['syn'];
		info[count]['near'] = data[count]['sens']['near'];
		info[count]['ant'] = data[count]['sens']['ant'];
	}
	console.log(info);
}


// function applyData(data) {

// }

function main(word){
	var data = getData(word);
	console.log(data);
	// var inf = addToInfo(data);
	// var appl = applyData(data);
}