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


function search(string) {
    let searchTerms = sanitize(string);
    let wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerms}&utf8=`;
}

//sanitizes the string as per wikipedia's API specs i.e exampleString to Example_string
function sanitize(string) {
    let sanitizedString = '';
    string = string.split('');
    for (let i = 0; i < string.length; i++) {
        console.log(sanitizedString);
        if (i == 0) {
            sanitizedString += string[i].toUpperCase();
        } else {
            sanitizedString += string[i].toLowerCase();
        }
    }
    sanitizedString = sanitizedString.replace(" ", "_")
    return sanitizedString;
}
