class Article {
    constructor(length, article, tag, title){
        this.title = title;
        this.id = length + 1;
        this.tag = tag;
        this.article = article;
        this.date = new Date();
        this.comments = [];
        this.emoji1 = 0;
        this.emoji2 = 0;
        this.emoji3 = 0;
    }
}
const API_KEY = "MjgWi5LAv7OcAlh9hzV3qtIF8G9eb4o3";

let targetParagraph = document.getElementById("test");
let titleInput = document.getElementById("postTitle");
let formButton = document.getElementById('formSubmit');
formButton.addEventListener('click', getDataLength);
let textArea = document.getElementById('articleToSubmit');
let musicRadioButton = document.getElementById('music');
let sportRadioButton = document.getElementById('sport');
let lifestyleRadioButton = document.getElementById('lifestyle');
let filmRadioButton = document.getElementById('film');
let newsRadioButton = document.getElementById('news');
let otherRadioButton = document.getElementById('other');
let giphyButton = document.getElementById('giphSearch');
giphyButton.addEventListener('click', searchGif)
textArea.addEventListener('change', () => {
    if (textArea.value){
        if (musicRadioButton.checked || sportRadioButton.checked || otherRadioButton.checked || newsRadioButton.checked || filmRadioButton.checked || lifestyleRadioButton.checked){
            formButton.disabled = false;
        } 
    } else {
        formButton.disabled = true;
    }

})
musicRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
sportRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
otherRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
lifestyleRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
filmRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})
newsRadioButton.addEventListener('click', () => {
    if (textArea.value){
        formButton.disabled = false;
    }
})

async function getDataLength(e){
    e.preventDefault();
    let data = await fetch("http://localhost:3000/data");
    let dataJson = await data.json();
    addNewArticle(dataJson.length);
    
}

function addNewArticle(length){
    let textField = document.getElementById("articleToSubmit");
    let list = document.querySelectorAll('input[name="tag"]');
    let checkedButton;
    let titleToUse = "";
    console.log(list);
    for (const x of list){
        if (x.checked === true){
            checkedButton = x.value;
        }
    }
    console.log(checkedButton);
    if (titleInput){
        titleToUse = titleInput.value;
    } else {
        titleToUse = `Article ${length + 1}`;
    }
    let dataToSend = new Article(length, textField.value, checkedButton, titleToUse);
    console.log(dataToSend);
    postJsonData(dataToSend);
}

async function postJsonData(jsonObject) {
    const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    const actualResponse = await response.json();
}

async function searchGif(e){
    e.preventDefault();
    let searchQuery = document.getElementById('giphyFinder').value;
    let giphyAPIURL = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&rating=g&api_key=${API_KEY}&limit=6`;
    let fetchedData = await fetch(giphyAPIURL);
    let dataJson = await fetchedData.json();
    console.log(dataJson);
    console.log(dataJson.data[0].embed_url);
    appendGifs(dataJson);
}

function appendGifs(json){
    let sectionToAppend = document.getElementById('gifSection');
    let imgPath = json.data[0].images.fixed_height.url;
    let img = document.createElement('img');
    let imgButton = document.createElement('button');
    imgButton.addEventListener('click', (e)=>{
        e.preventDefault();
        addToTextArea(imgPath);
    });
    imgButton.classList.add("removeBorder");
    img.setAttribute("src", imgPath);
    imgButton.append(img);
    sectionToAppend.append(imgButton);
}

function addToTextArea(imgPath){
    let chosenImg = document.createElement('img');
    // chosenImg. = "importedGif"
    chosenImg.setAttribute("src", imgPath);
    textArea.append(chosenImg);
}