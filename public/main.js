const searchBox = document.getElementById("searchBox");
const randomArticleBtn = document.getElementById("randomArticleBtn");
const searchResultsDiv = document.getElementById("searchResultsDiv");
const suggestionDiv = document.getElementById("suggestionDiv");
const contentDiv = document.getElementById("contentDiv");
let searchDataRaw;
let searchResults;
let suggestion;
let clickedResultNumber;

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
            suggestionDiv.innerHTML += ` Did you mean ${suggestion}?`
        }
    }

    for (let i = 0; i < searchResults.length; i++) {
        searchResultsDiv.innerHTML +=
            `<li id=${i} class="listItem">
                ${JSON.stringify(searchResults[i].title)}</br>
                ${JSON.stringify(searchResults[i].snippet)}
            </li>`;
    }
}

function openPageForSelectedResult(clickedElementNumber) {
    let clickedResultTitle = searchResults[clickedElementNumber].title;
    let normalizedTitle = normalizeTitle(clickedResultTitle);
    let wikiUrl = `https://en.wikipedia.org/wiki/${normalizedTitle}`
    searchResultsDiv.innerHTML = ``;
    contentDiv.innerHTML = `<iframe src=${wikiUrl}  scrolling="auto"></iframe>`
}
//replaces whitespaces with underscores in the string i.e 'Example String' to 'Example_String'
function normalizeTitle(string) {
    let normalizedString = string.replace(" ", "_")
    return normalizedString;
}

function openRandomArticle() {
    let wikiRandomArticleUrl = `https://en.wikipedia.org/wiki/Special:Random`;
    searchResultsDiv.innerHTML = ``;
    contentDiv.innerHTML = `<iframe src=${wikiRandomArticleUrl} scrolling="auto"></iframe>`;
}
