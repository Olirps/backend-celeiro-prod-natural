const sequelize = require('./db'); // Ajuste o caminho conforme necessário
const initModels = require('../src/models/UserLogin'); // Ajuste o caminho conforme necessário

async function testUserLoginModel() {
    try {
        // Inicializa os modelos
        //const models = initModels();

        // Sincroniza com o banco de dados
        await sequelize.sync({ force: false }); // Atenção: isso vai apagar dados existentes

        const existingUser = await User.findOne({ where: { username } });
        console.log('Passou 001 '+ existingUser);
        if (existingUser) {
            throw new Error('Usuário já existe');
        }

        // Teste para criar um usuário
        const user = await initModels.create({
            username: 'testUser',
            cpfUser: '12345678901',
            password: 'password123'
        });

        console.log('Usuário criado:', user.toJSON());

        // Testar a validação da senha
        const isPasswordValid = user.validatePassword('password123');
        console.log('Senha válida:', isPasswordValid);

        const isInvalidPassword = user.validatePassword('wrongPassword');
        console.log('Senha inválida:', isInvalidPassword);
    } catch (error) {
        console.error('Erro ao testar o modelo UserLogin:', error);
    } finally {
        await sequelize.close();
    }
}

testUserLoginModel();
