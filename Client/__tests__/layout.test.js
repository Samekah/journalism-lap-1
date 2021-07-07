const fs = require('fs');
const path = require('path');
const homeHtml = fs.readFileSync(path.resolve(__dirname, '../home.html'), 'utf8');
const createPost = fs.readFileSync(path.resolve(__dirname, '../createPost.html'), 'utf8');
describe('home.html elements', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = homeHtml.toString();
    })
    test("There is a Favicon", () => {
        let favicon = document.querySelector("link[rel = 'icon']");
        expect(favicon).toBeTruthy();
    })
    test("The favicon has an image",() => {
        let favicon = document.querySelector("link[rel = 'icon']")
        let faviconImage = favicon.getAttribute("href");
        expect(faviconImage).not.toBe("#")
    })
    test('There is a head', () => {
        let head = document.querySelector('head');
        expect(head).toBeTruthy();
    })
    test('There is a body', () => {
        let body = document.querySelector('body');
        expect(body).toBeTruthy();
    })
    test('There is a header', () => {
        let header = document.querySelector('header');
        expect(header).toBeTruthy();
    })
    test("There is a navigation button for each category", () => {
        let navItems = document.querySelectorAll("ul.navbar-nav li")
        expect(navItems).toHaveLength(7);
    })
    test('There is a Navbar', () => {
        let navBar = document.querySelector('nav');
        expect(navBar).toBeTruthy();
    })
    test('There is a main', () => {
        let main = document.querySelector('main');
        expect(main).toBeTruthy();
    })
})

describe('createPost.html', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = createPost.toString();
    })

    test('it has a header', () => {
        let header = document.querySelector('header');
        expect(header).toBeTruthy();
    })

    test('it has a body', () => {
        let body = document.querySelector('body');
        // expect(header).toBeTruthy();
    })

    test('it has a main', () => {
        let main = document.querySelector('main');
        expect(main).toBeTruthy();
    })

    test('it has a form', () => {
        let form = document.querySelector('form');
        expect(form).toBeTruthy();
    })

    test('it has a div', () => {
        let div = document.querySelector('div');
        expect(div).toBeTruthy();
    })

    test('button exists', () => {
        let button = document.querySelector('button');
        expect(button).toBeTruthy();
    }) 

    test('radio exists', () => {
        let radio = document.querySelector('input[type="radio"]');
        expect(radio).toBeTruthy();
    }) 

    test('labelSport exists', () => {
        let forSport = document.querySelector('label[for="sport"]');
        expect(forSport).toBeTruthy();
    })

    test('label music exists', () => {
        let labelMusic = document.querySelector('label[for="music"]');
        expect(labelMusic).toBeTruthy();
    })

    test('label film exists', () => {
        let labelFilm = document.querySelector('label[for="film"]');
        expect(labelFilm).toBeTruthy();
    })


})