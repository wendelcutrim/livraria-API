module.exports = (sequelize, DataType) => {
  const Livro = sequelize.define(
    "Livro",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidade_paginas: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ano_lancamento: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      estoque: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "livros",
    }
  );

  return Livro;
};
