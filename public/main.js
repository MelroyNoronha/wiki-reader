const searchBox = document.getElementById("searchBox");
const randomArticleBtn = document.getElementById("randomArticleBtn");
const searchResultsDiv = document.getElementById("searchResultsDiv");
const suggestionDiv = document.getElementById("suggestionDiv");
const contentDiv = document.getElementById("contentDiv");
let searchDataRaw;
let searchResults;
let suggestions;
let clickedResult;

searchBox.addEventListener('input', () => {
    search(searchBox.value);
});

searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        search(searchBox.value);
    }
});

randomArticleBtn.addEventListener('click', () => {
    openRandomArticle();
})

searchResultsDiv.addEventListener('click', (e) => {
    clickedResultNumber = Number(e.target.id);
    openPageForSelectedResult(clickedResultNumber);
});

function search(string) {
    let searchTerms = string;
    let wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerms}&utf8=`;

    fetchJsonp(wikiSearchUrl)
        .then(response => response.json())
        .then((data) => {
            searchDataRaw = data;
            renderSearchResults(searchDataRaw);
        })

}

function renderSearchResults(jsonData) {
    searchResults = jsonData.query.search;
    suggestion = jsonData.query.searchinfo.suggestion;
    suggestionDiv.innerHTML = "";
    searchResultsDiv.innerHTML = "";

    if (searchResults.length <= 0) {
        suggestionDiv.innerHTML = `No results found for ${searchBox.value}.`;
        if (suggestion !== undefined) {
            suggestionDiv.innerHTML += `Did you mean ${suggestion}?`
        }
    }

    for (let i = 0; i < searchResults.length; i++) {
        searchResultsDiv.innerHTML +=
            `<li id=${i}>
                ${JSON.stringify(searchResults[i].title)}
                ${JSON.stringify(searchResults[i].snippet)}
            </li>`;
    }
}

function openPageForSelectedResult(clickedElementNumber) {
    let clickedResultTitle = searchResults[clickedElementNumber].title;
    let sanitizedTitle = sanitize(clickedResultTitle);
    let wikiRenderByTitleUrl = `https://en.wikipedia.org/w/index.php?action=render&title=${sanitizedTitle}`
    searchResultsDiv.innerHTML = ``;
    contentDiv.innerHTML = `<iframe src=${wikiRenderByTitleUrl}></iframe>`
}
//replaces whitespaces with underscores in the string i.e 'Example String' to 'Example_String'
function sanitize(string) {
    let sanitizedString = '';
    sanitizedString = string.replace(" ", "_")
    return sanitizedString;
}

function openRandomArticle() {
    let wikiRandomArticleUrl = `https://en.wikipedia.org/wiki/Special:Random`;
    searchResultsDiv.innerHTML = ``;
    contentDiv.innerHTML = `<iframe src=${wikiRandomArticleUrl}></iframe>`;
}