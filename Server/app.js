const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
app.use(cors());
app.use(express.json());

const dataFile = JSON.parse(fs.readFileSync('data.json'));
let data = dataFile;

function reWriteFile(data){
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err) throw err;
    })
}

// let data = [{id: 1, tag: "Music", article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porttitor malesuada nunc in ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque imperdiet sapien, et ullamcorper augue imperdiet eget. Curabitur sodales, erat sed efficitur feugiat, purus nisl egestas lectus, vitae elementum leo justo quis nisi. Morbi in malesuada tellus. Duis nec arcu nisi. Suspendisse potenti.", other: "Today", emoji1: 5, emoji2: 3, emoji3: 1}, {id: 2, tag: "Sport", article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor consectetur erat, a tincidunt mi imperdiet sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sagittis tellus placerat dui laoreet maximus. Nulla nec tristique enim. Phasellus egestas et augue at pulvinar. Donec iaculis tristique pellentesque. Nullam ullamcorper facilisis malesuada. Cras congue, neque quis pretium lobortis, nisl massa blandit augue, ut accumsan lorem tellus sit amet nisi. Aenean vel tortor ligula. Quisque sagittis ipsum volutpat feugiat blandit. Cras lobortis, est id iaculis varius, eros purus rutrum enim, ac luctus ex turpis eget turpis.", other: "Today", emoji1: 4, emoji2: 2, emoji3: 1}];


app.get('/', (req, res) => {
    res.send(data);
})

app.get('/data', (req, res) => {
    res.send(data);
});

app.get('/data/:tag', (req, res) => {
    try {
        let userTag = req.params.tag;
        let result = data.filter(dataSet => dataSet.tag === userTag);     
        if (result.length == 0){
            throw new Error("This tag has no data or doesn't exist!")
        } else {
            res.send(result); 
        }
    } catch (error){
        res.status(404).send({message: error.message});
    }
});

function generateRandInt(length){
    return Math.floor(Math.random() * length)
}

app.get('/random', (req, res) => {
    try {
        let data1 = data[generateRandInt(data.length)]
        let data2 = data[generateRandInt(data.length)]
        while (data2 === data1){
            data2 = data[generateRandInt(data.length)]
        }
        let data3 = data[generateRandInt(data.length)]
        while (data2 === data3 || data1 === data3){
            data3 = data[generateRandInt(data.length)];
        }
        res.send([data1, data2, data3]);
    } catch (error){
        console.log(error);
    }
})


app.post('/data', (req,res) => {
    try {
        let body = req.body;
        data.push(body);
        console.log(body);
        res.status(201).send(data);
        reWriteFile(data);
    } catch (error) {
        console.log(error);
    }
})

app.put("/data", (req, res) => {
    try {
        let body = req.body;
        let id = body.id;
        let emojiString = body.buttonClicked;
        let requestedArticle = data.find(dataSet => dataSet.id === id);
        if (emojiString === "emojiButton1"){
            requestedArticle.emoji1 += 1;
        } else if (emojiString === "emojiButton2"){
            requestedArticle.emoji2 += 1;
        } else if (emojiString === "emojiButton3"){
            requestedArticle.emoji3 += 1;
        }
        res.status(204).send(data);
        reWriteFile(data);
    } catch (error) {
        console.log(error);
    }
})

app.put("/", (req, res) => {
    try {
        let body = req.body;
        let id = body.id;
        let commentToAppend = body.commentContent;
        let requestedArticle = data.find(dataSet => dataSet.id === id);
        // console.log(requestedArticle);
        requestedArticle.comments.push(commentToAppend);
        res.status(204).send(data)
        reWriteFile(data);
    } catch (error) {
        console.log(error);
    }

})


module.exports = app;