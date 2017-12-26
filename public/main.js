const searchBox = document.getElementById("searchBox");
const searchResultsDiv = document.getElementById("searchResultsDiv");
const suggestionDiv = document.getElementById("suggestionDiv");
let searchData;
let searchResults;
let suggestions;

searchBox.addEventListener('input', () => {
    search(searchBox.value);
});
searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        search(searchBox.value);
        renderSearchResults(searchData);
    }
});

function search(string) {
    let searchTerms = string;
    let wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerms}&utf8=`;
    fetchJsonp(wikiSearchUrl)
        .then(response => response.json())
        .then(data => searchData = data)
}

function renderSearchResults(jsonData) {
    console.log(jsonData);
    searchResults = jsonData.query.search;
    suggestion = jsonData.query.searchinfo.suggestion;
    searchResultsDiv.innerHTML = ``;
    if (searchResults.length <= 0) {
        suggestionDiv.innerHTML = `No results found for ${searchBox.value}. Did you mean ${suggestion}?`;
    }
    for (let i = 0; i < searchResults.length; i++) {
        searchResultsDiv.innerHTML += `<b>${JSON.stringify(searchResults[i].title)}</b> ${JSON.stringify(searchResults[i].snippet)}</br>`;
    }

}

//replaces whitespaces with underscores in the string i.e 'Example String' to 'Example_String'
function sanitize(string) {
    let sanitizedString = '';
    sanitizedString = string.replace(" ", "_")
    return sanitizedString;
}
