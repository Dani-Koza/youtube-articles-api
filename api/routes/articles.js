const express = require('express');
const router = express.Router();

const { 
    getAllArticles,
    getArticle, 
    createArticle,
    updateArticle,
    deleteArticle,
} = require('../controllers/articles');


router.get('/', getAllArticles);

router.post('/', createArticle);

router.get('/:articleId', getArticle)

router.patch('/:articleId', updateArticle);

router.delete('/:articleId', deleteArticle);


module.exports = router;