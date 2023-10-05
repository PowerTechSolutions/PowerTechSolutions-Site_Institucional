
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

CREATE TABLE IF NOT EXISTS Componentes_maquina_MF(
	IDComponente INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    FKMaquina_fisica INT,
		CONSTRAINT FKMaquina_fisica_Componente FOREIGN KEY (FKMaquina_fisica)
			REFERENCES Maquinas_Fisicas(IDMaquina_fisica)
);

CREATE TABLE IF NOT EXISTS Parametros_componente_MF(
	IDParametro INT PRIMARY KEY AUTO_INCREMENT,
    Parametro DOUBLE,
    FKComponente INT,
		CONSTRAINT FKComponente_MF_Parametro FOREIGN KEY (FKComponente)
			REFERENCES Componentes_maquina_MF(IDComponente)
);

CREATE TABLE IF NOT EXISTS Componentes_cadastrados(
	IDComponente_cadastrado INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Componentes_monitorados_MF(
	IDComponente_monitorado INT AUTO_INCREMENT,
    FKComponente_cadastrado INT,
    FKMaquina_fisica INT,
		CONSTRAINT FKCompoenente_C_Componente_M_maquina_fisica FOREIGN KEY (FKComponente_cadastrado)
			REFERENCES Componentes_cadastrados(IDComponente_cadastrado),
		CONSTRAINT FKMaquina_fisica_Componente_M FOREIGN KEY (FKMaquina_fisica)
			REFERENCES Maquinas_Fisicas(IDMaquina_fisica),
		CONSTRAINT PKComponente_C_Componente_M PRIMARY KEY (IDComponente_monitorado,FKComponente_cadastrado)
);

CREATE TABLE IF NOT EXISTS Monitoramento_RAW_MF(
	IDMonitoramento_MF INT PRIMARY KEY AUTO_INCREMENT,
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Dado_Capturado DOUBLE,
    FKComponente_Monitorado_MF INT,
		CONSTRAINT FKMonitoramento_Componente_maquina_fisica FOREIGN KEY (FKComponente_Monitorado_MF)
			REFERENCES Componentes_monitorados_MF(IDComponente_monitorado)
);

CREATE TABLE IF NOT EXISTS Endereco_hidreletrica(
	IDEndereco_hidreletrica INT PRIMARY KEY AUTO_INCREMENT,
    Rio VARCHAR(80),
    Bacia_hidrografica VARCHAR(80),
    Sub_Bacia_hidrografica VARCHAR(80),
    UF CHAR(2)
);

CREATE TABLE IF NOT EXISTS Hidreletrica(
	IDHidreletrica INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100),
    FKEndereco_hidreletrica INT,
		CONSTRAINT FKHidreletrica_Endereco FOREIGN KEY (FKEndereco_hidreletrica)
			REFERENCES Endereco_hidreletrica(IDEndereco_hidreletrica)
);

CREATE TABLE IF NOT EXISTS Servidores(
	IDServidor INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    FKUnidade_negocio INT,
		CONSTRAINT FKServidor_unidade_negocio FOREIGN KEY (FKUnidade_negocio)
			REFERENCES Unidade_de_negocio(IDUnidade)
);

CREATE TABLE IF NOT EXISTS Maquinas_Virtuais(
	IDMaquina_virtual INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    Software_instalado VARCHAR(150),
    FKServidor INT,
    FKHidreletrica INT,
		CONSTRAINT FKServidor_Maquina_Virtual FOREIGN KEY (FKServidor)
			REFERENCES Servidores(IDServidor),
		CONSTRAINT FKHidreletrica_Maquina_Virtual FOREIGN KEY (FKHidreletrica)
			REFERENCES Hidreletrica(IDHidreletrica)
);

CREATE TABLE IF NOT EXISTS Componentes_maquina_MV(
	IDComponente INT PRIMARY KEY AUTO_INCREMENT,
    Apelido VARCHAR(100),
    FKMaquina_virtual INT,
		CONSTRAINT FKMaquina_virtual_Componente FOREIGN KEY (FKMaquina_virtual)
			REFERENCES Maquinas_Virtuais(IDMaquina_virtual)
);

CREATE TABLE IF NOT EXISTS Parametros_componente_MV(
	IDParametro INT PRIMARY KEY AUTO_INCREMENT,
    Parametro DOUBLE,
    FKComponente INT,
		CONSTRAINT FKComponente_MV_Parametro FOREIGN KEY (FKComponente)
			REFERENCES Componentes_maquina_MV(IDComponente)
);

CREATE TABLE IF NOT EXISTS Componentes_monitorados_MV(
	IDComponente_monitorado INT AUTO_INCREMENT,
    FKComponente_cadastrado INT,
    FKMaquina_virtual INT,
		CONSTRAINT FKCompoenente_C_Componente_M_maquina_virtual FOREIGN KEY (FKComponente_cadastrado)
			REFERENCES Componentes_cadastrados(IDComponente_cadastrado),
		CONSTRAINT FKMaquina_virtual_Componente_M FOREIGN KEY (FKMaquina_virtual)
			REFERENCES Maquinas_Virtuais(IDMaquina_virtual),
		CONSTRAINT PKComponente_C_Componente_M PRIMARY KEY (IDComponente_monitorado,FKComponente_cadastrado)
);

CREATE TABLE IF NOT EXISTS Monitoramento_RAW_MV(
	IDMonitoramento_MV INT PRIMARY KEY AUTO_INCREMENT,
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Dado_Capturado DOUBLE,
    FKComponente_Monitorado_MV INT,
		CONSTRAINT FKMonitoramento_Componente_maquina_virtual FOREIGN KEY (FKComponente_Monitorado_MV)
			REFERENCES Componentes_monitorados_MV(IDComponente_monitorado)
);

CREATE TABLE IF NOT EXISTS Monitoramento_Trusted_MF(
	IDMonitoramento_MF INT PRIMARY KEY,
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Dado_Capturado DOUBLE,
    FKComponente_Monitorado_MF INT
);

CREATE TABLE IF NOT EXISTS Monitoramento_Trusted_MV(
	IDMonitoramento_MV INT PRIMARY KEY,
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Dado_Capturado DOUBLE,
    FKComponente_Monitorado_MV INT
);

CREATE TABLE IF NOT EXISTS Nivel_alerta(
	IDNivel_alerta INT PRIMARY KEY AUTO_INCREMENT,
    Nivel VARCHAR(30),
    Descricao_nivel VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Alertas(
	IDAlerta INT PRIMARY KEY AUTO_INCREMENT,
    FKUsuario INT,
    FKMonitoramento_MF INT,
	FKMonitoramento_MV INT,
    FKNivel_alerta INT,
		CONSTRAINT FKUsuario_alerta FOREIGN KEY (FKUsuario)
			REFERENCES Usuario_Dashboard(IDUsuario),
		CONSTRAINT FKMonitoramento_MF_alerta FOREIGN KEY (FKMonitoramento_MF)
			REFERENCES Monitoramento_Trusted_MF(IDMonitoramento_MF),
		CONSTRAINT FKMonitoramento_MV_alerta FOREIGN KEY (FKMonitoramento_MV)
			REFERENCES Monitoramento_Trusted_MV(IDMonitoramento_MV),
		CONSTRAINT FKNivel_alerta FOREIGN KEY (FKNivel_alerta)
			REFERENCES Nivel_alerta(IDNivel_alerta)
);



