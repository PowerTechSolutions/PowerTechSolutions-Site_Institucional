
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
    
);