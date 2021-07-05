let targetParagraph = document.getElementById("test");
let musicButton = document.getElementById("musicSubmit");
musicButton.addEventListener('click', getMusicData);
let sportButton = document.getElementById("sportSubmit");
sportButton.addEventListener('click', getSportData);

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

function extractArticles(data){
    for (let i=0; i<data.length; i++){
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
        let commentSection = document.createElement('section');
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
