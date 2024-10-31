// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: console.log, // Ativa o logging globalmente
  pool: {
    max: 10, // Ajuste conforme necessário
    min: 0,
    acquire: 30000, // Tempo de espera para adquirir uma conexão
    idle: 10000 // Tempo que uma conexão pode ficar ociosa antes de ser liberada
  },
});

// Autenticação e sincronização
sequelize.authenticate()
  .then(async () => {
    console.log(`Conexão bem-sucedida ao banco de dados: ${process.env.DB_NAME}`);

    // Importar modelos
    const GrupoAcesso = require('./models/GrupoAcesso'); // Passando sequelize e DataTypes
    const UserLogin = require('./models/UserLogin');
    const Fornecedores = require('./models/Fornecedores');
    const GrupoProduto = require('./models/GrupoProduto');
    const Subgrupoproduto = require('./models/Subgrupoproduto');
    const Produtos = require('./models/Produtos');
    const Marcas = require('./models/Marcas');
    const TipoVeiculo = require('./models/TipoVeiculo');
    const Veiculos = require('./models/Veiculos');
    const UF = require('./models/UF');
    const Municipio = require('./models/Municipio');
    const NotaFiscal = require('./models/NotaFiscal');
    const ImpostoProduto = require('./models/ImpostoProduto');
    const MovimentacoesEstoque = require('./models/MovimentacoesEstoque');
    const ItensNaoIdentificados = require('./models/ItensNaoIdentificados');

    await GrupoAcesso.sync();
    await UserLogin.sync();
    await GrupoProduto.sync();
    await Subgrupoproduto.sync();
    await Fornecedores.sync();
    await Marcas.sync();
    await TipoVeiculo.sync();
    await Veiculos.sync();
    await Produtos.sync();
    await ImpostoProduto.sync();
    await NotaFiscal.sync();
    await MovimentacoesEstoque.sync();
    await UF.sync();
    await Municipio.sync();
    await ItensNaoIdentificados.sync();
    

    // Sincronizar os modelos com o banco de dados
    await sequelize.sync({ force: false }); // Use force: true para recriar tabelas
    console.log("Modelos sincronizados com sucesso.");
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados: ', err);
  });

module.exports = sequelize;
