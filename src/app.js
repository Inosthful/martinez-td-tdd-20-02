class Panier {
    constructor() {
        this.articles = {};
        this.couponApplique = false;

    }
    appliquerCoupon(coupon, articlePrix) {
        if (!this.couponApplique) {
            for (const articleNom in this.articles) {
                const montantApresRemise = articlePrix * (1 -  coupon.reduction/ 100); 
                if (montantApresRemise >= 0) { 
                    this.articles[articleNom] = montantApresRemise;
                } else {
                    this.articles[articleNom] = 0; 
                }
            }
         
            this.couponApplique = true;
            }
        return articlePrix
    }
    
    
    ajouterArticle(article, quantite) {
        const articleNom = article.nom;
        if (articleNom in this.articles) {
            this.articles[articleNom] += quantite;
        }
        //copilot le else
        else {
            this.articles[articleNom] = quantite;
        }
    }

    retirerArticle(article, quantite) {
        const articleNom = article.nom;
        if (articleNom in this.articles) {
            this.articles[articleNom] -= quantite;
            if (this.articles[articleNom] <= 0) {
                delete this.articles[articleNom];
            }
        }
    }

    viderPanier() {
        this.articles = {};
    }

    calculerMontantTotal(articlesPrix) {
        let total = 0;
        for (const articleNom in this.articles) {
            const articleQuantite = this.articles[articleNom];
            const articlePrix = articlesPrix[articleNom];
            total += articlePrix * articleQuantite;
        }
        return total;
    }
}

class Article {
    constructor(nom, prix) {
        this.nom = nom;
        this.prix = prix;
    }
}


class Remise {
    constructor(pourcentage) {
        this.pourcentage = pourcentage;
    }

    appliquerRemise(montant) {
        return montant * (1 - this.pourcentage / 100);
    }


}

class Stock {
    constructor(){
        this.stock = {};

    }

    ajouterStock(article, quantite){
        const articleNom = article.nom;
        if (articleNom in this.stock) {
            this.stock[articleNom] += quantite;
        }
        else {
            this.stock[articleNom] = quantite;
        }
    }

    supprimerStock(article, quantite){
        const articleNom = article.nom;
        if (articleNom in this.stock) {
            this.stock[articleNom] -= quantite;
            if (this.stock[articleNom] <= 0) {
                delete this.stock[articleNom];
            }
        }
    }

    verifierStock(article, quantite){
        const articleNom = article.nom;
        if (articleNom in this.stock) {
            if (this.stock[articleNom] >= quantite) {
                return true;
            }
        }
        return false;
    }
    stockTotal(){
        let total = 0;
        for (const articleNom in this.stock) {
            total += this.stock[articleNom];
        }
        return total;
    }

    viderStock(){
        this.stock = {};
    }



}
class Coupon {
    constructor(reduction) {
        this.reduction = reduction; 
    }
}
module.exports = { Article, Panier, Remise, Stock,Coupon };
