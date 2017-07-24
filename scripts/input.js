var $searchButton = $('[data-button="search"]');
var $searchField = $('[data-input="search-bar"]');
var $form = $('[data-form="info"]');
var $divDefinition = $('[data-field="definition"]');
var $divExamples = $('[data-field="examples"]');
var $divSynonym = $('[data-field="synonym"]');
var $divAntonym = $('[data-field="antonym"]');
var $divTense = $('[data-field="tense"]');
var $divSuggestion = $('[data-field="suggestion"]');
var $word = $('[data-field="word"]');

function getDataDisplay() {
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
    var len = arr.length;
    for (var i=0;i<len;i++) {
        div.append(" (" + (i+1) + ")" + arr[i]);
    }
}

function main() {
    if (localStorage.getItem("suggestions") !== null) {
        $divSuggestion.addClass("show-suggestions");
        suggestions = localStorage.getItem("suggestions").toString();
        suggestions = suggestions.split(",");
        addData($divSuggestion, suggestions);
        localStorage.removeItem("suggestions");
    } else {
        getDataDisplay();
        addData($divTense, tense);
		$word.append(localStorage.getItem("word"));
        addData($divDefinition, definition);
        addData($divExamples, examples);
        addData($divSynonym, synonyms);
    }
}

main();