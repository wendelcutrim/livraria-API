const { Livro } = require('../models');
const CountriesService = require('../services/Countries');

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
            // O objeto com atributo raw, é um recurso do sequelize que diz que o retorno da consulta do banco, não será no padrão do sequelize, assim coseguimos usar esse retorno como um objeto javascript puro. Pois se usarmos o returno do tipo book do sequelize, teriamos que ter a tabela no banco de dados com o pais pra trazer o dado, nesse caso como não criamos, para inserir a flag do país do retorno da api, precisamos pegar o objeto javascript puro para adicionar.
            const book = await Livro.findByPk(id, {raw: true});
            //Nesse exemplo, todos os livros terá bandeira do brazil porque passamos o alpha code do brasil como parametro, mas caso tivesse a tabela de país no banco, iria puxar pela alfacode do país salvo no banco de dados.
            const country = await CountriesService.getByAlphaCode('BRA');
            /*Como inserir uma nova propriedade em um objeto que já existe: Poderia usar das seguintes maneiras:
                1º: nomeObjeto["novo atributo"]; //book[flag] = country[0].flags.png;
                2º nomeObjeto.novaPropriedade // book.flag = country[0].flags.png;
                3º Object.assing(objeto, {nova propriedade: valor});
            */
            Object.assign(book, {
                flag: country[0].flags.png,
            });

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