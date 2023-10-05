
DROP DATABASE IF EXISTS PowerTechSolutions;

CREATE DATABASE IF NOT EXISTS PowerTechSolutions;

USE PowerTechSolutions;

-- Criação das tabelas 

CREATE TABLE IF NOT EXISTS Grupo_Empresa(
	IDGrupo_Empresa INT PRIMARY KEY AUTO_INCREMENT,
    Apelido_Interno_Grupo VARCHAR(100),
    Razao_social VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Unidade_de_negocio(
	IDUnidade INT PRIMARY KEY AUTO_INCREMENT,
    Cnpj CHAR(14),
    Apelido_interno VARCHAR(100),
	Nome_Fantasia VARCHAR(100),
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
		CONSTRAINT PKNivel_permissao PRIMARY KEY (IDNivel_acesso,FKPermissao)
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

CREATE TABLE IF NOT EXISTS Votacao_feedback(
	IDVotacao_feedback INT PRIMARY KEY AUTO_INCREMENT,
    1_ESTRELA TINYINT,
    2_ESTRELA TINYINT,
    3_ESTRELA TINYINT,
    4_ESTRELA TINYINT,
    5_ESTRELA TINYINT
);

CREATE TABLE IF NOT EXISTS Feedbacks(
	IDFeedback INT PRIMARY KEY AUTO_INCREMENT,
    Feedbacks VARCHAR(250),
    FKVotacao INT,
		CONSTRAINT FKVotacao_Feedback FOREIGN KEY (FKVotacao)
			REFERENCES Votacao_feedback(IDVotacao_feedback),
	FKUsuario INT,
		CONSTRAINT FKUsuario_Feedback FOREIGN KEY (FKUsuario)
			REFERENCES Usuario_Dashboard(IDUsuario)
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

CREATE TABLE IF NOT EXISTS Maquinas(
	IDMaquina INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    FKFuncionario INT,
		CONSTRAINT FKFuncionario_maquina_fisica FOREIGN KEY (FKFuncionario)
			REFERENCES Funcionarios(IDFuncionario)
);

CREATE TABLE IF NOT EXISTS Tipo_maquina(
	IDTipo INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS Componentes_maquina(
	IDComponente INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    FKMaquina INT,
		CONSTRAINT FKMaquina_Componente FOREIGN KEY (FKMaquina)
			REFERENCES Maquinas(IDMaquina)
);

CREATE TABLE IF NOT EXISTS Parametros_componente(
	IDParametro INT PRIMARY KEY AUTO_INCREMENT,
    Parametro DOUBLE,
    FKComponente INT,
		CONSTRAINT FKComponente_Parametro FOREIGN KEY (FKComponente)
			REFERENCES Componentes_maquina(IDComponente)
);

CREATE TABLE IF NOT EXISTS Componentes_cadastrados(
	IDComponente_cadastrado INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Componentes_monitorados(
	IDComponente_monitorado INT AUTO_INCREMENT,
    FKComponente_cadastrado INT,
    FKMaquina INT,
		CONSTRAINT FKCompoenente_C_Componente_M FOREIGN KEY (FKComponente_cadastrado)
			REFERENCES Componentes_cadastrados(IDComponente_cadastrado),
		CONSTRAINT FKMaquina_Componente_M FOREIGN KEY (FKMaquina)
			REFERENCES Maquinas(IDMaquina),
		CONSTRAINT PKComponente_C_Componente_M PRIMARY KEY (IDComponente_monitorado,FKComponente_cadastrado)
);

CREATE TABLE IF NOT EXISTS Monitoramento_RAW(
	IDMonitoramento INT PRIMARY KEY AUTO_INCREMENT,
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Dado_Capturado DOUBLE,
    FKComponente_Monitorado INT,
		CONSTRAINT FKMonitoramento_RAW_Componente_maquina FOREIGN KEY (FKComponente_Monitorado)
			REFERENCES Componentes_monitorados(IDComponente_monitorado)
);

CREATE TABLE IF NOT EXISTS Monitoramento_Trusted(
	IDMonitoramento INT PRIMARY KEY,
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Dado_Capturado DOUBLE,
    FKComponente_Monitorado INT,
    CONSTRAINT FKMonitoramento_TRUSTED_Componente_maquina FOREIGN KEY (FKComponente_Monitorado)
			REFERENCES Componentes_monitorados(IDComponente_monitorado)
);

CREATE TABLE IF NOT EXISTS Nivel_alerta(
	IDNivel_alerta INT PRIMARY KEY AUTO_INCREMENT,
    Nivel VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS Alertas(
	IDAlerta INT PRIMARY KEY AUTO_INCREMENT,
    FKMonitoramento INT,
    FKNivel_alerta INT,
    FKUnidade_negocio INT,
		CONSTRAINT FKMonitoramento_alerta FOREIGN KEY (FKMonitoramento)
			REFERENCES Monitoramento_Trusted(IDMonitoramento),
		CONSTRAINT FKNivel_alerta FOREIGN KEY (FKNivel_alerta)
			REFERENCES Nivel_alerta(IDNivel_alerta),
		CONSTRAINT FKUnidade_negocio_alerta FOREIGN KEY (FKUnidade_negocio)
			REFERENCES Unidade_de_negocio(IDUnidade)
);

-- Aréa de inserts para testes de funcionalidade 

INSERT INTO Grupo_Empresa VALUES
(null,'EDP Smart','EDP ENERGIAS DO BRASIL S.A.'),
(null,'Matrix','Matrix Comercio e Servicos LTDA'),
(null,'AES Tietê','AES TIETE INTEGRA SOLUCOES EM ENERGIA LTDA.');

SELECT * FROM Grupo_Empresa;

INSERT INTO Unidade_de_negocio VALUES
(null,'28630316000186','EDP Smart Sede','EDP Energias do Brasil',1),
(null,'28630316000286','EDP Smart Faria Lima','EDP Energias do Brasil',1),
(null,'28630316000386','EDP Smart Suzano','EDP Energias do Brasil',1),
(null,'01564634000130','Matrix Sede','Matrix',2),
(null,'01564634000230','Matrix Mogi das Cruzes','Matrix',2),
(null,'26203837000121','AES Tiete Sede','AES TIETE INTEGRA',3);

SELECT * FROM Unidade_de_negocio;

INSERT INTO Permissoes VALUES
(NULL,1,1,1,1),
(NULL,1,0,0,0);

SELECT * FROM Permissoes;

