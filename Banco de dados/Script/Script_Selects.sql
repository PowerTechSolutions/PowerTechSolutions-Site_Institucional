

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
	Nome_Dispositivo,
    Data_Hora_Conexao
    FROM 
		Dispositivos_USB WHERE FKMaquina = 1;
        
        SELECT * FROM Componentes_monitorados WHERE FKMaquina = 1;
        
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
								                AND Componentes_cadastrados.Apelido = "REDE"
                                                    LIMIT 1;