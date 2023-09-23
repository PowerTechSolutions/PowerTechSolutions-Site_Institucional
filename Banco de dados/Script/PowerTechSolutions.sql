
CREATE DATABASE IF NOT EXISTS PowerTechSolutions;

USE PowerTechSolutions;

CREATE TABLE IF NOT EXISTS Empresa(
	IDEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    Nome_fantasia VARCHAR(100),
    Razao_social VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Filiais(
	IDFilial INT PRIMARY KEY AUTO_INCREMENT,
    Cnpj CHAR(18),
    Apelido_interno VARCHAR(100),
    FKEmpresa INT,
		CONSTRAINT FKEmpresa_Filial FOREIGN KEY (FKEmpresa)
			REFERENCES Empresa(idEmpresa)
);

CREATE TABLE IF NOT EXISTS Endereco_empresa(
	IDEndereco_empresa INT PRIMARY KEY AUTO_INCREMENT,
    Cep CHAR(8),
    Rua VARCHAR(100),
    Numero INT,
    Bairro VARCHAR(100),
    Cidade VARCHAR(100),
    Estado VARCHAR(100),
    FKFilial INT,
		CONSTRAINT FKEndereco_Filial FOREIGN KEY (FKFilial)
			REFERENCES Filiais(IDFilial)
);

CREATE TABLE IF NOT EXISTS Setor(
	IDSetor INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS Andar(
	IDAndar INT PRIMARY KEY AUTO_INCREMENT,
    Nomeacao VARCHAR(50),
    FKEndereco INT,
    FKSetor INT,
		CONSTRAINT FKAndar_ENdereco FOREIGN KEY (FKEndereco)
			REFERENCES Endereco_empresa(IDEndereco_empresa),
		CONSTRAINT FKAndar_Setor FOREIGN KEY (FKSetor)
			REFERENCES Setor(IDSetor)
);

CREATE TABLE IF NOT EXISTS Sala(
	IDSala INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(50),
    FKAndar INT,
		CONSTRAINT FKSala_Andar FOREIGN KEY (FKAndar)
			REFERENCES Andar(IDAndar)
);

CREATE TABLE IF NOT EXISTS Local_trabalho(
	IDLocal_trabalho INT PRIMARY KEY AUTO_INCREMENT,
    FKSala INT,
    FKFilial INT,
		CONSTRAINT FKLocal_Sala FOREIGN KEY (FKSala)
			REFERENCES Sala(IDSala),
		CONSTRAINT FKLocal_Filial FOREIGN KEY (FKFilial)
			REFERENCES Filiais(IDFilial)
);

CREATE TABLE IF NOT EXISTS Funcionario(
	IDFuncionairo INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(150),
    Cpf CHAR(11),
    Email VARCHAR(100),
    FKFilial INT,
		CONSTRAINT FKFuncionario_Filial FOREIGN KEY (FKFilial)
			REFERENCES Filiais(IDFilial)
);

CREATE TABLE IF NOT EXISTS Maquinhas_fisicas(
	IDMaquina INT PRIMARY KEY AUTO_INCREMENT,
	Marca VARCHAR(80),
    Total_Ram 
);