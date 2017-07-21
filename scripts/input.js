var $searchButton = $('[data-button="search"]');
var $searchField = $('[data-input="search-bar"]');
var $form = $('[data-form="info"]');

function search() {
    $form.on("submit", function(event) {
        event.preventDefault();
        console.log($searchField.val());
    });
}

search();