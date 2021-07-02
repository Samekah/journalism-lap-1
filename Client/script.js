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
    }

};
