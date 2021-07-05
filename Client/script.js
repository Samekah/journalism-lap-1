class Article {
    constructor(length, article){
        this.id = length + 1;
        this.tag = "Music"
        this.article = article;
        this.date = new Date();
        this.comments = [];
        this.emoji1 = 0;
        this.emoji2 = 0;
        this.emoji3 = 0;
    }
}
let targetParagraph = document.getElementById("test");
let musicButton = document.getElementById("musicSubmit");
musicButton.addEventListener('click', getMusicData);
let sportButton = document.getElementById("sportSubmit");
sportButton.addEventListener('click', getSportData);
let allButton = document.getElementById('allData');
allButton.addEventListener('click', getAllData)
let formButton = document.getElementById('formSubmit');
formButton.addEventListener('click', getDataLength);
let textArea = document.getElementById('articleToSubmit');
let musicRadioButton = document.getElementById('music');
let sportRadioButton = document.getElementById('sport');
let otherRadioButton = document.getElementById('other');
textArea.addEventListener('change', () => {
    if (textArea.value){
        if (musicRadioButton.checked || sportRadioButton.checked || otherRadioButton.checked){
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

async function getMusicData(){
    let data = await fetch("http://localhost:3000/data/Music");
    let dataJson = await data.json();
    extractArticles(dataJson);
}

async function getSportData(){
    let data = await fetch("http://localhost:3000/data/Sport");
    let dataJson = await data.json();
    extractArticles(dataJson);
}

async function getAllData(){
    let data = await fetch("http://localhost:3000/data");
    let dataJson = await data.json();
    extractArticles(dataJson);
}

function extractArticles(data){
    for (let i=0; i<data.length; i++){
        let titleHeader = document.createElement('h2');
        titleHeader.textContent = data[i].title;
        targetParagraph.append(titleHeader);
        let timeStamp = document.createElement('h4');
        let timeStampYear = data[i].date.slice(0,10);
        let timeStampTime = data[i].date.slice(11,16);
        timeStamp.textContent = `${timeStampYear}, ${timeStampTime}`
        targetParagraph.append(timeStamp);

        let para = document.createElement('p');
        para.textContent = data[i].article;
        targetParagraph.append(para);
        // emojiReacts1 = data[i].emoji1;
        // emojiReacts2 = data[i].emoji2;
        // emojiReacts3 = data[i].emoji3;
        // for (let j=0; j<3; j++){
        //     let emojiButton = document.createElement('button');
        //     let emojiCounter = document.createElement('h5');
        //     let toCall = 0;
        //     emojiCounter.textContent = toCall;
        //     emojiButton.id = `emoji${j+1}Btn`;
        //     emojiButton.textContent = `Emoji ${j+1}`;
        //     targetParagraph.append(emojiButton);
        //     targetParagraph.append(emojiCounter);
        // }
        let emoji1Reacts = data[i].emoji1;
        let emoji2Reacts = data[i].emoji2;
        let emoji3Reacts = data[i].emoji3;
        let emojiButton1 = document.createElement('button');
        let emojiCounter1 = document.createElement('h5');
        emojiCounter1.textContent = emoji1Reacts;
        emojiButton1.id = `id${i+1}Emoji1Btn`;
        emojiCounter1.id  = `id${i + 1}EmojiCounter1`;
        emojiButton1.textContent = "Emoji 1";
        emojiButton1.addEventListener('click', () => 
        {updateReactValue(data[i].id, 'emojiButton1')
        emojiButton1.disabled = true;
        });
        let emojiButton2 = document.createElement('button');
        let emojiCounter2 = document.createElement('h5');
        emojiCounter2.textContent = emoji2Reacts;
        emojiButton2.id = `id${i+1}Emoji2Btn`;
        emojiCounter2.id  = `id${i + 1}EmojiCounter2`;
        emojiButton2.textContent = "Emoji 2";
        emojiButton2.addEventListener('click', () => 
        {updateReactValue(data[i].id, 'emojiButton2')
        emojiButton2.disabled = true;
        });
        let emojiButton3 = document.createElement('button');
        let emojiCounter3 = document.createElement('h5');
        emojiCounter3.textContent = emoji3Reacts;
        emojiButton3.id = `id${i+1}Emoji3Btn`;
        emojiCounter3.id  = `id${i + 1}EmojiCounter3`;
        emojiButton3.textContent = "Emoji 3";
        emojiButton3.addEventListener('click', () => 
        {updateReactValue(data[i].id, 'emojiButton3')
        emojiButton3.disabled = true;});        
        
        targetParagraph.append(emojiButton1);
        targetParagraph.append(emojiCounter1);
        targetParagraph.append(emojiButton2);
        targetParagraph.append(emojiCounter2);
        targetParagraph.append(emojiButton3);
        targetParagraph.append(emojiCounter3);

        let lineBreak = document.createElement('br');
        let anotherLineBreak = document.createElement('br');
        targetParagraph.append(lineBreak);
        targetParagraph.append(anotherLineBreak);
        let newHeader = document.createElement('h3');
        newHeader.textContent = "Comments section"
        targetParagraph.append(newHeader);
        let newCommentArea = document.createElement('textarea');
        newCommentArea.cols = "33";
        newCommentArea.rows = "5";
        newCommentArea.id = "newComment";
        targetParagraph.append(newCommentArea);
        let yetAnotherLineBreak = document.createElement('br');
        targetParagraph.append(yetAnotherLineBreak);
        let commentAppendButton = document.createElement('button');
        commentAppendButton.textContent = "Submit your comment";
        commentAppendButton.addEventListener('click', ()=>{
            addAComment(newCommentArea.value, i + 1);
        })
        targetParagraph.append(commentAppendButton);

        if (data[i].comments){
            for (let j=0; j<data[i].comments.length; j++){
                let comment = document.createElement('p');
                comment.textContent = data[i].comments[j];
                targetParagraph.append(comment);
            } 
        }


    }

};

async function getDataLength(e){
    e.preventDefault();
    let data = await fetch("http://localhost:3000/data");
    let dataJson = await data.json();
    addNewArticle(dataJson.length);
    
}

function addNewArticle(length){
    let textField = document.getElementById("articleToSubmit");
    console.log("I'm here");
    let dataToSend = new Article(length, textField.value);
    // let dataToSend = {
    //     id: length + 1,
    //     tag: "Music",
    //     article: textField.value,
    //     other: "today",
    //     emoji1: 0,
    //     emoji2: 0,
    //     emoji3: 0
    // }
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

function updateReactValue(id, buttonString){
    let dataToSend = {
        id: id,
        buttonClicked: buttonString
    }
    createPutRequest(dataToSend);
}


async function createPutRequest(jsonObject){
    const reponse = await fetch("http://localhost:3000/data", {
        method: "PUT", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    reFetchEmojiValue(jsonObject)
}

async function reFetchEmojiValue(object){
    let data = await fetch("http://localhost:3000/data");
    let dataJson = await data.json();
    let id = object.id;
    let buttonValue = object.buttonClicked;
    let requestedArticle = dataJson.find(dataSet => dataSet.id === id);
    if (buttonValue === "emojiButton1"){
        let toUpdate = document.getElementById(`id${id}EmojiCounter1`);
        toUpdate.textContent = requestedArticle.emoji1;
    } else if (buttonValue === "emojiButton2"){
        let toUpdate = document.getElementById(`id${id}EmojiCounter2`);
        toUpdate.textContent = requestedArticle.emoji2;
    } else if (buttonValue === "emojiButton3"){
        let toUpdate = document.getElementById(`id${id}EmojiCounter3`);
        toUpdate.textContent = requestedArticle.emoji3;
    }
}

function addAComment(comment, id){
    let dataToSend = {
        id: id,
        commentContent: comment
    }
    createCommentPutRequest(dataToSend);
}

async function createCommentPutRequest(jsonObject){
    const reponse = await fetch("http://localhost:3000/", {
        method: "PUT", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonObject)
    });
    console.log(jsonObject);
    reFetchComments(jsonObject)
}

async function reFetchComments(){
    let data = await fetch("http://localhost:3000/");
    let dataJson = await data.json();
    let id = object.id;
    let requestedArticle = dataJson.find(dataSet => dataSet.id === id);
    let newComment = document.createElement('p');
    newComment.textContent = requestedArticle.comments[requestedArticle.comments.length - 1];
    targetParagraph.append(newComment);
}
