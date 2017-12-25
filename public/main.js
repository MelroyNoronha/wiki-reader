const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const randomArticleBtn = document.getElementById("randomArticleBtn");

searchBox.addEventListener('input', () => {
    search(searchBox.value);
});
searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        search(searchBox.value);
    }
});
searchBtn.addEventListener('click', () => {
    search(searchBox.value);
});
randomArticleBtn.addEventListener('click', () => {
    renderRandomArticle();
})

function search(string) {
    let searchTerms = string;
    console.log(searchTerms);
    let wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerms}&utf8=`;
    fetchJsonp(wikiSearchUrl)
        .then(response => response.json())
        .then(data => console.log(data))
}

//replaces whitespaces with underscores in the string i.e 'Example String' to 'Example_String'
function sanitize(string) {
    let sanitizedString = '';
    sanitizedString = string.replace(" ", "_")
    return sanitizedString;
}

function renderRandomArticle() {
    let wikiRandomUrl = `https://en.wikipedia.org/wiki/Special:Random`;
}
