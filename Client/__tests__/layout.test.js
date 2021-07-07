const fs = require('fs');
const path = require('path');
const homeHtml = fs.readFileSync(path.resolve(__dirname, '../home.html'), 'utf8');

describe('home.html', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = homeHtml.toString();
    })

    test('it has a header', () => {
        let header = document.querySelector('header');
        expect(header).toBeTruthy();
    })

    test('it has a body', () => {
        let body = document.querySelector('body');
        expect(body).toBeTruthy();
    })

})

