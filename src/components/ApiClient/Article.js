import {BASE_ADDRESS} from './httpConfig';

class ArticleAPI{

    static async postArticle(article){
        return await fetch(BASE_ADDRESS+'article/post', {
            method: 'POST',
            body: JSON.stringify(article),
            header:{
                'Access-Control-Allow-Origin': '*',
                'cache-control':'no-cache'
            },
            mode: 'cors'
        })
        .then(res => res.json());
    }

    static async updateArticle(article){
        return await fetch(BASE_ADDRESS+'article/update/'+article.id, {
            method: 'PUT',
            body: JSON.stringify(article),
            header:{
                'Access-Control-Allow-Origin': '*',
                'cache-control':'no-cache'
            },
            mode: 'cors'
        })
        .then(res => res.json());
    }

    static async getArticle(articleId){
        return await fetch(BASE_ADDRESS+'article/'+articleId, {
            method: 'GET',
            header:{
                'Access-Control-Allow-Origin': '*',
                'cache-control':'no-cache'
            },
            mode: 'cors'
        })
        .then(res => res.json());
    }

    static async getArticleSnapshots(){
        return await fetch(BASE_ADDRESS+'article/snapshots', {
            method: 'GET',
            header:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                'cache-control':'no-cache'
            },
            mode: 'cors'
        })
        .then(res => res.json());
    }
    
}
export default ArticleAPI;