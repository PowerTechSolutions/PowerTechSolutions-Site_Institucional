
USE PowerTechSolutions;
SELECT 
	Data_Hora_Captura,
    Dado_Capturado AS "Uso_CPU",
    Componentes_cadastrados.Apelido
    FROM 
		Monitoramento_RAW JOIN Componentes_monitorados 
		ON FKComponente_Monitorado = IDComponente_monitorado 
			JOIN Componentes_cadastrados 
				ON FKComponente_cadastrado = IDComponente_cadastrado
					JOIN Maquinas 
						ON FKMaquina = IDMaquina
							WHERE FKMaquina = 1
								AND Componentes_cadastrados.Apelido = "CPU";
                                
SELECT 
	Data_Hora_Captura,
    Dado_Capturado AS "Uso_RAM",
    Componentes_cadastrados.Apelido 
    FROM 
		Monitoramento_RAW JOIN Componentes_monitorados 
		ON FKComponente_Monitorado = IDComponente_monitorado 
			JOIN Componentes_cadastrados 
				ON FKComponente_cadastrado = IDComponente_cadastrado
					JOIN Maquinas 
						ON FKMaquina = IDMaquina
							WHERE FKMaquina = 1
								AND Componentes_cadastrados.Apelido = "RAM";
                                
SELECT 
	Data_Hora_Captura,
    Dado_Capturado AS "Uso_DIsco",
    Componentes_cadastrados.Apelido 
    FROM 
		Monitoramento_RAW JOIN Componentes_monitorados 
		ON FKComponente_Monitorado = IDComponente_monitorado 
			JOIN Componentes_cadastrados 
				ON FKComponente_cadastrado = IDComponente_cadastrado
					JOIN Maquinas 
						ON FKMaquina = IDMaquina
							WHERE FKMaquina = 1
								AND Componentes_cadastrados.Apelido = "DISCO";

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
	IDJanela,
    PIDJanelas,
    Nome_Janelas,
    Data_Hora_Conexao
    FROM Janelas_Abertas WHERE FKMaquina = 1;
    
SELECT Data_Hora_Conexao FROM Janelas_Abertas WHERE FKMaquina = 1;
SELECT Data_Hora_Conexao FROM Redes_conectadas WHERE FKMaquina = 1;
        
SELECT
	Data_Hora_Captura 
		FROM 
			Monitoramento_RAW JOIN Componentes_monitorados 
				ON FKComponente_Monitorado = IDComponente_monitorado 
					JOIN Componentes_cadastrados 
						ON FKComponente_cadastrado = IDComponente_cadastrado
							JOIN Maquinas 
								ON FKMaquina = IDMaquina
									WHERE FKMaquina = 1
										AND Componentes_cadastrados.Apelido = "DISCO"
											LIMIT 1;