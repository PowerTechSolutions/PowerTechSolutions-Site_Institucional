
DROP DATABASE IF EXISTS PowerTechSolutions;

CREATE DATABASE IF NOT EXISTS PowerTechSolutions;

USE PowerTechSolutions;

CREATE TABLE IF NOT EXISTS Grupo_Empresa(
	IDGrupo_Empresa INT PRIMARY KEY AUTO_INCREMENT,
    Apelido_Interno_Grupo VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Unidade_de_negocio(
	IDUnidade INT PRIMARY KEY AUTO_INCREMENT,
    Cnpj CHAR(14),
    Apelido_interno VARCHAR(100),
	Nome_Fantasia VARCHAR(100),
    Razao_social VARCHAR(100),
    FKGrupo_empresa INT,
		CONSTRAINT FKGrupo_Com_Unidade FOREIGN KEY (FKGrupo_empresa)
			REFERENCES Grupo_Empresa(IDGrupo_Empresa)
);

CREATE TABLE IF NOT EXISTS Endereco_Unidade(
	IDEndereco_unidade INT PRIMARY KEY AUTO_INCREMENT,
    Cep VARCHAR(8),
    Logradouro VARCHAR(100),
    Bairro VARCHAR(100),
    Localidade VARCHAR(100),
    UF CHAR(2),
    FKUnidade_negocio INT,
		CONSTRAINT FKUnidade_Endereco FOREIGN KEY (FKUnidade_negocio)
			REFERENCES Unidade_de_negocio(IDUnidade)
);

CREATE TABLE IF NOT EXISTS Permissoes(
	IDPermissao INT PRIMARY KEY AUTO_INCREMENT,
    Visualizar TINYINT,
    Editar TINYINT,
    Cadastrar TINYINT,
    Deletar TINYINT
);

CREATE TABLE IF NOT EXISTS Nivel_acesso(
	IDNivel_acesso INT AUTO_INCREMENT,
    Apelido VARCHAR(60),
	FKPermissao INT,
		CONSTRAINT FKNivel_Permissao FOREIGN KEY (FKPermissao)
			REFERENCES Permissoes(IDPermissao),
		CONSTRAINT PKNivel_permissao PRIMARY KEY (FKPermissao)
);

CREATE TABLE IF NOT EXISTS Usuario_Dashboard(
	IDUsuario INT AUTO_INCREMENT,
	Nome VARCHAR(150),
    Email VARCHAR(150),
    Cpf CHAR(11),
    Senha CHAR(8),
    FKUnidade INT,
    FKNivel_acesso INT,
		CONSTRAINT FKUnidade_Usuario FOREIGN KEY (FKUnidade)
			REFERENCES Unidade_de_negocio(IDUnidade),
		CONSTRAINT FKNivel_Usuario FOREIGN KEY (FKNivel_acesso)
			REFERENCES Nivel_acesso(IDNivel_acesso),
		CONSTRAINT PKUsuario_Nivel_acesso PRIMARY KEY (IDUsuario,FKNivel_acesso)
);

CREATE TABLE IF NOT EXISTS Funcionarios(
	IDFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100),
    Email VARCHAR(100),
    Cpf CHAR(11),
    FKUnidade_negocio INT,
		CONSTRAINT FKUnidade_Funcionario FOREIGN KEY (FKUnidade_negocio)
			REFERENCES Unidade_de_negocio(IDUnidade)
);

CREATE TABLE IF NOT EXISTS Maquinas_Fisicas(
	IDMaquina_fisica INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    FKFuncionario INT,
		CONSTRAINT FKFuncionario_maquina_fisica FOREIGN KEY (FKFuncionario)
			REFERENCES Funcionarios(IDFuncionario)
);

CREATE TABLE IF NOT EXISTS Componentes_maquina(
	IDComponente INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    FKMaquina_fisica INT,
		CONSTRAINT FKMaquina_Componente FOREIGN KEY (FKMaquina_fisica)
);

