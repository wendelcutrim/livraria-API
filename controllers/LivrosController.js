const { Livro } = require('../models');

const LivrosController = {
    showAllBooks: async (req, res) => {
        try{
            const booksList = await Livro.findAll();
            return res.status(200).json(booksList);
        } catch(err){
            console.log(err);
            return res.status(500).json({error: 'Não foi possível processar a requisição'});
        }
    },

    showBook: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Livro.findByPk(id);

            return res.status(200).json(book);
        } catch(err){
            console.log(err);
            return res.status(404).json({error: 'Requisição não encontrada'});
        }
    },

    updateBook: async (req, res) => {
        try{
            const { id } = req.params;
            const { titulo, quantidade_paginas, autor, ano_lancamento, estoque } = req.body

            await Livro.update({
                titulo,
                quantidade_paginas,
                autor,
                ano_lancamento,
                estoque
            }, {
                where: {id: id},
            });

            const updatedBook = await Livro.findByPk(id);

            return res.status(200).json(updatedBook);
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: 'Não foi possível processar a requisição'})
        }
    },

    createBook: async (req, res) => {
        try {
            const { titulo, quantidade_paginas, autor, ano_lancamento, estoque } = req.body;

            const newBook = await Livro.create({
                titulo,
                quantidade_paginas,
                autor,
                ano_lancamento,
                estoque
            });

            return res.status(201).json(newBook);
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: 'Não foi possível realizar o cadastro'});
        }
    },

    deleteBook: async (req, res) => {
        try {
            const { id } = req.params;
            await Livro.destroy(
                {
                    where: {
                        id: id
                    }
                });
            res.status(200).json({message: 'success'});
        } catch (err) {
            console.log(err);
            return res.status(500).json({error: 'Não foi possível deletar o livro'});
        }
    }
};

module.exports = LivrosController;