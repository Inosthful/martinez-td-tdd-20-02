const { Article, Panier, Remise,Stock,Coupon } = require("../src/app.js");
// import { Article, Panier } from "../src/app.js";

describe('Panier', () => {
    let panier;

    beforeEach(() => {
        panier = new Panier();
    });

    test('ajouterArticle', () => {
        const randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        let value = randomInt(1, 402);
        panier.ajouterArticle(new Article("Pomme", 1.5), value);
        panier.ajouterArticle(new Article("Pasteque", 5), value);

        expect(Object.keys(panier.articles).length).toBe(2);
        expect(panier.articles["Pomme"]).toBe(value);
    });

    test('retirerArticle', () => {
        const article = new Article("Pomme", 1.5);
        panier.ajouterArticle(article, 3);
        panier.retirerArticle(article, 2);
        expect(Object.keys(panier.articles).length).toBe(1);
        expect(panier.articles[article.nom]).toBe(1);
        panier.retirerArticle(article, 1);
        expect(Object.keys(panier.articles).length).toBe(0);
    });

    test('calculerMontantTotal', () => {
        panier.ajouterArticle(new Article("Pomme", 1.5), 3);
        panier.ajouterArticle(new Article("Banane", 0.75), 2);
        const articlesPrix = {
            "Pomme": 1.5,
            "Banane": 0.75
        };
        expect(panier.calculerMontantTotal(articlesPrix)).toBe(1.5 * 3 + 0.75 * 2);
    });

    test('viderPanier', () => {
        panier.ajouterArticle(new Article("Pomme", 1.5), 3);
        panier.ajouterArticle(new Article("truc", 4), 164);

        panier.ajouterArticle(new Article("truc2", 4), 242);


        panier.viderPanier();
        expect(Object.keys(panier.articles).length).toBe(0);
    });

    test('appliquerRemise', () =>{
        const remise = new Remise(10);
        const article = new Article("Pomme", 1.5);
        // const remise2 = new Remise(0)
        expect(remise.appliquerRemise(100)).toBe(90);
        expect(remise.appliquerRemise(1345)).toBe(1345*0.9);
        expect(remise.pourcentage).toBeGreaterThan(0);
        expect(remise.pourcentage).toBeLessThan(100);
        // expect(article.prix).toBeGreaterThan(0);
        expect(remise.appliquerRemise(article.prix)).toBe(1.35);
        // expect(remise.pourcentage).not.toBe(0);
    });
    test('appliquerCoupon', () => {
      
        const article = new Article("Pomme", 100); 
        const coupon = new Coupon(15); 
    
        panier.ajouterArticle(article, 1);
        const articlesPrix = {
            "Pomme": 100
        };
        panier.appliquerCoupon(coupon, articlesPrix);
    
       
        expect(panier.calculerMontantTotal(articlesPrix)).toBe(85);
    });
    

});
