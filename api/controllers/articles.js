const Article = require('../models/article');
const mongoose = require('mongoose');
const Category = require('../models/category');

module.exports = {
    getAllArticles: (req, res) => {
        Article.find().populate('categoryId', 'title').then((articles) => {
            res.status(200).json({
                articles
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    getArticle: (req, res) => {
        const articleId = req.params.articleId;

        Article.findById(articleId).then((article) => {
            res.status(200).json({
                article
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })

    },
    createArticle: (req, res) => {
        const { title, description, content, categoryId } = req.body;

        Category.findById(categoryId)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({
                        message: `Category not found or doesn't exist`
                    });
                }

                const article = new Article({
                    _id: new mongoose.Types.ObjectId(),
                    title,
                    description,
                    content,
                    categoryId
                });
                return article.save();

            })
            .then(() => {
                res.status(200).json({
                    message: `Created a new article: ${title}`
                });
            })
            .catch(error => {
                res.status(500).json({
                    error,
                });
            });
    },
    updateArticle: (req, res) => {
        const articleId = req.params.articleId;
        const articleTitle = req.body.title;

        Article.updateOne({ _id: articleId }, req.body).then(() => {
            res.status(200).json({
                message: `Article - ${articleTitle}, has been updated`
            });
        }).catch(error => {
            res.status(500).json({
                error,
            })
        });
    },
    deleteArticle: (req, res) => {
        const articleId = req.params.articleId;

        Article.deleteOne({ _id: articleId }).then(() => {
            res.status(200).json({
                message: `Article _id: ${articleId}, has been deleted!`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });


    },
}
