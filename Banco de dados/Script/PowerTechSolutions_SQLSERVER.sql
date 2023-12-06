
USE master;

DROP DATABASE PowerTechSolutions;

CREATE DATABASE PowerTechSolutions;

USE PowerTechSolutions;

-- Criação das tabelas 

CREATE TABLE Grupo_Empresa(
	IDGrupo_Empresa INT PRIMARY KEY IDENTITY(1,1),
    Apelido_Interno_Grupo VARCHAR(100),
    Razao_social VARCHAR(100)
);

CREATE TABLE Unidade_de_negocio(
	IDUnidade INT PRIMARY KEY IDENTITY(1,1),
    Cnpj CHAR(14),
    Apelido_interno VARCHAR(100),
	Nome_Fantasia VARCHAR(100),
    FKGrupo_empresa INT,
		CONSTRAINT FKGrupo_Com_Unidade FOREIGN KEY (FKGrupo_empresa)
			REFERENCES Grupo_Empresa(IDGrupo_Empresa)
);

CREATE TABLE Endereco_Unidade(
	IDEndereco_unidade INT PRIMARY KEY IDENTITY(1,1),
    Cep VARCHAR(8),
    Logradouro VARCHAR(100),
    Bairro VARCHAR(100),
    Localidade VARCHAR(100),
    UF CHAR(2),
    FKUnidade_negocio INT,
		CONSTRAINT FKUnidade_Endereco FOREIGN KEY (FKUnidade_negocio)
			REFERENCES Unidade_de_negocio(IDUnidade)
);

CREATE TABLE Permissoes(
	IDPermissao INT PRIMARY KEY IDENTITY(1,1),
    Visualizar TINYINT,
    Editar TINYINT,
    Cadastrar TINYINT,
    Deletar TINYINT
);

CREATE TABLE Nivel_acesso(
	IDNivel_acesso INT IDENTITY(1,1),
    Apelido VARCHAR(60),
	FKPermissao INT,
		CONSTRAINT FKNivel_Permissao FOREIGN KEY (FKPermissao)
			REFERENCES Permissoes(IDPermissao),
	PRIMARY KEY (IDNivel_acesso,FKPermissao)
);

CREATE TABLE Usuario_Dashboard(
	IDUsuario INT IDENTITY(1,1),
	Nome VARCHAR(150),
    Email VARCHAR(150),
    Cpf CHAR(11),
    Senha CHAR(8),
    FKUnidade INT,
    FKNivel_acesso INT,
	FKPermissoes INT,
		CONSTRAINT FKUnidade_Usuario FOREIGN KEY (FKUnidade)
			REFERENCES Unidade_de_negocio(IDUnidade),
		CONSTRAINT FKNivel_Usuario FOREIGN KEY (FKNivel_acesso,FKPermissoes)
			REFERENCES Nivel_acesso(IDNivel_acesso,FKPermissao),
		CONSTRAINT PKUsuario_Nivel_acesso PRIMARY KEY (IDUsuario,FKNivel_acesso)
);

CREATE TABLE Tipo_maquina(
	IDTipo INT PRIMARY KEY IDENTITY(1,1),
    Apelido VARCHAR(80)
);

CREATE TABLE Estado_maquina(
	IDEstado INT PRIMARY KEY IDENTITY(1,1),
    Estado VARCHAR(50),
    CONSTRAINT Estado CHECK (Estado in ('Ativa','Inativa','Desativada'))
);

CREATE TABLE Maquinas(
	IDMaquina INT PRIMARY KEY IDENTITY(1,1),
    Apelido VARCHAR(100),
    FKFuncionario INT,
	FKNivel_Usuario INT,
		CONSTRAINT FKFuncionario_maquina FOREIGN KEY (FKFuncionario,FKNivel_Usuario)
			REFERENCES Usuario_Dashboard(IDUsuario,FKNivel_acesso),
	FKTipo_maquina INT,
		CONSTRAINT FKTipo_maquina FOREIGN KEY (FKTipo_maquina)
			REFERENCES Tipo_maquina(IDTipo),
	FKEstado INT,
		CONSTRAINT FKEstado_maquina FOREIGN KEY (FKEstado)
			REFERENCES Estado_maquina(IDEstado)
);

CREATE TABLE Tempo_de_Execucao(
	IDTempo INT PRIMARY KEY IDENTITY(1,1),
    Data_Hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    Total_captura time, 
	FKTempo_maquina INT,
		CONSTRAINT FKTempo_maquina FOREIGN KEY (FKTempo_maquina)
			REFERENCES Maquinas(IDMaquina)
);

CREATE TABLE Redes_conectadas(
	IDConexao INT PRIMARY KEY IDENTITY(1,1),
    Data_Hora_Conexao DATETIME DEFAULT CURRENT_TIMESTAMP,
    Servidor_DNS VARCHAR(45),
    FKMaquina INT,
		CONSTRAINT FKMaquina_Rede FOREIGN KEY (FKMaquina)
			REFERENCES Maquinas(IDMaquina)
);

CREATE TABLE Janelas_Abertas(
	IDRegistro INT PRIMARY KEY IDENTITY(1,1),
    IDJanela INT,
    PIDJanelas INT,
    Nome_Janelas VARCHAR(500),
	Data_Hora_Conexao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FKMaquina INT,
		CONSTRAINT FKMaquina_Janelas FOREIGN KEY (FKMaquina)
			REFERENCES Maquinas(IDMaquina)
);

CREATE TABLE Dispositivos_USB(
	IDRegistro INT PRIMARY KEY IDENTITY(1,1),
    Nome_Dispositivo VARCHAR(300),
    Data_Hora_Conexao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FKMaquina INT,
		CONSTRAINT FKMaquina_Usb FOREIGN KEY (FKMaquina)
			REFERENCES Maquinas(IDMaquina)
);

CREATE TABLE Tipo_componente(
	IDTipo INT PRIMARY KEY IDENTITY(1,1),
    Apelido VARCHAR(80)
);

CREATE TABLE Componentes_maquina(
	IDComponente INT PRIMARY KEY IDENTITY(1,1),
    Apelido VARCHAR(100),
    FKMaquina INT,
		CONSTRAINT FKMaquina_Componente FOREIGN KEY (FKMaquina)
			REFERENCES Maquinas(IDMaquina),
	FKTipo_componente INT,
		CONSTRAINT FKTipo_Componente FOREIGN KEY (FKTipo_componente)
			REFERENCES Tipo_componente(IDTipo)
);

CREATE TABLE Parametros_componente(
	IDParametro INT PRIMARY KEY IDENTITY(1,1),
    Parametro FLOAT,
    FKComponente INT,
		CONSTRAINT FKComponente_Parametro FOREIGN KEY (FKComponente)
			REFERENCES Componentes_maquina(IDComponente)
);

CREATE TABLE Componentes_cadastrados(
	IDComponente_cadastrado INT PRIMARY KEY IDENTITY(1,1),
    Apelido VARCHAR(100)
);

CREATE TABLE Componentes_monitorados(
	IDComponente_monitorado INT IDENTITY(1,1),
    FKComponente_cadastrado INT,
    FKMaquina INT,
		CONSTRAINT FKCompoenente_C_Componente_M FOREIGN KEY (FKComponente_cadastrado)
			REFERENCES Componentes_cadastrados(IDComponente_cadastrado),
		CONSTRAINT FKMaquina_Componente_M FOREIGN KEY (FKMaquina)
			REFERENCES Maquinas(IDMaquina),
		CONSTRAINT PKComponente_C_Componente_M PRIMARY KEY (IDComponente_monitorado,FKComponente_cadastrado)
);

CREATE TABLE Monitoramento_RAW(
	IDMonitoramento INT PRIMARY KEY IDENTITY(1,1),
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Total FLOAT,
    Free FLOAT, 
    Uso FLOAT, 
    Porcentagem FLOAT,
    FKComponente_Monitorado INT,
	FKComponente_Cadastrado INT,
		CONSTRAINT FKMonitoramento_RAW_Componente_maquina FOREIGN KEY (FKComponente_Monitorado,FKComponente_Cadastrado)
			REFERENCES Componentes_monitorados(IDComponente_monitorado,FKComponente_Cadastrado)
);

CREATE TABLE Monitoramento_TRUSTED(
	IDMonitoramento INT PRIMARY KEY IDENTITY(1,1),
    Data_Hora_Captura DATETIME DEFAULT CURRENT_TIMESTAMP,
    Total FLOAT,
    Free FLOAT, 
    Uso FLOAT, 
    Porcentagem FLOAT,
    FKComponente_Monitorado INT,
	FKComponente_Cadastrado INT,
		CONSTRAINT FKMonitoramento_TRUSTED_Componente_maquina FOREIGN KEY (FKComponente_Monitorado,FKComponente_Cadastrado)
			REFERENCES Componentes_monitorados(IDComponente_monitorado,FKComponente_Cadastrado)
);

CREATE TABLE Nivel_alerta(
	IDNivel_alerta INT PRIMARY KEY IDENTITY(1,1),
    Nivel VARCHAR(30)
);

CREATE TABLE Alertas(
	IDAlerta INT PRIMARY KEY IDENTITY(1,1),
    Alerta VARCHAR(100),
    Data_Hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FKMonitoramento INT,
    FKNivel_alerta INT,
    FKUnidade_negocio INT,
		CONSTRAINT FKMonitoramento_alerta FOREIGN KEY (FKMonitoramento)
			REFERENCES Monitoramento_RAW(IDMonitoramento),
		CONSTRAINT FKNivel_alerta FOREIGN KEY (FKNivel_alerta)
			REFERENCES Nivel_alerta(IDNivel_alerta),
		CONSTRAINT FKUnidade_negocio_alerta FOREIGN KEY (FKUnidade_negocio)
			REFERENCES Unidade_de_negocio(IDUnidade)
);

CREATE TABLE Henry(
	idRegistro INT PRIMARY KEY IDENTITY(1,1),
	Janela VARCHAR(255),
	Data_Hora DATETIME DEFAULT CURRENT_TIMESTAMP,
	Uso_Ram FLOAT,
	FKMaquina INT,
	CONSTRAINT FKHenry_Maquina FOREIGN KEY (FKMaquina) REFERENCES Maquinas(IDMaquina)
);

CREATE TABLE Processos(
IDProcesso INT IDENTITY(1,1),
PID INT,
nomeProcesso VARCHAR(255),
cpu_processo FLOAT,
uso_ram FLOAT,
tempo_user FLOAT,
data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkMaquina INT,
    CONSTRAINT fkMaquina FOREIGN KEY (fkMaquina)
        REFERENCES Maquinas(idMaquina),
constraint pkCompostaP primary key (IDProcesso, fkMaquina)
);

CREATE TABLE Alerta_Processo(
IDAlertaProcessos INT identity(1,1),
PID INT,
nomeProcesso VARCHAR(255),
cpu_processo FLOAT,
uso_ram FLOAT,
data_hora DATETIME,
tipo_alerta int,
FKProcesso INT,
FKMaquina INT,
	CONSTRAINT fkProcesso FOREIGN KEY (fkProcesso,FKMaquina)
        REFERENCES Processos(idProcesso,fkMaquina),
constraint pkCompostaA primary key (IDAlertaProcessos, fkProcesso, fkMaquina)
);

-- Aréa de inserts para testes de funcionalidade 

INSERT INTO Grupo_Empresa (Apelido_Interno_Grupo,Razao_social) VALUES
('EDP Smart','EDP ENERGIAS DO BRASIL S.A.'),
('Matrix','Matrix Comercio e Servicos LTDA'),
('AES Tietê','AES TIETE INTEGRA SOLUCOES EM ENERGIA LTDA.');

INSERT INTO Unidade_de_negocio (Cnpj,Apelido_interno,Nome_Fantasia,FKGrupo_empresa) VALUES
('28630316000186','EDP Smart Sede','EDP Energias do Brasil',1),
('28630316000286','EDP Smart Faria Lima','EDP Energias do Brasil',1),
('28630316000386','EDP Smart Suzano','EDP Energias do Brasil',1),
('01564634000130','Matrix Sede','Matrix',2),
('01564634000230','Matrix Mogi das Cruzes','Matrix',2),
('26203837000121','AES Tiete Sede','AES TIETE INTEGRA',3);

INSERT INTO Permissoes (Visualizar,Editar,Cadastrar,Deletar) VALUES
(1,1,1,1),
(1,0,0,0);

INSERT INTO Nivel_acesso (Apelido,FKPermissao) VALUES
('Eng NOC',1),
('Gestor',2);

INSERT into Usuario_Dashboard (Nome,Email,Cpf,Senha,FKUnidade,FKNivel_acesso) VALUES
('Davi Rodrigues','davi@teste.com','24325638830','12345678',1,1),
('Henrique Lipert','henri@teste.com','53169365827','12345678',1,2),
('Erica Cunha','erica@teste.com','44815022666','12345678',1,2),
('Sarah Oliveira','sarah@teste.com','15067515554','12345678',1,2),
('Gabriella Inácio','gabi@teste.com','87343841629','12345678',1,1),
('Michele Kaori','kaori@teste.com','38679683736','12345678',1,1);

INSERT INTO Componentes_cadastrados (Apelido) values
('CPU'),
('RAM'),
('DISCO'),
('REDE'),
('JANELAS'),
('USB');

INSERT INTO Tipo_maquina (Apelido) VALUES
('FISICA'),
('VIRTUAL');

INSERT INTO Estado_maquina (Estado) VALUES
('Ativa'),
('Inativa'),
('Desativada');

INSERT INTO Maquinas (Apelido,FKFuncionario,FKNivel_Usuario,FKTipo_maquina,FKEstado) VALUES
('teste01',1,1,2,1),
('teste02',1,1,1,1),
('teste03',1,1,1,2);

INSERT INTO Maquinas (Apelido,FKFuncionario,FKNivel_Usuario,FKTipo_maquina,FKEstado) VALUES
('teste01',2,2,2,1),
('teste02',2,2,1,1),
('teste03',2,2,1,2);

INSERT INTO Maquinas (Apelido,FKFuncionario,FKNivel_Usuario,FKTipo_maquina,FKEstado) VALUES
('teste01',3,2,2,1),
('teste02',3,2,1,1),
('teste03',3,2,1,2);

INSERT INTO Maquinas (Apelido,FKFuncionario,FKNivel_Usuario,FKTipo_maquina,FKEstado) VALUES
('teste01',4,2,2,1),
('teste02',4,2,1,1),
('teste03',4,2,1,2);

INSERT INTO Maquinas (Apelido,FKFuncionario,FKNivel_Usuario,FKTipo_maquina,FKEstado) VALUES
('teste01',5,1,2,1),
('teste02',5,1,1,1),
('teste03',5,1,1,2);

INSERT INTO Maquinas (Apelido,FKFuncionario,FKNivel_Usuario,FKTipo_maquina,FKEstado) VALUES
('teste01',6,1,2,1),
('teste02',6,1,1,1),
('teste03',6,1,1,2);

INSERT INTO Componentes_monitorados (FKComponente_cadastrado,FKMaquina) VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(1,2),
(2,2),
(3,2),
(4,2),
(5,2),
(6,2),
(1,3),
(2,3),
(3,3),
(4,3),
(5,3),
(6,3);

-- Funcionario 2 
INSERT INTO Componentes_monitorados (FKComponente_cadastrado,FKMaquina) VALUES
(1,4),
(2,4),
(3,4),
(4,4),
(5,4),
(6,4),
(1,5),
(2,5),
(3,5),
(4,5),
(5,5),
(6,5),
(1,6),
(2,6),
(3,6),
(4,6),
(5,6),
(6,6);

-- Funcionario 3
INSERT INTO Componentes_monitorados (FKComponente_cadastrado,FKMaquina) VALUES
(1,7),
(2,7),
(3,7),
(4,7),
(5,7),
(6,7),
(1,8),
(2,8),
(3,8),
(4,8),
(5,8),
(6,8),
(1,9),
(2,9),
(3,9),
(4,9),
(5,9),
(6,9);

-- Funcionario 4 
INSERT INTO Componentes_monitorados (FKComponente_cadastrado,FKMaquina) VALUES
(1,10),
(2,10),
(3,10),
(4,10),
(5,10),
(6,10),
(1,11),
(2,11),
(3,11),
(4,11),
(5,11),
(6,11),
(1,12),
(2,12),
(3,12),
(4,12),
(5,12),
(6,12);

-- Funcionario 5 
INSERT INTO Componentes_monitorados (FKComponente_cadastrado,FKMaquina) VALUES
(1,13),
(2,13),
(3,13),
(4,13),
(5,13),
(6,13),
(1,14),
(2,14),
(3,14),
(4,14),
(5,14),
(6,14),
(1,15),
(2,15),
(3,15),
(4,15),
(5,15),
(6,15);

-- Funcionario 6 
INSERT INTO Componentes_monitorados (FKComponente_cadastrado,FKMaquina) VALUES
(1,16),
(2,16),
(3,16),
(4,16),
(5,16),
(6,16),
(1,17),
(2,17),
(3,17),
(4,17),
(5,17),
(6,17),
(1,18),
(2,18),
(3,18),
(4,18),
(5,18),
(6,18);

SELECT * FROM Monitoramento_RAW;

select * from Componentes_cadastrados;

SELECT * FROM Componentes_monitorados where FKComponente_cadastrado = 1;

SELECT * FROM Henry;

SELECT * FROM Janelas_Abertas;

SELECT TOP 10 * FROM Processos;

TRUNCATE TABLE Processos;

TRUNCATE TABLE Maquinas

SELECT * FROM Usuario_Dashboard;

SELECT * FROM Alertas;

SELECT * FROM Tempo_de_Execucao;

INSERT INTO Tempo_de_Execucao (Data_Hora, Total_captura, FKTempo_maquina)
VALUES
    ('2023-11-19 08:00:00', '00:03:06', 1),
    ('2023-11-20 12:45:00', '00:01:20', 1),
    ('2023-11-20 10:40:50', '00:04:30', 1),
    ('2023-11-20 01:46:54', '00:00:30', 1),
    ('2023-11-21 12:08:32', '00:10:00', 1),
    ('2023-11-21 17:23:09', '00:20:30', 1),
    ('2023-11-23 18:30:00', '01:24:05', 1);
   

    INSERT INTO Tempo_de_Execucao (Data_Hora, Total_captura, FKTempo_maquina)
VALUES
    ('2023-12-01 09:30:00', '02:00:00', 1),
    ('2023-12-01 10:09:30', '00:04:06', 1),
    ('2023-12-01 19:00:32', '00:03:34', 1),-- Exemplo para o dia 5 de dezembro
    ('2023-12-02 15:15:00', '01:05:00', 1), -- Exemplo para o dia 20 de dezembro
    ('2023-12-03 22:00:00', '04:30:54', 1); -- Exemplo para o último dia de dezembro

	SELECT * FROM Tempo_de_Execucao;

SELECT * FROM Nivel_alerta;

SELECT * FROM Processos;

SELECT * FROM henry;

SELECT * FROM Alertas;

INSERT INTO Nivel_alerta (Nivel) VALUES
('Atenção'),
('Perigo'),
('Critico');

INSERT INTO Alertas (Alerta,FKMonitoramento,FKNivel_alerta,FKUnidade_negocio) VALUES
('Excesso de uso',2,1,1),
('Excesso de uso',3,1,1),
('Excesso de uso',1,1,1);

SELECT * FROM Janelas_Abertas;

        SELECT count(Nome_Janelas) as Total From Janelas_Abertas WHERE FKMaquina = 1 AND Janelas_Abertas.Nome_Janelas != ''
        AND Data_Hora_Conexao >= DATE_SUB(GETDATE(), INTERVAL 5 MINUTE);

SELECT * FROM Monitoramento_RAW;

SELECT
            COUNT(IDAlerta) as Alertas
            FROM Alertas
            JOIN Nivel_alerta 
                ON IDNivel_alerta = FKNivel_alerta
            WHERE FORMAT(Data_Hora, '%M') = '12' 
            GROUP BY IDNivel_alerta;

SELECT * FROM Alertas;

SELECT 
    IDMaquina,
    Usuario_Dashboard.Nome as 'Nome',
    Maquinas.Apelido as 'apelido',
    Estado
    FROM Maquinas JOIN Tipo_maquina
        ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
    JOIN Estado_maquina
        ON IDEstado = FKEstado
    JOIN Usuario_Dashboard
        ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
    WHERE Tipo_maquina.Apelido = 'FISICA'
        AND Usuario_Dashboard.FKUnidade = 1;


		SELECT 
    IDMaquina,
    Usuario_Dashboard.Nome as 'Nome',
    Maquinas.Apelido as 'apelido',
    Estado
    FROM Maquinas JOIN Tipo_maquina
        ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
    JOIN Estado_maquina
        ON IDEstado = FKEstado
    JOIN Usuario_Dashboard
        ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
    WHERE Tipo_maquina.Apelido = 'VIRTUAL'
        AND Usuario_Dashboard.FKUnidade = 1;


	SELECT 
            Count(IDMaquina) as Contagem 
        FROM Maquinas JOIN Tipo_maquina
            ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
        JOIN Estado_maquina
            ON IDEstado = FKEstado
        JOIN Usuario_Dashboard
            ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
        WHERE Tipo_maquina.Apelido = 'FISICA'
            AND Usuario_Dashboard.FKUnidade = 1
            AND Estado_maquina.Estado = 'Ativa';

	SELECT 
	        COUNT(IDAlerta) as Alertas
                FROM Alertas JOIN Monitoramento_RAW 
                ON Alertas.FKMonitoramento = Monitoramento_RAW.IDMonitoramento
                JOIN Componentes_monitorados 
	    	        ON FKComponente_Monitorado = IDComponente_monitorado 
	    		    JOIN Componentes_cadastrados 
	    			    ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
	    				    JOIN Maquinas 
	    					    ON FKMaquina = IDMaquina
                                JOIN Tipo_maquina 
                                    ON IDTipo = FKTipo_maquina
                                    JOIN Nivel_alerta
                                        ON IDNivel_alerta = FKNivel_alerta
	    		WHERE Tipo_maquina.Apelido = 'VIRTUAL' AND Alertas.FKUnidade_negocio = 1 GROUP BY IDNivel_alerta;
    
    
	SELECT TOP 3 Nome_Dispositivo as DP,FORMAT(Data_Hora_Conexao,'%H:%m') as hora FROM Dispositivos_USB WHERE FKMaquina = 1 order by IDRegistro DESC;

INSERT INTO Alertas (FKMonitoramento,FKNivel_alerta,FKUnidade_negocio) VALUES
(1,1,1),
(1,1,1),
(1,1,1),
(1,2,1),
(1,3,1);

UPDATE Usuario_Dashboard SET FKPermissoes = 2 WHERE IDUsuario = 2;

/*

SELECT * FROM Monitoramento_RAW;

SELECT * FROM Redes_conectadas;

SELECT * FROM Janelas_Abertas;

SELECT * FROM Dispositivos_USB; 

SELECT 
	Data_Hora_Captura,
    Uso AS Uso_CPU,
    Componentes_cadastrados.Apelido
    FROM 
		Monitoramento_RAW JOIN Componentes_monitorados 
		ON FKComponente_Monitorado = IDComponente_monitorado 
			JOIN Componentes_cadastrados 
				ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
					JOIN Maquinas 
						ON FKMaquina = IDMaquina
							WHERE FKMaquina = 1
								AND Componentes_cadastrados.Apelido = 'CPU'
									ORDER BY Monitoramento_RAW.IDMonitoramento DESC;

SELECT 
	Data_Hora_Captura,
    Uso AS "Uso_RAM",
    Componentes_cadastrados.Apelido 
    FROM 
		Monitoramento_RAW JOIN Componentes_monitorados 
		ON FKComponente_Monitorado = IDComponente_monitorado 
			JOIN Componentes_cadastrados 
				ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
					JOIN Maquinas 
						ON FKMaquina = IDMaquina
							WHERE FKMaquina = 1
								AND Componentes_cadastrados.Apelido = 'RAM';
                                
SELECT 
	Componentes_monitorados.IDComponente_monitorado as IDMonitoramento,
	Data_Hora_Captura,
    Uso AS "Uso_DIsco",
    Componentes_cadastrados.Apelido 
    FROM 
		Monitoramento_RAW JOIN Componentes_monitorados 
		ON FKComponente_Monitorado = IDComponente_monitorado 
		JOIN Componentes_cadastrados 
		ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
		JOIN Maquinas 
		ON FKMaquina = IDMaquina
		WHERE FKMaquina = 1
		AND Componentes_cadastrados.Apelido = 'DISCO'
		ORDER BY Monitoramento_RAW.IDMonitoramento DESC;

SELECT 
	Nome_Dispositivo,
    Data_Hora_Conexao
    FROM 
		Dispositivos_USB WHERE FKMaquina = 1;
        
SELECT 
	Servidor_DNS,
    Data_Hora_Conexao
		FROM Redes_conectadas
        WHERE FKMaquina = 1;
        
SELECT 
	IDRegistro,
	IDJanela,
    PIDJanelas,
    Nome_Janelas,
    Data_Hora_Conexao
    FROM Janelas_Abertas WHERE FKMaquina = 1;
    
SELECT
	Data_Hora_Captura 
		FROM 
			Monitoramento_RAW JOIN Componentes_monitorados 
				ON FKComponente_Monitorado = IDComponente_monitorado 
					JOIN Componentes_cadastrados 
						ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
							JOIN Maquinas 
								ON FKMaquina = IDMaquina
									WHERE FKMaquina = 1
										AND Componentes_cadastrados.Apelido = 'DISCO';
                                            
SELECT Count(IDMaquina) as Contagem 
	FROM Maquinas JOIN Tipo_maquina
		ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
	JOIN Usuario_Dashboard
		ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
    WHERE Tipo_maquina.Apelido = 'FISICA'
		AND Usuario_Dashboard.FKUnidade = 1;


		TRUNCATE TABLE Monitoramento_RAW;
		
		USE PowerTechSolutions;

		SELECT * FROM Monitoramento_RAW;

		SELECT * FROM Tempo_de_Execucao;

		SELECT Count(IDUsuario) as Maquinas FROM Usuario_Dashboard WHERE Cpf = '48372073830';
		SELECT * FROM Usuario_Dashboard WHERE Email = 'davi@teste.com' AND Senha = '12345678';

		SELECT * FROM Usuario_Dashboard;

		SELECT * FROM Tempo_de_Execucao;

		SELECT * FROM Maquinas;

		SELECT * FROM Usuario_Dashboard;

*/

