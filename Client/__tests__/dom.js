console.dir(document);
console.log(document.URL);
console.log(document.title);

console.log(document.doctype);
console.log(document.head);
console.log(document.body);

// console.log(document.forms[0]);
console.log(document.links);

h1.textContent === 'Hello';
h1.innerText === 'Goodbye';

const h1 = document.getElementsByClassName('text-center');
console.log(h1);

console.log(h1.textContent);
console.log(h1.innerText);
h1.innterHTML = '<h3>Hello<h3>';

