const GrupoProduto = require('../models/GrupoProduto');
const Subgrupoproduto = require('../models/Subgrupoproduto'); // Certifique-se de que esse caminho está correto
const { Op } = require('sequelize');

class GrupoProdutoService {

    static async criarGrupoProduto(data) {
        // Verifica duplicidade de descrição
        const grupoExistente = await GrupoProduto.findOne({
            where: { descricao: data.descricao }
        });
        if (grupoExistente) {
            throw new Error('GrupoProduto com essa descrição já existe.');
        }
        
        return await GrupoProduto.create(data);
    }

    static async listarGruposProduto(where) {
        return await GrupoProduto.findAll({ where });
    }

    static async obterGrupoProdutoPorId(id) {
        return await GrupoProduto.findByPk(id);
    }

    static async atualizarGrupoProduto(id, data) {
        // Verifica duplicidade de descrição, excluindo o próprio grupo
        const grupoExistente = await GrupoProduto.findOne({
            where: {
                descricao: data.descricao,
                id: { [Op.ne]: id }
            }
        });
        if (grupoExistente) {
            throw new Error('Outro GrupoProduto com essa descrição já existe.');
        }

        await GrupoProduto.update(data, { where: { id } });
        return await GrupoProduto.findByPk(id);
    }

    static async excluirGrupoProduto(id) {
        // Verifica se o grupo possui subgrupos vinculados
        const subgruposVinculados = await Subgrupoproduto.findOne({ where: { gpid: id } });
        if (subgruposVinculados) {
            throw new Error('Não é possível excluir um GrupoProduto com subgrupos vinculados.');
        }

        await GrupoProduto.destroy({ where: { id } });
        return { mensagem: 'GrupoProduto excluído com sucesso' };
    }
}

module.exports = GrupoProdutoService;
