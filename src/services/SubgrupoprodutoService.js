const Subgrupoproduto = require('../models/Subgrupoproduto');
const Produtos = require('../models/Produtos'); // Certifique-se de que o caminho está correto
const { Op } = require('sequelize');

class SubgrupoprodutoService {

    static async criarSubgrupoproduto(data) {
        // Verifica duplicidade de descrição no mesmo grupo
        const subgrupoExistente = await Subgrupoproduto.findOne({
            where: { 
                descricao: data.descricao,
                gpid: data.gpid
            }
        });
        if (subgrupoExistente) {
            throw new Error('Subgrupoproduto com essa descrição já existe neste grupo.');
        }

        return await Subgrupoproduto.create(data);
    }

    static async listarSubgruposProduto(where) {
        return await Subgrupoproduto.findAll({ where });
    }

    static async obterSubgrupoprodutoPorId(id) {
        return await Subgrupoproduto.findByPk(id);
    }

    static async atualizarSubgrupoproduto(id, data) {
        // Verifica duplicidade de descrição no mesmo grupo, excluindo o próprio subgrupo
        const subgrupoExistente = await Subgrupoproduto.findOne({
            where: {
                descricao: data.descricao,
                gpid: data.gpid,
                id: { [Op.ne]: id }
            }
        });
        if (subgrupoExistente) {
            throw new Error('Outro Subgrupoproduto com essa descrição já existe neste grupo.');
        }

        await Subgrupoproduto.update(data, { where: { id } });
        return await Subgrupoproduto.findByPk(id);
    }

    static async excluirSubgrupoproduto(id) {
        // Verifica se o subgrupo possui produtos vinculados
        const produtosVinculados = await Produtos.findOne({ where: { subgrupoid: id } });
        if (produtosVinculados) {
            throw new Error('Não é possível excluir um Subgrupoproduto com produtos vinculados.');
        }

        await Subgrupoproduto.destroy({ where: { id } });
        return { mensagem: 'Subgrupoproduto excluído com sucesso' };
    }
}

module.exports = SubgrupoprodutoService;
