var tense = [];
var def = [];
var examples = [];
var suggestions = [];

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
		//take in string --> converts to XML
		var obj = StringToXML(request.response);
		console.log(obj);
		getTense(obj);
		return obj;
    }
}

function format(name, arr) {
	var lenArr = arr.length;
	var lenName = name.length;
	var count = 0;
	while (count < lenArr) {
		var word = arr[count];
		var lenWord = word.length;
		word = word.substring(lenName, lenWord-lenName-1);
		arr[count] = word;
		count++;
	}
	console.log(arr);
	return arr;
}

function getTense(xml) {
	var i = 0;
	//checks to see if data exists
	if (xml.getElementsByTagName('fl')[i] === undefined){
		//data doesn't exist so check suggested words
		checkSuggestions(xml);
	} else {
		//gets each fl element and pushes it to array as string
		var len = xml.getElementsByTagName("fl").length;
		while (i<len) {
			var fl = xml.getElementsByTagName('fl')[i];
			tense.push(new XMLSerializer().serializeToString(fl));
			i++;
		}
	}
	//formats array to not include tag names
	getDefinition(xml, len);
	format("<fl>", tense);
	
}

function getDefinition(xml, len) {
	var i = 0;
	while (i<len) {
		var entry = xml.getElementsByTagName("entry")[i];
		var mc = entry.getElementsByTagName("mc")[0];
		def.push(new XMLSerializer().serializeToString(mc));
		i++;
	}
	getExamples(xml, len);
	format("<mc>", def);
}

function getExamples(xml, len) {
	var i = 0;
	while (i<len) {
		var entry = xml.getElementsByTagName("entry")[i];
		var vi = entry.getElementsByTagName("vi")[0];
		examples.push(new XMLSerializer().serializeToString(vi));
		i++;
	}
	var noTags = format("<vi>", examples);
	examplesFormat(noTags, len);
}

function examplesFormat(arr, len) {
	var i = 0;
	while (i<len) {
		var wordStart = arr[i];
		var wordMiddle = arr[i];
		var wordEnd = arr[i];
		var lenWord = wordStart.length;
		var indexStart = wordStart.search("<it>");
		var indexEnd = wordStart.search("</it>");
		wordStart = wordStart.substring(0, indexStart);
		wordMiddle = wordMiddle.substring(indexStart+4, indexEnd);
		wordEnd = wordEnd.substring(indexEnd+5, lenWord);
		arr[i] = wordStart + wordMiddle + wordEnd;
		i++;
	}
	console.log(arr);
	return arr;
}



function checkSuggestions(xml) {
	console.log("here");
	var i = 0;
	var len = xml.getElementsByTagName("suggestion").length;
	while (i<len) {
		var sugest = xml.getElementsByTagName("suggestion")[i];
		suggestions.push(new XMLSerializer().serializeToString(sugest));
		i++;
	}
	console.log(suggestions);
	format("<suggestion>", suggestions);
}