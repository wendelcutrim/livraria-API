const express = require("express");
const router = express.Router();
const LivrosController = require('../controllers/LivrosController');

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get('/livros', LivrosController.showAllBooks);
module.exports = router;

router.get('/livros/:id', LivrosController.showBook);

router.put('/livros/:id/editar', LivrosController.updateBook);

router.post('/livros/cadastrar', LivrosController.createBook);

router.delete('/livros/:id/deletar', LivrosController.deleteBook);