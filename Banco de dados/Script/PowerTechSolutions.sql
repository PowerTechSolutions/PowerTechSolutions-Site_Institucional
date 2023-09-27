
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
	IDLocal_trabalho INT AUTO_INCREMENT,
    FKSala INT,
    FKFilial INT,
		CONSTRAINT FKLocal_Sala FOREIGN KEY (FKSala)
			REFERENCES Sala(IDSala),
		CONSTRAINT FKLocal_Filial FOREIGN KEY (FKFilial)
			REFERENCES Filiais(IDFilial),
		CONSTRAINT PKSala_Filial PRIMARY KEY (IDLocal_trabalho,FKSala,FKFilial)
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
    Total_Ram FLOAT,
    Total_Disco FLOAT,
    Modelo_processador VARCHAR(50),
    Total_entradas_USB INT,
    Maxima_tranferencia_rede_upload FLOAT,
	Maxima_tranferencia_rede_download FLOAT,
    FKFuncionario INT,
		CONSTRAINT FKMaquina_funcionario FOREIGN KEY (FKFuncionario)
			REFERENCES Funcionario(IDFuncionario)
);

CREATE TABLE IF NOT EXISTS Servidores(
	IDServidor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80),
    FKFilial INT,
		CONSTRAINT FKServidor_Filial FOREIGN KEY (FKFilial)
			REFERENCES Filiais(IDFilial)
);

CREATE TABLE IF NOT EXISTS Endereco_Hidreletrica(
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    Rio VARCHAR(80),
    Bacia_hidrografica VARCHAR(80),
	Sub_bacia_hidrografica VARCHAR(80),
    UF CHAR(2)
);

CREATE TABLE IF NOT EXISTS Hidreletrica(
	idHidreletrica INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    FKEndereco INT,
		CONSTRAINT FKHidreletrica_endereco FOREIGN KEY (FKEndereco)
			REFERENCES Endereco_Hidreletrica(idEndereco)
);

CREATE TABLE IF NOT EXISTS Maquinhas_virtuais(
	IDMaquina INT PRIMARY KEY AUTO_INCREMENT,
    Total_Ram FLOAT,
    Total_Disco FLOAT,
    Modelo_processador VARCHAR(50),
    Total_entradas_USB INT,
    Maxima_tranferencia_rede_upload FLOAT,
	Maxima_tranferencia_rede_download FLOAT,
    FKHidreletrica INT,
		CONSTRAINT FKMaquina_hidreletrica FOREIGN KEY (FKHidreletrica)
			REFERENCES Hidreletrica(idHidreletrica)
);

CREATE TABLE IF NOT EXISTS Componentes_cadastrados(
	IDComponentes INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS Componentes_Monitorados_mf(
	IDComponentes INT AUTO_INCREMENT,
    FKComponente_cadastrado INT,
    FKMaquina_Fisica INT,
		CONSTRAINT FKComponente_C_Componentes_M FOREIGN KEY (FKComponente_cadastrado)
			REFERENCES Componentes_cadastrados(IDComponentes),
		CONSTRAINT FKMaquinaFisica_Componentes_M FOREIGN KEY (FKMaquina_Fisica)
			REFERENCES Maquinhas_fisicas(IDMaquina),
		CONSTRAINT PKComponentes_M_Componentes_C PRIMARY KEY (IDComponentes,FKComponente_cadastrado)
);

CREATE TABLE IF NOT EXISTS Componentes_Monitorados_mv(
	IDComponentes INT AUTO_INCREMENT,
    FKComponente_cadastrado INT,
    FKMaquina_virtual INT,
		CONSTRAINT FKComponente_C_Componentes_M FOREIGN KEY (FKComponente_cadastrado)
			REFERENCES Componentes_cadastrados(IDComponentes),
		CONSTRAINT FKMaquinaVirtual_Componentes_M FOREIGN KEY (FKMaquina_virtual)
			REFERENCES Maquinhas_virtuais(IDMaquina),
		CONSTRAINT PKComponentes_M_Componentes_C PRIMARY KEY (IDComponentes,FKComponente_cadastrado)
);

CREATE TABLE IF NOT EXISTS Monitoramento_raw_mf(
	IDMonitoramento INT PRIMARY KEY AUTO_INCREMENT,
    Data DATE DEFAULT CURRENT_TIMESTAMP,
    Hora TIME DEFAULT CURRENT_TIMESTAMP,
    dado_capturado FLOAT,
    FKComponente_monitorado INT,
		CONSTRAINT FKMonitoramento_componente FOREIGN KEY (FKCompoenente_monitorado)
			REFERENCES Componentes_Monitorados_mf(IDComponentes)
);

CREATE TABLE IF NOT EXISTS Monitoramento_raw_mv(
	IDMonitoramento INT PRIMARY KEY AUTO_INCREMENT,
    Data DATE DEFAULT CURRENT_TIMESTAMP,
    Hora TIME DEFAULT CURRENT_TIMESTAMP,
    dado_capturado FLOAT,
    FKComponente_monitorado INT,
		CONSTRAINT FKMonitoramento_componente FOREIGN KEY (FKCompoenente_monitorado)
			REFERENCES Componentes_Monitorados_mv(IDComponentes)
);

CREATE TABLE IF NOT EXISTS Monitoramento_trusted_mf(
	IDMonitoramento INT PRIMARY KEY AUTO_INCREMENT,
    Data DATE DEFAULT CURRENT_TIMESTAMP,
    Hora TIME DEFAULT CURRENT_TIMESTAMP,
    dado_capturado FLOAT,
    FKComponente_monitorado INT
);

CREATE TABLE IF NOT EXISTS Monitoramento_trusted_mv(
	IDMonitoramento INT PRIMARY KEY AUTO_INCREMENT,
    Data DATE DEFAULT CURRENT_TIMESTAMP,
    Hora TIME DEFAULT CURRENT_TIMESTAMP,
    dado_capturado FLOAT,
    FKComponente_monitorado INT
);

CREATE TABLE IF NOT EXISTS Permissoes(
	IDPermissao INT PRIMARY KEY AUTO_INCREMENT,
    Visualizar BOOLEAN,
    Editar BOOLEAN,
    Cadastrar BOOLEAN,
    Deletar BOOLEAN
);

CREATE TABLE IF NOT EXISTS Nivel_acesso(
	IDNivel_acesso INT AUTO_INCREMENT,
    nome VARCHAR(80),
    FKPermissao INT,
		CONSTRAINT FKPermissao_Nivel_acesso FOREIGN KEY (FKPermissao)
			REFERENCES Permissoes(IDPermissao),
		CONSTRAINT PKNivel_acesso_permissao PRIMARY KEY (IDNivel_acesso,FKPermissao)
);

CREATE TABLE IF NOT EXISTS Usuario_Dashboard(
	IDUsuario INT AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    cpf CHAR(11),
    senha CHAR(8),
    FKFilial INT,
		CONSTRAINT FKFilial_funcionario 
    FKNivel_acesso INT,
    
);


