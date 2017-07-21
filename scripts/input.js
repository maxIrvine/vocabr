var $searchButton = $('[data-button="search"]');
var $searchField = $('[data-input="search-bar"]');
var $form = $('[data-form="info"]');
var $divDefinition = $('[data-field="definition"]');
var $divSynonym = $('[data-field="synonym"]');
var $divAntonym = $('[data-field="antonym"]');

var synonyms = [];
var examples = [];
var definitions = [];
var tense = [];

function getData() {
    synonyms = localStorage.getItem("synonyms");
    examples = localStorage.getItem("examples");
    definition = localStorage.getItem("definition");
    tense = localStorage.getItem("tense");
}

function addData(div, arr) {
    arr.forEach(function (data) {
		div.append(data);
	});
}

function main() {
    getData();
    addData($divDefinition, definitions);
    addData($divSynonym, synonyms);
}