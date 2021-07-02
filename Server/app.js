const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let data = [{tag: "Music", article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porttitor malesuada nunc in ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque imperdiet sapien, et ullamcorper augue imperdiet eget. Curabitur sodales, erat sed efficitur feugiat, purus nisl egestas lectus, vitae elementum leo justo quis nisi. Morbi in malesuada tellus. Duis nec arcu nisi. Suspendisse potenti.", other: "Today"}, {tag: "Sport", article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor consectetur erat, a tincidunt mi imperdiet sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sagittis tellus placerat dui laoreet maximus. Nulla nec tristique enim. Phasellus egestas et augue at pulvinar. Donec iaculis tristique pellentesque. Nullam ullamcorper facilisis malesuada. Cras congue, neque quis pretium lobortis, nisl massa blandit augue, ut accumsan lorem tellus sit amet nisi. Aenean vel tortor ligula. Quisque sagittis ipsum volutpat feugiat blandit. Cras lobortis, est id iaculis varius, eros purus rutrum enim, ac luctus ex turpis eget turpis.", other: "Today"}];


app.get('/', (req, res) => {
    res.send("Hello I'm working");
})

app.get('/data', (req, res) => {
    res.send(data);
});

app.get('/data/:tag', (req, res) => {
    let userTag = req.params.tag;
    let result = data.filter(dataSet => dataSet.tag === userTag);
    res.send(result);
});

app.get('/:other', (req, res) => {
    let userOther = req.params.other
    let result = data.filter(dataSet => dataSet.other === userOther);
    res.send(result);
});


module.exports = app;