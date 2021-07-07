const request = require('supertest');
const server = require('../app');


describe ('API Server', () => {

    let api; 
    let testData = {
        "id": 5,
        "tag": "Lifestyle",
        "title": "A Lifestyle Article",
        "article": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor consectetur erat, a tincidunt mi imperdiet sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sagittis tellus placerat dui laoreet maximus. Nulla nec tristique enim. Phasellus egestas et augue at pulvinar. Donec iaculis tristique pellentesque. Nullam ullamcorper facilisis malesuada. Cras congue, neque quis pretium lobortis, nisl massa blandit augue, ut accumsan lorem tellus sit amet nisi. Aenean vel tortor ligula. Quisque sagittis ipsum volutpat feugiat blandit. Cras lobortis, est id iaculis varius, eros purus rutrum enim, ac luctus ex turpis eget turpis.",
        "date": "2021-07-07T09:52:52.653Z",
        "emoji1": 3,
        "emoji2": 5,
        "emoji3": 8,
        "comments": [
          "A test comment"
        ],
        "gif": ""
    }

    beforeAll(() => {
        api = server.listen(5000, () => 
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        console.log("Stopping server");
        api.close(done);
    });

    test('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    })
    
    test('responds to get /data with status 200', (done) => {
        request(api).get('/').expect(200, done);
    })

    test('can retrieve data by tag name', (done) => {
        // let tagList = ['Music', 'Sport', 'Lifestyle', 'Other', 'News', 'Film'];
        let tagList = ['Music', 'Sport', 'Lifestyle'];
        let randInt = Math.floor(Math.random() * tagList.length);
        request(api)
            .get(`/data/${tagList[randInt]}`)
            .expect(200, done)
    })

    test('responds to random incorrect tag with 404 not found', (done) => {
        request(api)
            .get("/data/elephant")
            .expect(404, done);
    })

    test('responds to emoji counter put request with 204', (done) => {
        request(api)
            .put("/data")
            .send({id: 1, buttonClicked: "emojiButton1"})
            .expect(204, done);
    })

    test('responds to comment put request with 204', (done) => {
        request(api)
            .put("/")
            .send({id: 1, commentContent: "This comment is being created by the Jest test suite"})
            .expect(204, done);
    })



})