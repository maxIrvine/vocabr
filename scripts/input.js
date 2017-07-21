var $searchButton = $('[data-button="search"]');
var $searchField = $('[data-input="search-bar"]');
var $form = $('[data-form="info"]');

//function returns whatever is entered in search bar
//will need to integrate to main.js or use global variables
function search() {
    $form.on("submit", function(event) {
        event.preventDefault();
        console.log($searchField.val());
    });
}

search();