var $searchButton = $('[data-button="search"]');
var $searchField = $('[data-input="search-bar"]');
var $form = $('[data-form="info"]');
var $divDefinition = $('[data-field="definition"]');
var $divSynonym = $('[data-field="synonym"]');
var $divAntonym = $('[data-field="antonym"]');
var $divTense = $('[data-field="tense"]');
var $divSuggestion = $('[data-field="suggestion"]');

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
    if (localStorage.getItem("suggestions") !== null) {
        $divSuggestion.addClass("show-suggestions");
        suggestions = localStorage.getItem("suggestions").toString();
        suggestions = suggestions.split(",");
        addData($divSuggestion, suggestions);
    } else {
        getData();
        addData($divTense, tense);
        addData($divDefinition, definition);
        addData($divSynonym, synonyms);
    }
}

main();