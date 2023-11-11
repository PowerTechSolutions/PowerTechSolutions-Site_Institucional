
USE PowerTechSolutions;
SELECT 
	Data_Hora_Captura,
    Dado_Capturado AS Uso_CPU,
    Componentes_cadastrados.Apelido
    FROM 
		Monitoramento_RAW JOIN Componentes_monitorados 
		ON FKComponente_Monitorado = IDComponente_monitorado 
			JOIN Componentes_cadastrados 
				ON FKComponente_cadastrado = IDComponente_cadastrado
					JOIN Maquinas 
						ON FKMaquina = IDMaquina
							WHERE FKMaquina = 1
								AND Componentes_cadastrados.Apelido = "CPU" 
									ORDER BY Monitoramento_RAW.IDMonitoramento DESC;

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
	Componentes_monitorados.IDComponente_monitorado as IDMonitoramento,
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
		AND Componentes_cadastrados.Apelido = "DISCO"
		ORDER BY Monitoramento_RAW.IDMonitoramento DESC
		LIMIT 1;

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
						ON FKComponente_cadastrado = IDComponente_cadastrado
							JOIN Maquinas 
								ON FKMaquina = IDMaquina
									WHERE FKMaquina = 1
										AND Componentes_cadastrados.Apelido = "DISCO"
											LIMIT 1;
                                            
SELECT Count(IDMaquina) as Contagem 
	FROM Maquinas JOIN Tipo_maquina
		ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
	JOIN Usuario_Dashboard
		ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
    WHERE Tipo_maquina.Apelido = "FISICA"
		AND Usuario_Dashboard.FKUnidade = 1;