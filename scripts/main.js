var $searchButton = $('[data-button="search"]');
var $searchField = $('[data-input="search-bar"]');
var $form = $('[data-form="info"]');
var $divDefinition = $('[data-field="definition"]');
var $divSynonym = $('[data-field="synonym"]');
var $divAntonym = $('[data-field="antonym"]');

var nearAntonyms = [];
var antonyms = [];
var suggestions = [];

//function returns whatever is entered in search bar
//will need to integrate to main.js or use global variables
function search() {
	console.log("here");
    $form.on("submit", function(event) {
        event.preventDefault();
		console.log("submitted");
		var word = $searchField.val()
        getData(word);
		console.log("after get data");
    });
}

search();

function  addData(div, arr) {
	arr.forEach(function (data) {
		div.append(data);
	})
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
	console.log("in get data");
	var url = "http://www.dictionaryapi.com/api/v1/references/ithesaurus/xml/" + word + "?key=f9662fe2-1f62-4b25-90bc-8aba215b919c";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function() {
		//take in string --> converts to XML
		var obj = StringToXML(request.response);
		// console.log(obj);
		getTense(obj, word);
		//window.location() goes here
		window.location.assign("page.html");
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

function getTense(xml, word) {
	var w = word;
	console.log(w);
	var tense = [];
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
		getDefinition(xml, len, w);
		console.log(word);
		format("<fl>", tense);
		localStorage.setItem("tense", tense);
		localStorage.setItem("word", w);
		addData($divDefinition,tense);
	}
	//formats array to not include tag names
}

function getDefinition(xml, len, w) {
	var word = w;
	var def = [];
	var i = 0;
	while (i<len) {
		var entry = xml.getElementsByTagName("entry")[i];
		var mc = entry.getElementsByTagName("mc")[0];
		def.push(new XMLSerializer().serializeToString(mc));
		i++;
	}
	getExamples(xml, len, word);
	format("<mc>", def);
	localStorage.setItem("definition", def);
}

function getExamples(xml, len, word) {
	var examples = [];
	var i = 0;
	while (i<len) {
		var entry = xml.getElementsByTagName("entry")[i];
		var vi = entry.getElementsByTagName("vi")[0];
		examples.push(new XMLSerializer().serializeToString(vi));
		i++;
	}
	var noTags = format("<vi>", examples);
	getSynonyms(xml, len, word);
	examplesFormat(noTags, len);
	localStorage.setItem("examples", examples);
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

function getSynonyms(xml, len, word) {
	var synonyms = [];
	var i = 0;
	while (i<len) {
		var entry = xml.getElementsByTagName("entry")[i];
		var syn = entry.getElementsByTagName("syn")[0];
		synonyms.push(new XMLSerializer().serializeToString(syn));
		i++;
	}
	// getNearAntonyms(xml, len);
	format("<syn>", synonyms);
	localStorage.setItem("synonyms", synonyms);
}

function getNearAntonyms(xml, len) {
	var i = 0;
	while (i<len) {
		var entry = xml.getElementsByTagName("entry")[i];
		var nearAnt = entry.getElementsByTagName("near")[0];
		nearAntonyms.push(new XMLSerializer().serializeToString(nearAnt));
		i++;
	}
	format("<near>", nearAntonyms);
}



function checkSuggestions(xml) {
	// console.log("here");
	var i = 0;
	var len = xml.getElementsByTagName("suggestion").length;
	while (i<len) {
		var sugest = xml.getElementsByTagName("suggestion")[i];
		suggestions.push(new XMLSerializer().serializeToString(sugest));
		i++;
	}
	// console.log(suggestions);
	format("<suggestion>", suggestions);
	localStorage.setItem("suggestions", suggestions);
}