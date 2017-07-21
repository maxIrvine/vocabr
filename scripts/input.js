var $searchButton = $('[data-button="search"]');
var $searchField = $('[data-input="search-bar"]');
var $form = $('[data-form="info"]');
var $divDefinition = $('[data-field="definition"]');
var $divSynonym = $('[data-field="synonym"]');
var $divAntonym = $('[data-field="antonym"]');
var $divSuggestion = $('[data-field="suggestion"]');

var synonyms = [];
var examples = [];
var definitions = [];
var tense = [];
var suggestions = [];

function getData() {
    synonyms = localStorage.getItem("synonyms").toString();
    synonyms = synonyms.split(",");
    examples = localStorage.getItem("examples").toString();
    examples = examples.split(",");
    definition = localStorage.getItem("definition").toString();
    definition = definition.split(",");
    tense = localStorage.getItem("tense").toString();
    tense = tense.split(",");
}

function addData(div, arr) {
    arr.forEach(function (data) {
		div.append(data + ", ");
	});
}

function main() {
    suggestions = localStorage.getItem("suggestions").toString();
    suggestions = suggestions.split(",");
    if (suggestions.length > 0) {
        addData($divSuggestion, suggestions);
    } else {
        getData();
        addData($divDefinition, definition);
        addData($divSynonym, synonyms);
    }
}

main();