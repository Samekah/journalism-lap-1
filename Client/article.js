class Article {
    constructor(length, article){
        this.id = length + 1;
        this.tag = "Music"
        this.article = article;
        this.other = "today"
        this.emoji1 = 0;
        this.emoji2 = 0;
        this.emoji3 = 0;
    }
}

module.exports = Article;