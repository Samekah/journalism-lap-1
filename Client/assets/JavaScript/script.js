window.onload = function() {
    getAllData("recent");
    getAllData("popular");
  };
let recentTargetParagraph = document.getElementById("recentSort");
let popularTargetParagraph = document.getElementById("popularSort");


async function getAllData(word){
    let data = await fetch("http://localhost:3000/data");
    let dataJson = await data.json();
    extractArticles(dataJson, word);
}

function extractArticles(data, word){
    let targetParagraph;
    if (word === "recent"){
        data.sort((a, b) => {
            let da = new Date(a.date),
            db = new Date(b.date);
            return db - da;
        }); 
        targetParagraph = recentTargetParagraph;  
    } else {
        data.sort((a,b) => {
            let pa = 0;
            pa += a.emoji1;
            pa += a.emoji2;
            pa += a.emoji3;
            let pb = 0;
            pb += b.emoji1;
            pb += b.emoji2;
            pb += b.emoji3;
            return pb - pa;
        });
        targetParagraph = popularTargetParagraph;
    }

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
        emojiButton1.id = `id${i+1}${word}Emoji1Btn`;
        emojiCounter1.id  = `id${i+1}${word}EmojiCounter1`;
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
        
        let commentButton = document.createElement('button');
        commentButton.textContent = "show comments"
        commentButton.id = `commentButton${i+1}${word}`
        commentButton.addEventListener('click', () => {
            showCommentSection(i+1, word);
        });

        if (data[i].gif){
            let newGIF = document.createElement('img');
            newGIF.src = data[i].gif;
            newGIF.style.display = "block";
            newGIF.style.marginBottom = "8px";
            targetParagraph.append(newGIF);
            
        }



        targetParagraph.append(emojiButton1);
        targetParagraph.append(emojiCounter1);
        targetParagraph.append(emojiButton2);
        targetParagraph.append(emojiCounter2);
        targetParagraph.append(emojiButton3);
        targetParagraph.append(emojiCounter3);
        targetParagraph.append(commentButton);

        let lineBreak = document.createElement('br');
        let anotherLineBreak = document.createElement('br');
        targetParagraph.append(lineBreak);
        targetParagraph.append(anotherLineBreak);
        let commentSection = document.createElement('section');
        commentSection.id = `sectionToHide${i + 1}${word}`;
        commentSection.style.display = "none";
        let newHeader = document.createElement('h3');
        newHeader.textContent = "Comments section"
        commentSection.append(newHeader);
        let newCommentArea = document.createElement('textarea');
        newCommentArea.cols = "33";
        newCommentArea.rows = "5";
        newCommentArea.id = "newComment";
        commentSection.append(newCommentArea);
        let yetAnotherLineBreak = document.createElement('br');
        commentSection.append(yetAnotherLineBreak);
        let commentAppendButton = document.createElement('button');
        commentAppendButton.textContent = "Submit your comment";
        commentAppendButton.addEventListener('click', ()=>{
            addAComment(newCommentArea.value, i + 1);
        })
        commentSection.append(commentAppendButton);




        if (data[i].comments){
            for (let j=0; j<data[i].comments.length; j++){
                let comment = document.createElement('p');
                comment.textContent = data[i].comments[j];
                commentSection.append(comment);
                
            } 
        }

        targetParagraph.append(commentSection);

    }

};


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

function showCommentSection(id, word){
    let sectionToShow = document.getElementById(`sectionToHide${id}${word}`);
    let showButton = document.getElementById(`commentButton${id}${word}`);
    let isItShowing = sectionToShow.style.display;
    switch (isItShowing){
        case "block":
            showButton.textContent = "Show Comments";
            sectionToShow.style.display = "none";
            break;
        case "none":
            showButton.textContent = "Hide Comments";
            sectionToShow.style.display = "block";
            break;
    }
}