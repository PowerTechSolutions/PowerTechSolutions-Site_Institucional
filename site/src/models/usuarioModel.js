var database = require("../database/config")

function listar_usuarios(IDEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_usuario()", IDEmpresa);
    var instrucao = `
        SELECT IDUsuario,Nome
        FROM Usuario_Dashboard WHERE FKUnidade = '${IDEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function visualizar(IDUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_usuario()", IDUsuario);
    var instrucao = `
         SELECT IDMaquina as Maquina from Maquinas JOIN Usuario_Dashboard ON FKFuncionario = IDUsuario WHERE FKFuncionario = ${IDUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_maquinas(IDFUncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar_usuario()", IDFUncionario);
    var instrucao = `
        SELECT * FROM Maquinas WHERE FKFuncionario = ${IDFUncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT 
        IDUsuario,
        Nome,
        Email,
        FKUnidade,
        IDNivel_acesso,
        Apelido 
            FROM 
            Usuario_Dashboard JOIN Nivel_acesso 
            ON FKNivel_acesso = IDNivel_acesso 
                WHERE Usuario_Dashboard.Email = '${email}' 
                AND Usuario_Dashboard.Senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fk_empresa) VALUES ('${nome}', '${email}', '${senha}', '${empresaId}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrando(nome, cpf, email, senha, FKUnidade, FKNivel_acesso){
    onsole.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrando():", nome, cpf, email, senha);
    var instrucao = `
        INSERT INTO Usuario_Dashboard (nome, cpf, email, senha, FKUnidade, FKNivel_acesso) VALUES ('${nome}', '${cpf}', '${email}', '${FKUnidade}', '${FKNivel_acesso}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarInfo(IDUsuario) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarInfo()", IDUsuario);
    var instrucao = `
        SELECT Nome as Nome, Email as Email, FKUnidade as Setor From Usuario_Dashboard join Unidade_de_negocio on FKUnidade = IDUnidade WHERE IDUsuario = ${IDUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    
}

module.exports = {
    autenticar,
    cadastrar,
    listar_usuarios,
    cadastrando,
    buscarInfo,
    listar_maquinas, 
    visualizar
};